namespace GhostUI.Models
{
    public interface ICredentials
    {
        string? UserName   { get; set; }
        string? Password   { get; set; }
        bool    RememberMe { get; set; }
    }
}