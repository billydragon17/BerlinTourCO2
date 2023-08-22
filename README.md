# BerlinCO2

This Project was created for the final project in CO2 Web Development.
The Task was to create a Web Application. We choosed to create a Application for tourist in Berlin.
The Main Function is to find Events and Restaurants. In the Future we want to provide a Route planner service. 
Here User can pick Destinations and then automatically the perfect rout with directions shoudl be displayed. 

###### How to Start ######

To start the project easly just type npm start in the terminal 
This should create a local server on port 3000.
For the best experience use a Display with 1920x1080 resolution

###### Project Pages ######

Start Page is the overview and the User has multipy way to navigate through the app, The Header, Overview Page and the Footer.
Events Page display all Events in Berlin current Time, but the User can Filter the results.
Sightseeing: The User can see our Top 10 Sight in Berlin with a small discription.
If the User wants to to search for Restaurants, this page is the best for it. Here the User can search for any term like "Starbucks or general Asian food". 
All the Userinput in Events and Food is saved an displayed, for the best UX.

The Last Page "Planner" has only the Front-End, but no working Back-End. Here ass i already said the User can pick Destinations and then automatically the perfect route with directions should be displayed. 

###### Dependencies ###### 

(Install this manually, if the project wont start / error module ... was not found)

    "axios": "^0.25.0",
    "body-parser": "^1.19.1",
    "ejs": "^3.1.6",
    "express": "^4.17.2",
    "path": "^0.12.7",
    "serve-favicon": "^2.5.0",
    "yelp-fusion": "^3.0.0"

###### If you want to fork this project read more ######

Editing the content pages (overview, events, etc...)

- Add a ejs file in the folder /components/pages
- Add a css file in the folder public/css 
- Add on the .ejs file before include the _footer.ejs this code 
<link href="/css/filename.css" rel="stylesheet">
- Have fun editing you class in the css file 
- Can be seen on the food.ejs and foodcss.css files 

Editing the header or fooder

-Can easly be edited, stored in the /components/parrtials folder

######
