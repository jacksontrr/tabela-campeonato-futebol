using ChampionshipTable.Application.DTOs;

namespace ChampionshipTable.Application.Interfaces;

public interface ITeamService
{
    Task<List<TeamDto>> GetAllTeamsAsync();
    Task<TeamDto?> GetTeamByIdAsync(int id);
    Task<TeamDto> CreateTeamAsync(CreateTeamDto createTeamDto);
    Task<bool> DeleteTeamAsync(int id);
}
