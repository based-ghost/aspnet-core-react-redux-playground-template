namespace GhostUI.Models.Request
{
    public interface ICredentials
    {
        string userName   { get; set; }
        string password   { get; set; }
        bool   rememberMe { get; set; }
    }
}
