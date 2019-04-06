namespace GhostUI.Models
{
    public interface IAuthUser
    {
        string status   { get; }
        string token    { get; }
        string userName { get; }
    }
}
