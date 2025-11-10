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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">⚽ Football Championship Table</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TeamForm onTeamCreated={handleTeamCreated} />
          <MatchForm teams={teams} onMatchCreated={handleMatchCreated} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StandingsTable teams={teams} />
          </div>
          <div>
            <MatchList matches={matches} />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">Football Championship Management System</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
