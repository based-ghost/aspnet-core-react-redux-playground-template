using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace GhostUI
{
    // Contains the entry point and startup logic for the application.
    public static class Program
    {
        public static void Main(string[] args)
            => CreateWebHostBuilder(args).Build().Run();

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
            => WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
