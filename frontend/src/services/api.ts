import type { Team, CreateTeam, Match, CreateMatch } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const teamService = {
  async getAll(): Promise<Team[]> {
    const response = await fetch(`${API_BASE_URL}/teams`);
    if (!response.ok) throw new Error('Failed to fetch teams');
    return response.json();
  },

  async getById(id: number): Promise<Team> {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`);
    if (!response.ok) throw new Error('Failed to fetch team');
    return response.json();
  },

  async create(team: CreateTeam): Promise<Team> {
    const response = await fetch(`${API_BASE_URL}/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team),
    });
    if (!response.ok) throw new Error('Failed to create team');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete team');
  },
};

export const matchService = {
  async getAll(): Promise<Match[]> {
    const response = await fetch(`${API_BASE_URL}/matches`);
    if (!response.ok) throw new Error('Failed to fetch matches');
    return response.json();
  },

  async getById(id: number): Promise<Match> {
    const response = await fetch(`${API_BASE_URL}/matches/${id}`);
    if (!response.ok) throw new Error('Failed to fetch match');
    return response.json();
  },

  async create(match: CreateMatch): Promise<Match> {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(match),
    });
    if (!response.ok) throw new Error('Failed to create match');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/matches/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete match');
  },
};
