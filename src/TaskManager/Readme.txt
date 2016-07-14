
About application
----------------------
Task manager app built with ASP.NET Web API + AngularJS.

Any user will be able to see the list of available tasks.

In order to Add or edit tasks login with below credentials :
            username : username@abc.com
            password : Password@123
In order to register new user  , enter new username and password and click 'Register' button.


To run the application
-----------------------------------
1. Clone the repository to you local machine.
2. Open the solution file in visual studio.
3. Build to restore the required nuget packages.
4. DO CTRL + F5 to Run the application.


Architecture 
---------------------------
Front end : AngularJS
Back end : Asp.net Web API
Data Store : Json file and .mdf (SQL file)
Layers : WebClient (Front end) => WebAPI ( REst API Service end point to GET , PUT and POST) DAL (Data Access Layer consisting of Models and Repositories) 


