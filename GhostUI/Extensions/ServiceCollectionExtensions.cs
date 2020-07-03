using System.IO.Compression;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.ResponseCompression;

namespace GhostUI.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCorsConfig(this IServiceCollection services, string name)
        {
            services.AddCors(c => c.AddPolicy(name,
                options => options.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()));

            return services;
        }

        public static IServiceCollection AddResponseCompressionConfig(this IServiceCollection services, IConfiguration config, CompressionLevel compressionLvl = CompressionLevel.Fastest)
        {
            var enableForHttps = config.GetValue<bool>("Compression:EnableForHttps");
            var gzipMimeTypes = config.GetSection("Compression:MimeTypes").Get<string[]>();

            services.AddResponseCompression(options => {
                options.Providers.Add<BrotliCompressionProvider>();
                options.Providers.Add<GzipCompressionProvider>();
                options.EnableForHttps = enableForHttps;
                options.MimeTypes = gzipMimeTypes;
            });

            services.Configure<BrotliCompressionProviderOptions>(options => options.Level = compressionLvl);
            services.Configure<GzipCompressionProviderOptions>(options => options.Level = compressionLvl);

            return services;
        }
    }
}
