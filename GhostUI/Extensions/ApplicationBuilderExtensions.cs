using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;

namespace GhostUI.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseApiHealthChecks(this IApplicationBuilder app, string path)
        {
            return app.UseHealthChecks(path, new HealthCheckOptions
            {
                Predicate = _ => true,
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
            });
        }
    }
}
