# weather-API
Hosted by heroku: baseUrl = https://money-planned.herokuapp.com/  
API endpoints to your application:
1. POST - /updateWeatherData : This will update the latest weather data in the database.
2. POST - /registerUser : Pass a json in the body of post method with username and password as objects.  
          {  
           &nbsp;   "username": "testing",  
           &nbsp;   "password": "pasword123"  
          }
3. POST - /setUserPreferences: Update preference of user. Pass array of cities with username.  
          {  
           &nbsp;   "username": "testing",  
           &nbsp;   "preferences": ["mumbai", delhi]  
          }
4. GET - /userWeatherData: Will return stored weather data of the cities requested.  
         {  
         &nbsp;     "cities": ["agra", "shimla"]  
         }  
         
### register Table
<img src="https://raw.githubusercontent.com/bmbshlly/weather-API/main/register_table.png">    
<img src="https://raw.githubusercontent.com/bmbshlly/weather-API/main/register_schema.png">   

### current_weather Table
<img src="https://raw.githubusercontent.com/bmbshlly/weather-API/main/current_weather_table.png">  
<img src="https://raw.githubusercontent.com/bmbshlly/weather-API/main/current_weather_schema.png">  
