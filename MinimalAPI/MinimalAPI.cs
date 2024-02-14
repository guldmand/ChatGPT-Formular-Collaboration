using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;

const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("http://127.0.0.1:5500")
                                 .WithHeaders("Content-Type", "x-api-key")
                                 .WithMethods("POST");
                      });
});

var app = builder.Build();

// Use CORS middleware
app.UseCors(MyAllowSpecificOrigins);

app.MapPost("/submit-form", async (HttpRequest req) => {
    // Check for the "x-api-key" header instead of "ThisIsJustATest"
    if (!req.Headers.ContainsKey("x-api-key") || req.Headers["x-api-key"] != "ThisIsJustATest") {
        return Results.BadRequest("API key is missing or incorrect.");
    }

    // Assuming you're sending JSON data from the client
    // Define a class that matches the expected structure of your form data
    var formData = await req.ReadFormAsync();

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
        public string? PostNumer { get; set; }
        public string? By { get; set; }
        public string? Land { get; set; }
        public string? Interesser { get; set; }
        public IFormFile? Files { get; set; }

        // Add other fields as per your form
    }
}