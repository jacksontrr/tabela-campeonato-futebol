import React from 'react';
import type { Team } from '../types';

interface StandingsTableProps {
  teams: Team[];
}

export const StandingsTable: React.FC<StandingsTableProps> = ({ teams }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-2xl font-bold p-6 bg-gray-50 border-b">Championship Standings</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Pos</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Team</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">P</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">W</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">D</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">L</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">GF</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">GA</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">GD</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teams.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                  No teams registered yet
                </td>
              </tr>
            ) : (
              teams.map((team, index) => (
                <tr key={team.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{team.name}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">{team.matchesPlayed}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">{team.wins}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">{team.draws}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">{team.losses}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">{team.goalsFor}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">{team.goalsAgainst}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">
                    <span className={team.goalDifference >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center font-bold text-gray-900">{team.points}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
