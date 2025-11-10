using ChampionshipTable.Application.DTOs;
using ChampionshipTable.Application.Interfaces;
using ChampionshipTable.Domain.Entities;
using ChampionshipTable.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ChampionshipTable.Infrastructure.Repositories;

public class MatchService : IMatchService
{
    private readonly ChampionshipDbContext _context;

    public MatchService(ChampionshipDbContext context)
    {
        _context = context;
    }

    public async Task<List<MatchDto>> GetAllMatchesAsync()
    {
        var matches = await _context.Matches
            .Include(m => m.HomeTeam)
            .Include(m => m.AwayTeam)
            .OrderByDescending(m => m.MatchDate)
            .ToListAsync();

        return matches.Select(MapToDto).ToList();
    }

    public async Task<MatchDto?> GetMatchByIdAsync(int id)
    {
        var match = await _context.Matches
            .Include(m => m.HomeTeam)
            .Include(m => m.AwayTeam)
            .FirstOrDefaultAsync(m => m.Id == id);

        return match != null ? MapToDto(match) : null;
    }

    public async Task<MatchDto?> CreateMatchAsync(CreateMatchDto createMatchDto)
    {
        var homeTeam = await _context.Teams.FindAsync(createMatchDto.HomeTeamId);
        var awayTeam = await _context.Teams.FindAsync(createMatchDto.AwayTeamId);

        if (homeTeam == null || awayTeam == null)
            return null;

        var match = new Match
        {
            HomeTeamId = createMatchDto.HomeTeamId,
            AwayTeamId = createMatchDto.AwayTeamId,
            HomeScore = createMatchDto.HomeScore,
            AwayScore = createMatchDto.AwayScore,
            MatchDate = createMatchDto.MatchDate,
            IsFinished = true
        };

        _context.Matches.Add(match);

        // Update team statistics
        if (match.HomeScore > match.AwayScore)
        {
            homeTeam.RecordWin(match.HomeScore, match.AwayScore);
            awayTeam.RecordLoss(match.AwayScore, match.HomeScore);
        }
        else if (match.HomeScore < match.AwayScore)
        {
            homeTeam.RecordLoss(match.HomeScore, match.AwayScore);
            awayTeam.RecordWin(match.AwayScore, match.HomeScore);
        }
        else
        {
            homeTeam.RecordDraw(match.HomeScore, match.AwayScore);
            awayTeam.RecordDraw(match.AwayScore, match.HomeScore);
        }

        await _context.SaveChangesAsync();

        match.HomeTeam = homeTeam;
        match.AwayTeam = awayTeam;

        return MapToDto(match);
    }

    public async Task<bool> DeleteMatchAsync(int id)
    {
        var match = await _context.Matches.FindAsync(id);
        if (match == null)
            return false;

        _context.Matches.Remove(match);
        await _context.SaveChangesAsync();
        return true;
    }

    private static MatchDto MapToDto(Match match)
    {
        return new MatchDto
        {
            Id = match.Id,
            HomeTeamId = match.HomeTeamId,
            HomeTeamName = match.HomeTeam?.Name ?? "",
            AwayTeamId = match.AwayTeamId,
            AwayTeamName = match.AwayTeam?.Name ?? "",
            HomeScore = match.HomeScore,
            AwayScore = match.AwayScore,
            MatchDate = match.MatchDate,
            IsFinished = match.IsFinished
        };
    }
}
