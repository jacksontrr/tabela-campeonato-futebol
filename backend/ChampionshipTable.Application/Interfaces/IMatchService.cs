using ChampionshipTable.Application.DTOs;

namespace ChampionshipTable.Application.Interfaces;

public interface IMatchService
{
    Task<List<MatchDto>> GetAllMatchesAsync();
    Task<MatchDto?> GetMatchByIdAsync(int id);
    Task<MatchDto?> CreateMatchAsync(CreateMatchDto createMatchDto);
    Task<bool> DeleteMatchAsync(int id);
}
