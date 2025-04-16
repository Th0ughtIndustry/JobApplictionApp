using JobTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTrackerAPI.Data {
    public class ApplicationDbContext : DbContext {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<JobApplication> JobApplications { get; set; }
    }
}