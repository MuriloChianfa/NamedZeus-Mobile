using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NamedZeusAPI.Conf;
using NamedZeusAPI.Models;

namespace NamedZeusAPI.Controllers
{
    [Route("api/servers")]
    [ApiController]
    [Authorize]
    public class ServersController : ControllerBase
    {
        private readonly Database _context;

        public ServersController(Database context)
        {
            _context = context;
        }

        // GET: api/servers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Server>>> GetServer()
        {
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

            List<Server> serverList = await _context.Server.Where(server => server.UserId == userId).ToListAsync();

            return serverList;
        }

        // GET: api/servers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Server>> GetServer(int id)
        {
            var server = await _context.Server.FindAsync(id);

            if (server == null)
            {
                return NotFound();
            }

            return server;
        }

        // PUT: api/servers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServer(int id, [Bind("Name,IPAddress,NetflowPort,SNMPId,HealthCheck")] Server server)
        {
            if (id != server.Id)
            {
                return BadRequest();
            }

            _context.Entry(server).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServerExists(id))
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

        // POST: api/servers
        [HttpPost]
        public async Task<ActionResult<Server>> PostServer([Bind("Name,IPAddress,NetflowPort,SNMPId,HealthCheck")] Server server)
        {
            _context.Server.Add(server);

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

            server.UserId = user.Id;

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServer", new { id = server.Id }, server);
        }

        // DELETE: api/servers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServer(int id)
        {
            var server = await _context.Server.FindAsync(id);
            if (server == null)
            {
                return NotFound();
            }

            _context.Server.Remove(server);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServerExists(int id)
        {
            return _context.Server.Any(e => e.Id == id);
        }
    }
}
