// Controllers/JobApplicationsController.cs
using JobTrackerAPI.Models;
using JobTrackerAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace JobTrackerAPI.Controllers {
    [ApiController]
    [Route("applications")]
    public class JobApplicationsController : ControllerBase {
        private readonly IJobApplicationRepository _repository;

        public JobApplicationsController(IJobApplicationRepository repository) {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var apps = await _repository.GetAllAsync();
            if (!apps.Any()) {
                return NoContent();
            }
            return Ok(apps);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) {
            var app = await _repository.GetByIdAsync(id);
            if (app == null) return NotFound();
            return Ok(app);
        }

        [HttpPost]
        public async Task<IActionResult> Create(JobApplication jobApp) {
            await _repository.AddAsync(jobApp);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = jobApp.Id }, jobApp);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, JobApplication jobApp) {
            if (id != jobApp.Id) return BadRequest();
            var existingApp = await _repository.GetByIdAsync(id);
            if (existingApp == null) return NotFound();
            existingApp.CompanyName = jobApp.CompanyName;
            existingApp.Position = jobApp.Position;
            existingApp.Status = jobApp.Status;
            existingApp.DateApplied = jobApp.DateApplied;
            await _repository.SaveChangesAsync();
            return NoContent();
        }
    }
}