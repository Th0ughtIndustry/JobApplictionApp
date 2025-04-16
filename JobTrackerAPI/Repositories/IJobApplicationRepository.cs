using JobTrackerAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JobTrackerAPI.Repositories {
    public interface IJobApplicationRepository {
        Task<IEnumerable<JobApplication>> GetAllAsync();
        Task<JobApplication> GetByIdAsync(int id);
        Task AddAsync(JobApplication jobApp);
        Task SaveChangesAsync();
    }
}