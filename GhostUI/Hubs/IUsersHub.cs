using System.Threading.Tasks;

namespace GhostUI.Hubs
{
    public interface IUsersHub
    {
        Task UserLogin();
        Task UserLogout();
        Task CloseAllConnections(string reason);
    }
}