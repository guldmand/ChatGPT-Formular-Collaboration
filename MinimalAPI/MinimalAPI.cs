var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

//app.MapGet("/", () => "Hello World!");
app.MapPost("/submit-form", async (HttpRequest req) => {
    if (!req.Headers.ContainsKey("ThisIsJustATest")) {
        return Results.BadRequest("Header key 'ThisIsJustATest' mangler.");
    }
    // Her vil du håndtere din formularlogik, f.eks. læse JSON data
    return Results.Ok("Formular modtaget");
});

app.Run();