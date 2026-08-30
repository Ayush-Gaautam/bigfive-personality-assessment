import React, { useState } from 'react';
import { Search, Download, Trash2, Eye, RefreshCw, Users, Award, ShieldCheck, Calendar, Filter, Building2, Briefcase } from 'lucide-react';
import { formatTimestamp } from '../utils/scoring';
import RadarChart from './RadarChart';

export default function ProfessorDashboard({ submissions, loading, onRefresh, onDelete, onSelectStudent }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [traitFilter, setTraitFilter] = useState('all');
  const [selectedStudentModal, setSelectedStudentModal] = useState(null);

  // Filter submissions based on search and trait filter
  const filteredSubmissions = submissions.filter((item) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(q) ||
      (item.email && item.email.toLowerCase().includes(q)) ||
      (item.age && item.age.toLowerCase().includes(q)) ||
      (item.gender && item.gender.toLowerCase().includes(q)) ||
      (item.occupation && item.occupation.toLowerCase().includes(q)) ||
      (item.organization && item.organization.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (traitFilter !== 'all') {
      const traitScore = item.scores?.dimensionScores?.[traitFilter] || 0;
      return traitScore >= 18;
    }

    return true;
  });

  const totalSubmissions = submissions.length;
  const avgTotalScore = totalSubmissions > 0
    ? Math.round(submissions.reduce((acc, curr) => acc + (curr.scores?.totalScore || 0), 0) / totalSubmissions)
    : 0;

  const handleExportCSV = () => {
    window.open('/api/export', '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 animate-fade-in">
      
      {/* Top Welcome Banner */}
      <div className="glass-panel p-6 md:p-8 bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Professor & Admin Portal</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">All Saved Respondent Submissions</h2>
          <p className="text-slate-300 text-sm mt-1">
            Review demographics, Big Five trait scores, and export complete CSV data for grading or analysis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-sm font-semibold transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-600/30 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-6 border-purple-500/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Respondents</span>
            <span className="text-3xl font-extrabold text-white">{totalSubmissions}</span>
          </div>
        </div>

        <div className="glass-panel p-6 border-indigo-500/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Cohort Mean Score</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{avgTotalScore}</span>
              <span className="text-xs text-slate-400">/ 125</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 border-emerald-500/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Database Status</span>
            <span className="text-sm font-bold text-emerald-400">Synced to Database</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, email, age, occupation, or university..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950/70 border border-slate-700/80 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={traitFilter}
            onChange={(e) => setTraitFilter(e.target.value)}
            className="bg-slate-950/70 border border-slate-700/80 text-slate-200 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Respondents</option>
            <option value="extraversion">High Extraversion (&gt;=18)</option>
            <option value="agreeableness">High Agreeableness (&gt;=18)</option>
            <option value="adjustment">High Emotional Stability (&gt;=18)</option>
            <option value="conscientiousness">High Conscientiousness (&gt;=18)</option>
            <option value="openness">High Openness (&gt;=18)</option>
          </select>
        </div>
      </div>

      {/* Submissions Data Table */}
      <div className="glass-panel overflow-hidden border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Respondent</th>
                <th className="py-3.5 px-4 font-semibold">Demographics</th>
                <th className="py-3.5 px-4 font-semibold">Organization / Occupation</th>
                <th className="py-3.5 px-4 font-semibold text-center">Total Score</th>
                <th className="py-3.5 px-4 font-semibold text-center">Ext</th>
                <th className="py-3.5 px-4 font-semibold text-center">Agr</th>
                <th className="py-3.5 px-4 font-semibold text-center">Adj</th>
                <th className="py-3.5 px-4 font-semibold text-center">Con</th>
                <th className="py-3.5 px-4 font-semibold text-center">Ope</th>
                <th className="py-3.5 px-4 font-semibold text-center">Dominant Trait</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan="11" className="py-12 text-center text-slate-400">
                    No submissions found. Fill out the assessment form to record responses!
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((row) => {
                  const dim = row.scores?.dimensionScores || {};
                  return (
                    <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{row.name}</div>
                        <div className="text-xs text-slate-400">{row.email || 'No email provided'}</div>
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        <div className="text-slate-200 font-medium">{row.age || 'Age N/A'} • {row.gender || 'Gender N/A'}</div>
                        <div className="text-slate-400">{formatTimestamp(row.submittedAt)}</div>
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        <div className="text-slate-200 font-medium flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span>{row.organization || 'N/A'}</span>
                        </div>
                        <div className="text-slate-400 flex items-center gap-1 mt-0.5">
                          <Briefcase className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{row.occupation || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-extrabold text-indigo-400">
                        {row.scores?.totalScore || 0} / 125
                      </td>
                      <td className="py-3.5 px-4 text-center font-semibold text-blue-400">{dim.extraversion || 0}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-emerald-400">{dim.agreeableness || 0}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-purple-400">{dim.adjustment || 0}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-amber-400">{dim.conscientiousness || 0}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-pink-400">{dim.openness || 0}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {row.scores?.dominantTrait || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedStudentModal(row)}
                            title="View Full Profile Modal"
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDelete(row.id)}
                            title="Delete Submission"
                            className="p-1.5 bg-slate-800 hover:bg-rose-950 text-rose-400 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Respondent Detail Modal */}
      {selectedStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 max-w-2xl w-full bg-slate-900 border-purple-500/40 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedStudentModal.name}'s Demographics & Profile</h3>
                <p className="text-xs text-slate-400">
                  {selectedStudentModal.email} • {selectedStudentModal.age} • {selectedStudentModal.gender}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudentModal(null)}
                className="text-slate-400 hover:text-white text-xl font-bold px-3 py-1"
              >
                ✕
              </button>
            </div>

            {/* Demographics Summary Box */}
            <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold">Occupation:</span>
                <span className="text-slate-100 font-bold text-sm">{selectedStudentModal.occupation || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Organization:</span>
                <span className="text-slate-100 font-bold text-sm">{selectedStudentModal.organization || 'N/A'}</span>
              </div>
            </div>

            {/* Radar Spider Plot */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <RadarChart dimensionScores={selectedStudentModal.scores?.dimensionScores || {}} />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectStudent(selectedStudentModal);
                  setSelectedStudentModal(null);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold"
              >
                Full Interactive View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
