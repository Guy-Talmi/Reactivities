using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    public DataContext _Context { get; }

    public ActivitiesController(DataContext context)
    {
        _Context = context;
    }

    [HttpGet] // /api/activities
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await _Context.Activities.ToListAsync();
    }

    [HttpGet("{id}")] // /api/activities/id
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return await _Context.Activities.FindAsync(id);
    }


}