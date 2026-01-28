$response = Invoke-RestMethod -Uri "http://localhost:8080/api/courts" -Method Get
Write-Output $response
