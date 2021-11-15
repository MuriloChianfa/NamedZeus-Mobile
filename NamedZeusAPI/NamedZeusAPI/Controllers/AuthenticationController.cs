using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NamedZeusAPI.Conf;
using NamedZeusAPI.Models;
using NamedZeusAPI.Requests;
using NamedZeusAPI.Services;

namespace NamedZeusAPI.Controllers
{
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly Database _context;

        public AuthenticationController(Database context)
        {
            _context = context;
        }

        [Route("api/login")]
        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login(Login request)
        {
            User user;

            try
            {
                user = _context.User.Where(account => account.Email == request.Email).Where(account => account.Password == request.Password).First();
            }
            catch (InvalidOperationException)
            {
                return BadRequest(new
                {
                    error = "Invalid Email or Password!"
                });
            }

            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(new
            {
                user,
                token = Token.GenerateToken(user)
            });
        }

        [Route("api/logout")]
        [HttpPost]
        [Authorize]
        public ActionResult Logout()
        {
            return BadRequest(new
            {
                error = "Method not implemented"
            });
        }

        [Route("api/refresh")]
        [HttpPost]
        [AllowAnonymous]
        public ActionResult Refresh()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return BadRequest(new
                {
                    error = "Not Authenticated"
                });
            }

            int userId;

            try
            {
                userId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);
            }
            catch (InvalidOperationException)
            {
                return BadRequest(new
                {
                    error = "Not Authenticated"
                });
            }

            User user = _context.User.Where(account => account.Id == userId).First();

            return Ok(new
            {
                user,
                token = Token.GenerateToken(user)
            });
        }
    }
}
