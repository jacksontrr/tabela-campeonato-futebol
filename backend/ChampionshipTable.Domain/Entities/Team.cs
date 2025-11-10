namespace ChampionshipTable.Domain.Entities;

public class Team
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Points { get; set; }
    public int Wins { get; set; }
    public int Draws { get; set; }
    public int Losses { get; set; }
    public int GoalsFor { get; set; }
    public int GoalsAgainst { get; set; }
    public int GoalDifference => GoalsFor - GoalsAgainst;
    public int MatchesPlayed => Wins + Draws + Losses;

    public void RecordWin(int goalsFor, int goalsAgainst)
    {
        Wins++;
        Points += 3;
        GoalsFor += goalsFor;
        GoalsAgainst += goalsAgainst;
    }

    public void RecordDraw(int goalsFor, int goalsAgainst)
    {
        Draws++;
        Points += 1;
        GoalsFor += goalsFor;
        GoalsAgainst += goalsAgainst;
    }

    public void RecordLoss(int goalsFor, int goalsAgainst)
    {
        Losses++;
        GoalsFor += goalsFor;
        GoalsAgainst += goalsAgainst;
    }
}
