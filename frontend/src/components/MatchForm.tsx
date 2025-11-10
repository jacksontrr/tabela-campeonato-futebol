import React, { useState } from 'react';
import type { Team, CreateMatch } from '../types';
import { matchService } from '../services/api';

interface MatchFormProps {
  teams: Team[];
  onMatchCreated: () => void;
}

export const MatchForm: React.FC<MatchFormProps> = ({ teams, onMatchCreated }) => {
  const [homeTeamId, setHomeTeamId] = useState('');
  const [awayTeamId, setAwayTeamId] = useState('');
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!homeTeamId || !awayTeamId || homeScore === '' || awayScore === '') return;
    if (homeTeamId === awayTeamId) {
      alert('Home and away teams must be different');
      return;
    }

    setLoading(true);
    try {
      const newMatch: CreateMatch = {
        homeTeamId: parseInt(homeTeamId),
        awayTeamId: parseInt(awayTeamId),
        homeScore: parseInt(homeScore),
        awayScore: parseInt(awayScore),
        matchDate: new Date().toISOString(),
      };
      await matchService.create(newMatch);
      setHomeTeamId('');
      setAwayTeamId('');
      setHomeScore('');
      setAwayScore('');
      onMatchCreated();
    } catch (error) {
      console.error('Error creating match:', error);
      alert('Failed to create match');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
          Record Match Result
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Home Team</label>
          <select
            value={homeTeamId}
            onChange={(e) => setHomeTeamId(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 hover:border-gray-300 disabled:bg-gray-50 bg-white cursor-pointer"
            disabled={loading}
          >
            <option value="">Select home team...</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Away Team</label>
          <select
            value={awayTeamId}
            onChange={(e) => setAwayTeamId(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 hover:border-gray-300 disabled:bg-gray-50 bg-white cursor-pointer"
            disabled={loading}
          >
            <option value="">Select away team...</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Home Score</label>
          <input
            type="number"
            min="0"
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 hover:border-gray-300 disabled:bg-gray-50"
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Away Score</label>
          <input
            type="number"
            min="0"
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 hover:border-gray-300 disabled:bg-gray-50"
            disabled={loading}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading || !homeTeamId || !awayTeamId || homeScore === '' || awayScore === ''}
        className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Recording...
          </span>
        ) : (
          'Record Match'
        )}
      </button>
    </form>
  );
};
