using GhostUI.Hubs;
using GhostUI.Extensions;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

var spaSrcPath = "ClientApp";
var corsPolicyName = "AllowAll";
var builder = WebApplication.CreateBuilder(args);

// Custom healthcheck example
builder.Services.AddHealthChecks()
    .AddGCInfoCheck("GCInfo");

// Write healthcheck custom results to healthchecks-ui (use InMemory for the DB - AspNetCore.HealthChecks.UI.InMemory.Storage nuget package)
builder.Services.AddHealthChecksUI()
    .AddInMemoryStorage();

builder.Services.AddCorsConfig(corsPolicyName);
builder.Services.AddControllers();
builder.Services.AddSignalR();

// Add Brotli/Gzip response compression (prod only)
builder.Services.AddResponseCompressionConfig(builder.Configuration);

// Config change in asp.net core 3.0+ - 'Async' suffix in action names get stripped by default - so, to access them by full name with 'Async' part - opt out of this feature.
builder.Services.AddMvc(opt => opt.SuppressAsyncSuffixInActionNames = false);

// In production, the React files will be served from this directory
builder.Services.AddSpaStaticFiles(opt => opt.RootPath = $"{spaSrcPath}/dist");

// Register the Swagger services (using OpenApi 3.0)
builder.Services.AddOpenApiDocument(settings =>
{
    settings.Version = "v1";
    settings.Title = "GhostUI API";
    settings.Description = "Detailed Description of API";
});

var app = builder.Build();

// If development, enable Hot Module Replacement
// If production, enable Brotli/Gzip response compression & strict transport security headers
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseResponseCompression();
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseCustomExceptionHandler();
app.UseCors(corsPolicyName);

// Show/write HealthReport data from healthchecks (AspNetCore.HealthChecks.UI.Client nuget package)
app.UseHealthChecksUI();
app.UseHealthChecks("/healthchecks-json", new HealthCheckOptions()
{
    Predicate = _ => true,
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});

// Register the Swagger generator and the Swagger UI middlewares
// NSwage.MsBuild + adding automation config in GhostUI.csproj makes this part of the build step (updates to API will be handled automatically)
app.UseOpenApi();
app.UseSwaggerUi3();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSpaStaticFiles();
app.UseRouting();

// Map controllers / SignalR hubs
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<UsersHub>("/hubs/users");
});

// PERSISTING ISSUE STILL IN .NET 6:
// Killing .NET debug session does not kill spawned Node.js process (have to manually kill)
app.UseSpa(spa =>
{
    spa.Options.SourcePath = spaSrcPath;

    if (app.Environment.IsDevelopment())
        spa.UseReactDevelopmentServer(npmScript: "start");
});

app.Run();