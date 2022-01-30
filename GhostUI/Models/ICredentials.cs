namespace GhostUI.Models
{
    public interface ICredentials
    {
        string? userName   { get; set; }
        string? password   { get; set; }
        bool    rememberMe { get; set; }
    }
}