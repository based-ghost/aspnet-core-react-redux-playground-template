using System.Net;
using GhostUI.Hubs;
using GhostUI.Models;
using GhostUI.Extensions;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
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

// Add CORS
builder.Services.AddCorsConfig(corsPolicyName);

// Register RazorPages/Controllers
builder.Services.AddControllers();

// Add Brotli/Gzip response compression (prod only)
builder.Services.AddResponseCompressionConfig(builder.Configuration);

// Add SignalR
builder.Services.AddSignalR();

// Config change in asp.net core 3.0+ - 'Async' suffix in action names get stripped by default - so, to access them by full name with 'Async' part - opt out of this feature.
builder.Services.AddMvc(opt => opt.SuppressAsyncSuffixInActionNames = false);

// In production, the Vue files will be served from this directory
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

// Global exception handling
app.UseExceptionHandler(builder =>
{
    builder.Run(async context =>
    {
        var error = context.Features.Get<IExceptionHandlerFeature>();
        var exDetails = new ExceptionDetails((int)HttpStatusCode.InternalServerError, error?.Error.Message ?? "");

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = exDetails.StatusCode;
        context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        context.Response.Headers.Add("Application-Error", exDetails.Message);
        context.Response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");

        await context.Response.WriteAsync(exDetails.ToString());
    });
});

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

// Map controllers / SignalR hubs / HealthChecks
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<UsersHub>("/hubs/users");
});

// PERSISTING ISSUE STILL IN .NET 5:
// Killing .NET debug session does not kill spawned Node.js process (have to manually kill)
app.UseSpa(spa =>
{
    spa.Options.SourcePath = spaSrcPath;

    if (app.Environment.IsDevelopment())
        spa.UseReactDevelopmentServer(npmScript: "start");
});

app.Run();