namespace ChampionshipTable.Application.DTOs;

public class CreateMatchDto
{
    public int HomeTeamId { get; set; }
    public int AwayTeamId { get; set; }
    public int HomeScore { get; set; }
    public int AwayScore { get; set; }
    public DateTime MatchDate { get; set; }
}
