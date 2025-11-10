using ChampionshipTable.Application.DTOs;
using ChampionshipTable.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ChampionshipTable.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MatchesController : ControllerBase
{
    private readonly IMatchService _matchService;

    public MatchesController(IMatchService matchService)
    {
        _matchService = matchService;
    }

    [HttpGet]
    public async Task<ActionResult<List<MatchDto>>> GetAllMatches()
    {
        var matches = await _matchService.GetAllMatchesAsync();
        return Ok(matches);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MatchDto>> GetMatch(int id)
    {
        var match = await _matchService.GetMatchByIdAsync(id);
        if (match == null)
            return NotFound();

        return Ok(match);
    }

    [HttpPost]
    public async Task<ActionResult<MatchDto>> CreateMatch(CreateMatchDto createMatchDto)
    {
        var match = await _matchService.CreateMatchAsync(createMatchDto);
        if (match == null)
            return BadRequest("Invalid team IDs");

        return CreatedAtAction(nameof(GetMatch), new { id = match.Id }, match);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMatch(int id)
    {
        var result = await _matchService.DeleteMatchAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }
}
