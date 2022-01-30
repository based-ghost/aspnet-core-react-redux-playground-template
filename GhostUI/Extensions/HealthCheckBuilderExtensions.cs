using System.Linq;
using GhostUI.HealthChecks;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace GhostUI.Extensions
{
    public static class HealthChecksBuilderExtensions
    {
        public static IHealthChecksBuilder AddGCInfoCheck(
            this IHealthChecksBuilder builder,
            string name,
            HealthStatus? failureStatus = null,
            IEnumerable<string>? tags = null,
            long? thresholdInBytes = null)
        {
            builder.AddCheck<GCInfoHealthCheck>(
                name, 
                failureStatus ?? HealthStatus.Degraded, 
                tags ?? Enumerable.Empty<string>());

            if (thresholdInBytes.HasValue)
                builder.Services.Configure<GCInfoOptions>(name, options => options.Threshold = thresholdInBytes.Value);

            return builder;
        }
    }
}