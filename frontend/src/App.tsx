import { useState, useEffect } from 'react';
import type { Team, Match } from './types';
import { teamService, matchService } from './services/api';
import { TeamForm } from './components/TeamForm';
import { StandingsTable } from './components/StandingsTable';
import { MatchForm } from './components/MatchForm';
import { MatchList } from './components/MatchList';

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setError(null);
      const [teamsData, matchesData] = await Promise.all([
        teamService.getAll(),
        matchService.getAll(),
      ]);
      setTeams(teamsData);
      setMatches(matchesData);
    } catch (err) {
      setError('Failed to load data. Make sure the backend is running.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTeamCreated = () => {
    fetchData();
  };

  const handleMatchCreated = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white py-8 shadow-xl">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight">
            ⚽ Football Championship Table
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg shadow-md animate-fade-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <TeamForm onTeamCreated={handleTeamCreated} />
          <MatchForm teams={teams} onMatchCreated={handleMatchCreated} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <StandingsTable teams={teams} />
          </div>
          <div className="lg:col-span-1">
            <MatchList matches={matches} />
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">Football Championship Management System</p>
          <p className="text-xs text-gray-500 mt-1">© 2025 All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
