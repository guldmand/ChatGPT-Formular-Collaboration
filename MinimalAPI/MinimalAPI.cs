using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/submit-form", async (HttpRequest req) => {
    // Check for the "x-api-key" header instead of "ThisIsJustATest"
    if (!req.Headers.ContainsKey("x-api-key") || req.Headers["x-api-key"] != "ThisIsJustATest") {
        return Results.BadRequest("API key is missing or incorrect.");
    }

    // Assuming you're sending JSON data from the client
    // Define a class that matches the expected structure of your form data
    var formData = await req.ReadFromJsonAsync<YourApplication.Models.MyFormData>();

    if (formData == null) {
        return Results.BadRequest("Invalid form data.");
    }

    // Process formData here (e.g., validation, database operations)
    // Remember to make your operations asynchronous if they are IO-bound

    return Results.Ok("Form received successfully.");
});

app.Run();


namespace YourApplication.Models // Use a namespace relevant to your project
{

    // Define a class that matches your form data structure
    public class MyFormData
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        // Add other fields as per your form
    }
}