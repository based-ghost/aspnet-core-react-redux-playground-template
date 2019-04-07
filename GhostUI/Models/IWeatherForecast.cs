namespace GhostUI.Models
{
    public interface IWeatherForecast
    {
        int    ID            { get; }
        int    TemperatureF  { get; }
        int    TemperatureC  { get; set; }
        string DateFormatted { get; set; }
        string Summary       { get; set; }
    }
}
