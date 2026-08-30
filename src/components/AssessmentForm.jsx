import React, { useState } from 'react';
import { QUESTIONS, DIMENSIONS } from '../data/questions';
import QuestionCard from './QuestionCard';
import { User, Mail, Briefcase, Building2, Sparkles, AlertCircle, ArrowRight, Eye, UserCheck } from 'lucide-react';

export default function AssessmentForm({ onSubmit, onViewAllResponses }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [organization, setOrganization] = useState('');
  const [answers, setAnswers] = useState({});
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [errorMsg, setErrorMsg] = useState('');

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / 25) * 100);

  const handleSelectAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Please enter your Name before submitting.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!age) {
      setErrorMsg('Please select your Age group.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!gender) {
      setErrorMsg('Please select your Gender.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (answeredCount < 25) {
      const missingQ = QUESTIONS.find((q) => !answers[q.id]);
      setErrorMsg(`Please answer Question #${missingQ.id} ("${missingQ.text.substring(0, 40)}...")`);
      
      const elem = document.getElementById(`q-${missingQ.id}`);
      if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    onSubmit({
      name: name.trim(),
      email: email.trim(),
      age,
      gender,
      occupation: occupation.trim(),
      organization: organization.trim(),
      answers
    });
  };

  const filteredQuestions = selectedCategoryFilter === 'all'
    ? QUESTIONS
    : QUESTIONS.filter((q) => q.trait === selectedCategoryFilter);

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 bg-gradient-to-r from-slate-900/90 via-indigo-950/60 to-slate-900/90 border-indigo-500/30">
        <div className="flex items-center gap-3 mb-3 text-indigo-400 font-semibold text-sm">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span>Big Five Personality Inventory Assessment</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
          Respondent Information & Assessment
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
          Evaluate your profile across the 5 Big Five personality dimensions: 
          <span className="text-blue-400 font-semibold"> Extraversion</span>, 
          <span className="text-emerald-400 font-semibold"> Agreeableness</span>, 
          <span className="text-purple-400 font-semibold"> Emotional Stability</span>, 
          <span className="text-amber-400 font-semibold"> Conscientiousness</span>, and 
          <span className="text-pink-400 font-semibold"> Openness</span>.
        </p>
      </div>

      {/* Demographic Information Card (Exact layout as requested) */}
      <div className="glass-panel p-6 md:p-8 space-y-6 border-indigo-500/30">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-400" />
            <span>Respondent Demographics</span>
          </h3>
          <span className="text-xs text-rose-400 font-medium">* Required fields</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NAME */}
          <div>
            <label className="block text-xs font-bold text-slate-300 tracking-wider uppercase mb-2">
              NAME <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ayush Sharma"
                className="w-full pl-9 pr-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* GMAIL / EMAIL */}
          <div>
            <label className="block text-xs font-bold text-slate-300 tracking-wider uppercase mb-2">
              GMAIL / EMAIL
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. ayush@gmail.com"
                className="w-full pl-9 pr-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* AGE (Radio options) */}
          <div className="md:col-span-2 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
            <label className="block text-xs font-bold text-slate-300 tracking-wider uppercase mb-3">
              AGE <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Under 18', '18-25', '26-35', '36+'].map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    age === opt
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="ageGroup"
                    value={opt}
                    checked={age === opt}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-semibold">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* GENDER (Radio options) */}
          <div className="md:col-span-2 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
            <label className="block text-xs font-bold text-slate-300 tracking-wider uppercase mb-3">
              GENDER <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Male', 'Female', 'Other'].map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    gender === opt
                      ? 'bg-purple-600/20 border-purple-500 text-purple-200 shadow-md shadow-purple-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="genderGroup"
                    value={opt}
                    checked={gender === opt}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-semibold">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* OCCUPATION */}
          <div>
            <label className="block text-xs font-bold text-slate-300 tracking-wider uppercase mb-2">
              OCCUPATION
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="e.g. Student, Software Engineer"
                className="w-full pl-9 pr-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* ORGANIZATION NAME */}
          <div>
            <label className="block text-xs font-bold text-slate-300 tracking-wider uppercase mb-2">
              ORGANIZATION NAME
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. Lovely Professional University"
                className="w-full pl-9 pr-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* View All Responses Quick Action Button */}
        <div className="flex justify-end pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onViewAllResponses}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-slate-700"
          >
            <Eye className="w-4 h-4" />
            <span>VIEW ALL RESPONSES</span>
          </button>
        </div>
      </div>

      {/* Sticky Progress Bar */}
      <div className="sticky top-[69px] z-30 glass-panel p-4 bg-slate-900/95 backdrop-blur-lg border-indigo-500/20 shadow-xl">
        <div className="flex items-center justify-between text-xs md:text-sm font-semibold mb-2">
          <span className="text-slate-300 flex items-center gap-2">
            <span>Assessment Progress</span>
            <span className="text-indigo-400 font-bold">({answeredCount} of 25 Answered)</span>
          </span>
          <span className="text-emerald-400 font-bold">{progressPercent}% Completed</span>
        </div>

        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-300 shadow-sm shadow-emerald-500/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Error Alert Message */}
      {errorMsg && (
        <div className="p-4 bg-rose-950/80 border border-rose-500/50 rounded-xl flex items-start gap-3 text-rose-200 text-sm animate-bounce">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block">Attention Required</strong>
            <span>{errorMsg}</span>
          </div>
        </div>
      )}

      {/* Trait Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategoryFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            selectedCategoryFilter === 'all'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          All 25 Questions
        </button>

        {Object.keys(DIMENSIONS).map((key) => {
          const trait = DIMENSIONS[key];
          const isSelected = selectedCategoryFilter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedCategoryFilter(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-slate-700 text-white border border-indigo-400/50'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: trait.color }} />
              {trait.shortName}
            </button>
          );
        })}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q) => (
          <div id={`q-${q.id}`} key={q.id}>
            <QuestionCard
              question={q}
              selectedValue={answers[q.id]}
              onSelect={handleSelectAnswer}
            />
          </div>
        ))}
      </div>

      {/* Submit Section */}
      <div className="glass-panel p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
        <div>
          <h4 className="text-base font-bold text-white">Submit & Generate Personality Profile</h4>
          <p className="text-xs text-slate-400">
            {answeredCount === 25
              ? 'All 25 statements answered! Ready for scoring.'
              : `${25 - answeredCount} statements remaining.`}
          </p>
        </div>

        <button
          type="submit"
          className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg ${
            answeredCount === 25 && name.trim() && age && gender
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5'
              : 'bg-indigo-600/60 hover:bg-indigo-600 text-white shadow-indigo-600/20'
          }`}
        >
          <span>SUBMIT ASSESSMENT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </form>
  );
}
