namespace GhostUI.Models.Response
{
    public interface IAuthUser
    {
        string status   { get; }
        string token    { get; }
        string userName { get; }
    }
}
