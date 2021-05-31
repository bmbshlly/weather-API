# weather-API
baseUrl = https://money-planned.herokuapp.com/  
API endpoints to your application-
1. POST - {baseUrl}/updateWeatherData : This will update the latest
weather data in the database.
2. POST - {baseUrl}/registerUser : Pass a json in the body of post method with username and password as objects.
          {
            "username": "testing",
            "password": "pasword123"
          }
3. POST - {baseUrl}/setUserPreferences: Update preference of user. Pass array of cities with username.
          {
            "username": "testing",
            "preferences": ["mumbai", delhi]
          }
4. GET - {baseUrl}/userWeatherData: Will return stored weather data of the cities requested.
         {
            "cities": ["agra", "shimla"]
         }
