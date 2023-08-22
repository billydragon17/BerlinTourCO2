const express = require("express");
const { json } = require("express/lib/response");
var router = express.Router();
var app = express();
var bodyParser = require("body-parser")


// parse application
const urlencodedParser = bodyParser.urlencoded({extended: true})

//Axios for API call 
var axios = require('axios');

//API Key for Places API 
const apiKeyPlaces = "f3d309ddf75e41f18b6ea758bd2ff62d"

//Yelp Fusion API client for Node.js
const yelp = require('yelp-fusion');

//Yelp API-Key 
const apiKeyYelp = "EQ2lBcd4ue7HA1ajLYuJ7dMzRrjn1vqHvxRAacEOuVcRsdtsiAUQl5mCl825sde0kwxuyBbWLX25rUhaCLnC7gnzz8wnwieGhPc-XdrPYx-PvRK9cbDPaTXGKyzxYXYx"


//render overview.ejs for the default page
router.get("/", function(req,res){
    res.render("pages/overview", {title : "Overview"});
});

//route to overview page
router.get("/overview", function(req,res){
    res.render("pages/overview", {title : "Overview"});
});

//route to events page with standart request 
router.get("/events", function(req,res){    

    // value for searchrequest with standart data
    const searchRequest = {    
      location: 'Germany',
      latitude: 52.52012996795611,
      longitude: 13.405114901599779,
      radius: 30000,
      limit: 40,
      start_date: 1640991600,
      end_date: 1893452400,
  
    };

    // APi call with value from searchrequest with standart data and already entered filter data
    const client = yelp.client(apiKeyYelp);   
    client.eventSearch(searchRequest).then(response => {      
    res.render("pages/events", {events : response.jsonBody.events, value : searchRequest, title : "Events"});
    }).catch(e => {
        console.log(e);
    });      
})


//route to the events page with filter data from post 
router.post("/events", urlencodedParser,(req , res) => {
    
   
    //Converting datatype date to Unix timestamp     
    const vStart = Math.floor(new Date(req.body.eventstart).valueOf()) / 1000
    const vEnd = Math.floor(new Date(req.body.eventend).valueOf()) / 1000
    console.log(new Date(req.body.eventend))

    // function to check if the Date is undefined or has an value and return to searchRequest
    function checkInputStart() {
      if (vStart == 'undefined' || isNaN(vStart)) {
        return start_date = 1640991600 
      } else {
        return start_date = vStart  
      }
    }
    //function to check if the Date is undefined or has an value and return to searchRequest
    function checkInputEnd() {
      if (vEnd == 'undefined' || isNaN(vEnd)) {
        return end_date = 1893452400
      } else {
        return end_date = vEnd   
      }
    } 
    // function to check if the checkbox is clicked or not
    function getOpen() {
      if (req.body.freeEvent) {
          return is_free = true          
      } else {
          return is_free = false
      }
    }

  // value for searchrequest with userinput
  const searchRequest = {    
    location: 'Germany',
    latitude: 52.52012996795611,
    longitude: 13.405114901599779,
    radius: 30000,
    limit: 40,
    start_date: checkInputStart(),
    end_date: checkInputEnd(), 
    is_free: getOpen(),

  };
   //APi call with searchRequest and render to page with API data and value data to display in filter
  const client = yelp.client(apiKeyYelp); 
  client.eventSearch(searchRequest).then(response => {      
  res.render("pages/events", {events : response.jsonBody.events, value : searchRequest, title : "Events"});
  }).catch(e => {
      console.log(e);
  }); 
})

//route to sightseeing page
router.get("/sightseeing", function(req,res){
    res.render("pages/sightseeing", { title : "Sightseeing"});
});

//route to impressum page
router.get("/impressum", function(req,res){
  res.render("pages/impressum");
});

//route to food page with restaurant data from API  
router.get("/food", function(req,res){

    // value for searchrequest with standart data and already entered filter data
    const searchRequest = {
        term:'Restaurants',
        location: 'Berlin',
        latitude: 52.52012996795611,
        longitude: 13.405114901599779, 
        radius: 30000,
        limit: 40,  
        open_now: false,       
      };

    
    // API call with standart searchRequest and 
    const client = yelp.client(apiKeyYelp);
    client.search(searchRequest).then(response => {  
      res.render("pages/food", {restaurants : response.jsonBody.businesses, value : searchRequest, title : "Food"}); 
      }).catch(e => {
        console.log(e);
      });      
})

//route to food page with restaurant data from API  
router.post("/food", urlencodedParser ,function(req,res){

      // constent of userinput from textfield
      const quicksearch = req.body.quicksearchinput

      // function to check if the checkbox is clicked or not
      function getOpen() {
        if (req.body.openRest) {
          console.log("true")
            return opennow = true          
        } else {
          console.log("false")
            return opennow = false
        }
      }
    // value for searchrequest with userinput
    const searchRequest = {
      term: quicksearch,
      location: 'Berlin',
      latitude: 52.52012996795611,
      longitude: 13.405114901599779, 
      radius: 30000,
      limit: 40,
      open_now: getOpen(),
    };

  //APi call with searchRequest and render to page with API data and value data to display in filter
  const client = yelp.client(apiKeyYelp);
  client.search(searchRequest).then(response => {      
    res.render("pages/food", {restaurants : response.jsonBody.businesses ,  value : searchRequest, title : "Food"}); 
    }).catch(e => {
      console.log(e);
    });      
})


//route to planner page with places data from API 
router.get("/planner", function(req,res){

  var config = {
    method: 'get',
    url: 'https://api.geoapify.com/v2/places?categories=building.tourism,tourism.attraction&filter=circle:13.3888599,52.5170365,30000&bias=proximity:13.3888599,52.5170365&limit=20&apiKey='+apiKeyPlaces,
    headers: { }
  };

  //Img for Planner view, no userinput data 
  const mapImg = 'https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:13.378687,52.516339&zoom=14&apiKey='+apiKeyPlaces

  // value for searchrequest with standart data and already entered filter data
  axios(config).then(function (response) {   
    res.render("pages/planner", {places : response.data.features, title : "Planner", PictureURL : mapImg});    
  })
  .catch(function (error) {
    console.log(error);
  });
})

module.exports= router