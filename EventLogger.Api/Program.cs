using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventLogger.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")?.ToLower();            
            var logger = NLogBuilder.ConfigureNLog($"nlog.{environment}.config").GetCurrentClassLogger();

            try
            {
                logger.Info($"NetCore EventLoggerApi Started with invorment {environment}");
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                logger.Fatal(ex, "Host EventLoggerApi terminated unexpectedly");
                throw;
            }
            finally
            {
                NLog.LogManager.Shutdown();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>()
                            .UseSetting(WebHostDefaults.DetailedErrorsKey, "true")
                            .CaptureStartupErrors(true);
                }).ConfigureLogging(builder =>
                {
                    builder.ClearProviders();
                }).UseNLog();
    }
}
