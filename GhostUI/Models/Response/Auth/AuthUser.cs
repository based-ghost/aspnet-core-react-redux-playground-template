namespace GhostUI.Models.Response
{
    public class AuthUser : IAuthUser
    {
        public string status   { get; }
        public string token    { get; }
        public string userName { get; }

        public AuthUser(string _status, string _token, string _userName)
        {
            status = _status;
            token = _token;
            userName = _userName;
        }
    }
}
