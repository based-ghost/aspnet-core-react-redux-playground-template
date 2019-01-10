namespace GhostUI.Models.Response
{
    public interface IWeatherForecast
    {
        int    TemperatureC  { get; set; }
        string DateFormatted { get; set; }
        string Summary       { get; set; }
        int    TemperatureF  { get; }
    }
}
