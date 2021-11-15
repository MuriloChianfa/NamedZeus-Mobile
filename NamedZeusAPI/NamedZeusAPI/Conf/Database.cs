using Microsoft.EntityFrameworkCore;
using NamedZeusAPI.Models;

namespace NamedZeusAPI.Conf
{
    public class Database : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Server> Server { get; set; }
        public DbSet<SNMP> Snmp { get; set; }

        public Database(DbContextOptions<Database> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
