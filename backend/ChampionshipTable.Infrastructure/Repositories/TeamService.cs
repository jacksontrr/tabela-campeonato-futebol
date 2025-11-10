using ChampionshipTable.Application.DTOs;
using ChampionshipTable.Application.Interfaces;
using ChampionshipTable.Domain.Entities;
using ChampionshipTable.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ChampionshipTable.Infrastructure.Repositories;

public class TeamService : ITeamService
{
    private readonly ChampionshipDbContext _context;

    public TeamService(ChampionshipDbContext context)
    {
        _context = context;
    }

    public async Task<List<TeamDto>> GetAllTeamsAsync()
    {
        var teams = await _context.Teams.ToListAsync();
        
        var sortedTeams = teams
            .OrderByDescending(t => t.Points)
            .ThenByDescending(t => t.GoalDifference)
            .ThenByDescending(t => t.GoalsFor)
            .ToList();

        return sortedTeams.Select(MapToDto).ToList();
    }

    public async Task<TeamDto?> GetTeamByIdAsync(int id)
    {
        var team = await _context.Teams.FindAsync(id);
        return team != null ? MapToDto(team) : null;
    }

    public async Task<TeamDto> CreateTeamAsync(CreateTeamDto createTeamDto)
    {
        var team = new Team
        {
            Name = createTeamDto.Name
        };

        _context.Teams.Add(team);
        await _context.SaveChangesAsync();

        return MapToDto(team);
    }

    public async Task<bool> DeleteTeamAsync(int id)
    {
        var team = await _context.Teams.FindAsync(id);
        if (team == null)
            return false;

        _context.Teams.Remove(team);
        await _context.SaveChangesAsync();
        return true;
    }

    private static TeamDto MapToDto(Team team)
    {
        return new TeamDto
        {
            Id = team.Id,
            Name = team.Name,
            Points = team.Points,
            Wins = team.Wins,
            Draws = team.Draws,
            Losses = team.Losses,
            GoalsFor = team.GoalsFor,
            GoalsAgainst = team.GoalsAgainst,
            GoalDifference = team.GoalDifference,
            MatchesPlayed = team.MatchesPlayed
        };
    }
}
