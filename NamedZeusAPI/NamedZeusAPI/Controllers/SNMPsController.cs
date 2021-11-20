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
    [Route("api/snmps")]
    [ApiController]
    [Authorize]
    public class SNMPsController : ControllerBase
    {
        private readonly Database _context;

        public SNMPsController(Database context)
        {
            _context = context;
        }

        // GET: api/snmps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SNMP>>> GetSnmp()
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

            List<SNMP> SNMPList = await _context.Snmp.Where(Snmp => Snmp.UserId == userId).ToListAsync();

            return SNMPList;
        }

        // GET: api/snmps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SNMP>> GetSNMP(int id)
        {
            var snmp = await _context.Snmp.FindAsync(id);

            if (snmp == null)
            {
                return NotFound();
            }

            return snmp;
        }

        // PUT: api/snmps/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSNMP(int id, [Bind("Id,Version,User,Password")] SNMP snmp)
        {
            if (id != snmp.Id)
            {
                return BadRequest();
            }

            _context.Entry(snmp).State = EntityState.Modified;

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

            snmp.UserId = user.Id;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SNMPExists(id))
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
                message = "Updated with success"
            });
        }

        // POST: api/snmps
        [HttpPost]
        public async Task<ActionResult<SNMP>> PostSNMP([Bind("Version,User,Password")] SNMP snmp)
        {
            _context.Snmp.Add(snmp);

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

            snmp.UserId = user.Id;

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSNMP", new { id = snmp.Id }, snmp);
        }

        // DELETE: api/snmps/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSNMP(int id)
        {
            var snmp = await _context.Snmp.FindAsync(id);

            if (snmp == null)
            {
                return NotFound();
            }

            _context.Snmp.Remove(snmp);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Deleted with success"
            });
        }

        private bool SNMPExists(int id)
        {
            return _context.Snmp.Any(e => e.Id == id);
        }
    }
}
