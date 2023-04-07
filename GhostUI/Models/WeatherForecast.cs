﻿using System;

namespace GhostUI.Models
{
    public class WeatherForecast : IWeatherForecast
    {
        public int     TemperatureC  { get; set; }
        public string? DateFormatted { get; set; }
        public string? Summary       { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public int Id => Random.Shared.Next(0, 1000);
    }
}
