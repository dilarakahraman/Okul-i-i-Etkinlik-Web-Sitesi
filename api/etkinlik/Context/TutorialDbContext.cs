using etkinlik.Models;
using Microsoft.EntityFrameworkCore;

namespace etkinlik.Context
{
    public class TutorialDbContext:DbContext
    {
        public TutorialDbContext(DbContextOptions options) : base(options)
        {
        }
        protected TutorialDbContext()
        {
        }

        public DbSet<Cart> Carts { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventTransaction> EventTransactions { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
