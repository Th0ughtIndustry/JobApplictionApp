using JobTrackerAPI.Data;
using JobTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JobTrackerAPI.Repositories {
    
    public class JobApplicationRepository : IJobApplicationRepository {
        
        private readonly ApplicationDbContext _context;

        public JobApplicationRepository(ApplicationDbContext context) {
            _context = context;
        }

        public async Task<IEnumerable<JobApplication>> GetAllAsync() {
            return await _context.JobApplications.ToListAsync();
        }

        public async Task<JobApplication> GetByIdAsync(int id) {
            return await _context.JobApplications.FindAsync(id);
        }

        public async Task AddAsync(JobApplication jobApp) {
            await _context.JobApplications.AddAsync(jobApp);
        }

        public async Task SaveChangesAsync() {
            await _context.SaveChangesAsync();
        }
    }
}