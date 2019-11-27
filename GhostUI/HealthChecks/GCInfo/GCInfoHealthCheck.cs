using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace GhostUI.HealthChecks
{
    public class GCInfoHealthCheck : IHealthCheck
    {
        private readonly IOptionsMonitor<IGCInfoOptions> _options;

        public GCInfoHealthCheck(IOptionsMonitor<GCInfoOptions> options)
        {
            _options = options;
        }

        public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            // This example will report degraded status if the application is using more than the configured amount of memory (1gb by default).
            // Additionally we include some GC info in the reported diagnostics.
            var options = _options.Get(context.Registration.Name);
            var allocated = GC.GetTotalMemory(forceFullCollection: false);

            var data = new Dictionary<string, object>
            {
                { "Allocated", allocated },
                { "Gen0Collections", GC.CollectionCount(0) },
                { "Gen1Collections", GC.CollectionCount(1) },
                { "Gen2Collections", GC.CollectionCount(2) }
            };

            // Report failure if the allocated memory is >= the threshold.
            // Using context.Registration.FailureStatus means that the application developer can configure how they want failures to appear.
            var result = allocated >= options.Threshold
                ? context.Registration.FailureStatus
                : HealthStatus.Healthy;

            return Task.FromResult(new HealthCheckResult(
                result,
                description: "reports degraded status if allocated bytes >= 1gb",
                data: data));
        }
    }
}