namespace GhostUI.Middleware.ExceptionHandler
{
    public interface IExceptionDetails
    {
        int    StatusCode { get; set; }
        string Message    { get; set; }
        string ToString();
    }
}
