using GhostUI.Hubs;
using GhostUI.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace GhostUI.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AuthController : Controller
    {
        private readonly IHubContext<UsersHub> _hubContext;

        public AuthController(IHubContext<UsersHub> usersHub)
        {
            _hubContext = usersHub;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody]Credentials request)
        {
            var authUser = new AuthUser("success", "38595847A485DJSHND94857", request?.userName);
            await _hubContext.Clients.All.SendAsync("UserLogin");
            return Ok(authUser);
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _hubContext.Clients.All.SendAsync("UserLogout");
            return Ok();
        }
    }
}