namespace GhostUI.Models
{
    public interface IWeatherForecast
    {
        int     Id            { get; }
        int     TemperatureF  { get; }
        int     TemperatureC  { get; set; }
        string? DateFormatted { get; set; }
        string? Summary       { get; set; }
    }
}
