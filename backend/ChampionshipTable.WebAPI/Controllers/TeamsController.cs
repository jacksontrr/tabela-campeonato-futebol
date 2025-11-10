using ChampionshipTable.Application.DTOs;
using ChampionshipTable.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ChampionshipTable.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamsController : ControllerBase
{
    private readonly ITeamService _teamService;

    public TeamsController(ITeamService teamService)
    {
        _teamService = teamService;
    }

    [HttpGet]
    public async Task<ActionResult<List<TeamDto>>> GetAllTeams()
    {
        var teams = await _teamService.GetAllTeamsAsync();
        return Ok(teams);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TeamDto>> GetTeam(int id)
    {
        var team = await _teamService.GetTeamByIdAsync(id);
        if (team == null)
            return NotFound();

        return Ok(team);
    }

    [HttpPost]
    public async Task<ActionResult<TeamDto>> CreateTeam(CreateTeamDto createTeamDto)
    {
        var team = await _teamService.CreateTeamAsync(createTeamDto);
        return CreatedAtAction(nameof(GetTeam), new { id = team.Id }, team);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTeam(int id)
    {
        var result = await _teamService.DeleteTeamAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }
}
