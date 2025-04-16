using JobTrackerAPI.Data;
using JobTrackerAPI.Models;
using JobTrackerAPI.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("JobAppDB"));

builder.Services.AddScoped<IJobApplicationRepository, JobApplicationRepository>();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.UseCors("AllowAngularApp");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();



using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    context.JobApplications.AddRange(
        new JobApplication { CompanyName = "Google", Position = "Software Engineer", Status = Status.Applied, DateApplied = DateTime.UtcNow },
        new JobApplication { CompanyName = "Microsoft", Position = "DevOps Engineer", Status = Status.Interview, DateApplied = DateTime.UtcNow.AddDays(-5) },
        new JobApplication { CompanyName = "Amazon", Position = "Cloud Architect", Status = Status.Interview, DateApplied = DateTime.UtcNow.AddDays(-10) },
        new JobApplication { CompanyName = "Facebook", Position = "Data Scientist", Status = Status.Rejected, DateApplied = DateTime.UtcNow.AddDays(-15) },
        new JobApplication { CompanyName = "Apple", Position = "iOS Developer", Status = Status.Applied, DateApplied = DateTime.UtcNow.AddDays(-20) },
        new JobApplication { CompanyName = "Netflix", Position = "Backend Engineer", Status = Status.Interview, DateApplied = DateTime.UtcNow.AddDays(-25) },
        new JobApplication { CompanyName = "Tesla", Position = "AI Researcher", Status = Status.Applied, DateApplied = DateTime.UtcNow.AddDays(-30) },
        new JobApplication { CompanyName = "Adobe", Position = "Frontend Developer", Status = Status.Rejected, DateApplied = DateTime.UtcNow.AddDays(-35) },
        new JobApplication { CompanyName = "Intel", Position = "Hardware Engineer", Status = Status.Applied, DateApplied = DateTime.UtcNow.AddDays(-40) },
        new JobApplication { CompanyName = "IBM", Position = "Blockchain Developer", Status = Status.Applied, DateApplied = DateTime.UtcNow.AddDays(-45) }
    );

    context.SaveChanges();
}

app.Run();