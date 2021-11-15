using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NamedZeusAPI.Conf;
using NamedZeusAPI.Models;
using NamedZeusAPI.Requests;

namespace NamedZeusAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Database _context;

        public UsersController(Database context)
        {
            _context = context;
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutUser(int id, [Bind("Name,Email,Password")] User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/users/avatar
        [Route("avatar")]
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Avatar(GenericData data)
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

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                user.Avatar = data.data;

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(userId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new
            {
                message = "ok"
            });
        }

        // POST: api/users
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<User>> PostUser([Bind("Name,Email,Password")] User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }
    }
}
