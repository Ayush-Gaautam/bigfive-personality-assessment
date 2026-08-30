import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AssessmentForm from './components/AssessmentForm';
import ResultsView from './components/ResultsView';
import ProfessorDashboard from './components/ProfessorDashboard';
import ClassAnalytics from './components/ClassAnalytics';
import ShareModal from './components/ShareModal';
import { calculateScores } from './utils/scoring';

export default function App() {
  const [activeTab, setActiveTab] = useState('assessment');
  const [currentResult, setCurrentResult] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({ total: 0, averages: {}, ageDistribution: {}, genderDistribution: {} });
  const [loading, setLoading] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Fetch saved submissions from Backend REST API
  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/submissions');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setSubmissions(json.data || []);
        }
      }
    } catch (err) {
      console.warn('API unavailable, using local session state:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Class & Demographic Stats from Backend API
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setStats(json);
        }
      }
    } catch (err) {
      console.warn('Stats API unavailable:', err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    fetchStats();
  }, []);

  // Handle Form Submission
  const handleSubmitAssessment = async (formData) => {
    const scores = calculateScores(formData.answers);
    const resultObj = {
      id: 'SUB-' + Date.now(),
      name: formData.name,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      occupation: formData.occupation,
      organization: formData.organization,
      answers: formData.answers,
      scores,
      submittedAt: new Date().toISOString()
    };

    setCurrentResult(resultObj);

    // Save to Backend API
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          age: formData.age,
          gender: formData.gender,
          occupation: formData.occupation,
          organization: formData.organization,
          answers: formData.answers,
          scores
        })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          console.log('Submission saved successfully with full demographics!');
        }
      }
    } catch (err) {
      console.error('Failed to post to backend API:', err);
    }

    // Refresh submission list and stats
    await fetchSubmissions();
    await fetchStats();

    // Switch view to results
    setActiveTab('results');
  };

  // Handle Deleting a submission
  const handleDeleteSubmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;

    try {
      const res = await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchSubmissions();
        await fetchStats();
      }
    } catch (err) {
      console.error('Failed to delete submission:', err);
      setSubmissions(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      
      {/* Top Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenShare={() => setIsShareModalOpen(true)}
        submissionCount={submissions.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        {activeTab === 'assessment' && (
          <AssessmentForm
            onSubmit={handleSubmitAssessment}
            onViewAllResponses={() => setActiveTab('professor')}
          />
        )}

        {activeTab === 'results' && currentResult && (
          <ResultsView
            resultData={currentResult}
            onRetake={() => {
              setCurrentResult(null);
              setActiveTab('assessment');
            }}
            onViewDashboard={() => setActiveTab('professor')}
            onShare={() => setIsShareModalOpen(true)}
          />
        )}

        {activeTab === 'results' && !currentResult && (
          <div className="glass-panel p-12 text-center max-w-lg mx-auto space-y-4">
            <h3 className="text-xl font-bold text-white">No Results Selected</h3>
            <p className="text-slate-400 text-sm">
              You haven't completed an assessment yet in this session.
            </p>
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm"
            >
              Take Assessment Now
            </button>
          </div>
        )}

        {activeTab === 'professor' && (
          <ProfessorDashboard
            submissions={submissions}
            loading={loading}
            onRefresh={fetchSubmissions}
            onDelete={handleDeleteSubmission}
            onSelectStudent={(student) => {
              setCurrentResult(student);
              setActiveTab('results');
            }}
          />
        )}

        {activeTab === 'analytics' && (
          <ClassAnalytics
            stats={stats}
            submissions={submissions}
          />
        )}
      </main>

      {/* Share Survey Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <p>Big Five Personality Profile Assessment & Analytics Platform • Powered by React & Express</p>
      </footer>

    </div>
  );
}
