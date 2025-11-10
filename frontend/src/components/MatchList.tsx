import React from 'react';
import type { Match } from '../types';

interface MatchListProps {
  matches: Match[];
}

export const MatchList: React.FC<MatchListProps> = ({ matches }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-2xl font-bold p-6 bg-gray-50 border-b">Recent Matches</h2>
      <div className="divide-y divide-gray-200">
        {matches.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500">
            No matches recorded yet
          </div>
        ) : (
          matches.slice(0, 10).map((match) => (
            <div key={match.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{match.homeTeamName}</span>
                    <span className="text-2xl font-bold text-gray-900">{match.homeScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{match.awayTeamName}</span>
                    <span className="text-2xl font-bold text-gray-900">{match.awayScore}</span>
                  </div>
                </div>
                <div className="ml-6 text-sm text-gray-500">
                  {formatDate(match.matchDate)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
