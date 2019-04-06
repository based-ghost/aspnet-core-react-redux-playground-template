using System.Net;
using GhostUI.Hubs;
using GhostUI.Models;
using NSwag.AspNetCore;
using GhostUI.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.DependencyInjection;

namespace GhostUI
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Custom healthcheck example (using nuget package .AddHealthChecksUI() to view results at {url}/healthchecks-ui)
            services.AddHealthChecksUI()
                .AddHealthChecks()
                .AddGCInfoCheck("GCInfo");

            // Add CORS, Brotli/Gzip response compression (prod only), MVC, SignalR
            services.AddCorsConfig("AllowAll")
                .AddResponseCompressionConfig(Configuration)
                .AddMvcConfig(CompatibilityVersion.Version_2_2)
                .AddSignalR();

            // Register the Swagger services
            services.AddSwaggerDocument(settings => settings.Title = $"{this.GetType().Namespace} API");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // If development, enable Hot Module Replacement
            // If production, enable Brotli/Gzip response compression & strict transport security headers
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage()
                   .UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                   {
                       HotModuleReplacement = true,
                       ReactHotModuleReplacement = true
                   });
            }
            else
            {
                app.UseResponseCompression();
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            // Global exception handling
            app.UseExceptionHandler(builder =>
            {
                builder.Run(async context =>
                {
                    var error = context.Features.Get<IExceptionHandlerFeature>();
                    var exDetails = new ExceptionDetails((int)HttpStatusCode.InternalServerError, error?.Error.Message);

                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = exDetails.StatusCode;
                    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    context.Response.Headers.Add("Application-Error", exDetails.Message);
                    context.Response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");

                    await context.Response.WriteAsync(exDetails.ToString());
                });
            });

            // Enable all custom health checks registered earlier (browse to {url}/healthchecks-ui to UI / {url}/healthchecks-json to raw JSON)
            app.UseApiHealthChecks("/healthchecks-json")
               .UseHealthChecksUI();

            // Register the Swagger generator and the Swagger UI middlewares
            // NSwage.MsBuild + adding automation config in GhostUI.csproj makes this part of the build step (updates to API will be handled automatically)
            app.UseSwaggerUi3(settings =>
            {
                settings.Path = "/docs";
                settings.DocumentPath = "/docs/api-specification.json";
            });

            app.UseCors("AllowAll")
               .UseStaticFiles()
               .UseSignalR((options) => options.MapHub<UsersHub>("/hubs/users"))
               .UseMvc(routes =>
               {
                   routes.MapRoute("default", "{controller=Home}/{action=Index}/{id?}")
                         .MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
               });
        }
    }
}
