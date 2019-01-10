using Newtonsoft.Json;
using System.IO.Compression;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.ResponseCompression;

namespace GhostUI.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCorsConfig(this IServiceCollection services, string name)
        {
            services.AddCors(options =>
                options.AddPolicy(name,
                    corsBuilder =>
                        corsBuilder
                            .AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials()));

            return services;
        }

        public static IServiceCollection AddMvcConfig(this IServiceCollection services, CompatibilityVersion aspCoreVersion)
        {
            services.AddMvc()
                .SetCompatibilityVersion(aspCoreVersion)
                .AddJsonOptions(options => {
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                });

            return services;
        }

        public static IServiceCollection AddResponseCompression_Gzip(this IServiceCollection services, IEnumerable<string> mimeTypes, CompressionLevel compressionLvl, bool enableForHttps = false)
        {
            services.AddResponseCompression(options => {
                options.EnableForHttps = enableForHttps;
                options.Providers.Add<GzipCompressionProvider>();
                options.MimeTypes = mimeTypes;
            });

            services.Configure<GzipCompressionProviderOptions>(options => options.Level = compressionLvl);

            return services;
        }
    }
}
