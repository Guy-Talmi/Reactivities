using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

// localhost:5001/api/Activities
[AllowAnonymous]
public class ActivitiesController : BaseApiController
{
    [HttpGet] // /api/activities
    public async Task<IActionResult> GetActivities()
    {
        var Result = await Mediator.Send(new List.Query());

        return HandleResult(Result);
    }

    [HttpGet("{id}")] // /api/activities/id
    public async Task<IActionResult> GetActivity(Guid id)
    {
        var Result = await Mediator.Send(new Details.Query { Id = id });

        return HandleResult(Result);
    }

    [HttpPost] // /api/activities
    public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
    {
        var result = await Mediator.Send(new Create.Command { Activity = activity });

        return HandleResult(result);
    }

    [HttpPut("{id}")] // /api/activities/id
    public async Task<IActionResult> EditActivity(Guid id, [FromBody] Activity activity)
    {
        activity.Id = id;
        var result = await Mediator.Send(new Edit.Command { Activity = activity });

        return HandleResult(result);
    }

    [HttpDelete("{id}")] // /api/activities/id
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        var result = await Mediator.Send(new Delete.Command { Id = id });

        return HandleResult(result);
    }
}