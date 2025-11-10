import React from 'react';
import type { Team } from '../types';

interface StandingsTableProps {
  teams: Team[];
}

export const StandingsTable: React.FC<StandingsTableProps> = ({ teams }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          Championship Standings
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Pos</th>
              <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Team</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">P</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">W</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">D</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">L</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">GF</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">GA</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">GD</th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {teams.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span className="text-gray-500 font-medium">No teams registered yet</span>
                    <span className="text-sm text-gray-400">Add your first team to get started!</span>
                  </div>
                </td>
              </tr>
            ) : (
              teams.map((team, index) => (
                <tr 
                  key={team.id} 
                  className={`
                    transition-all duration-200 hover:bg-blue-50 hover:shadow-md cursor-pointer
                    ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                    ${index === 0 ? 'bg-gradient-to-r from-yellow-50 to-amber-50' : ''}
                  `}
                >
                  <td className="px-4 py-4 text-sm font-bold">
                    <span className={`
                      inline-flex items-center justify-center w-8 h-8 rounded-full
                      ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white' : 'bg-gray-200 text-gray-700'}
                    `}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-bold text-gray-900">{team.name}</td>
                  <td className="px-4 py-4 text-sm text-center text-gray-700 font-medium">{team.matchesPlayed}</td>
                  <td className="px-4 py-4 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {team.wins}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                      {team.draws}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                      {team.losses}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-center text-gray-700 font-medium">{team.goalsFor}</td>
                  <td className="px-4 py-4 text-sm text-center text-gray-700 font-medium">{team.goalsAgainst}</td>
                  <td className="px-4 py-4 text-sm text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                      team.goalDifference > 0 
                        ? 'bg-green-100 text-green-700' 
                        : team.goalDifference < 0 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-base font-bold bg-blue-600 text-white">
                      {team.points}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
