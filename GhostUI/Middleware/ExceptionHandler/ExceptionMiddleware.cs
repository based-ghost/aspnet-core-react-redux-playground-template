using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace GhostUI.Middleware.ExceptionHandler
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            return context.Response.WriteAsync(BuildExceptionDetails(context.Response.StatusCode, exception)?.ToString());
        }

        private static IExceptionDetails BuildExceptionDetails(int statusCode, Exception exception)
        {
            return new ExceptionDetails
            {
                StatusCode = statusCode,
                Message = exception?.Message
            };
        }
    }
}
