
## Run
dotnet run


## Test the API:

$headers = @{
    "Content-Type" = "application/json"
    "ThisIsJustATest" = "true"
}

$body = @{
    Name = "John Doe"
    Email = "john.doe@example.com"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5046/submit-form" -Method POST -Headers $headers -Body $body
$response.Content
