//* DK portion. Parking API. using Google Places API
//! team needs to decide how we are going to pass the city parameter. Google Places API location can only be searched by geometry (lat/lon). If city param is going in then I need to fetch twice or perhaps three times to get the solution.
// for now I will just make an array of objects of cities
const majorCityArray = [
  {
    name: "Atlanta",
    lat: 33.757586,
    lng: -84.386857,
  },
  {
    name: "Baltimore",
    lat: 39.2911,
    lng: -76.612918,
  },
  {
    name: "Boston",
    lat: 42.352468,
    lng: -71.06428,
  },
  {
    name: "Chicago",
    lat: 41.888267,
    lng: -87.630671,
  },
  {
    name: "Dallas",
    lat: 32.780207,
    lng: -96.799557,
  },
  {
    name: "Los Angeles",
    lat: 34.041343,
    lng: -118.258614,
  },
  {
    name: "Miami",
    lat: 25.788578,
    lng: -80.13556,
  },
  {
    name: "Nashville",
    lat: 36.16256,
    lng: -86.776951,
  },
  {
    name: "New York City",
    lat: 40.754114,
    lng: -73.991459,
  },
  {
    name: "Philadelphia",
    lat: 39.951631,
    lng: -75.163932,
  },
  {
    name: "Phoenix",
    lat: 33.44965,
    lng: -112.069627,
  },
  {
    name: "Portland",
    lat: 45.515678,
    lng: -122.678067,
  },
  {
    name: "Seattle",
    lat: 47.604578,
    lng: -122.331016,
  },
  {
    name: "St. Louis",
    lat: 38.622053,
    lng: -90.19451,
  },
  {
    name: "Washington D.C.",
    lat: 38.88137,
    lng: -77.019347,
  },
];
// clicking the dropdown menu will compare the value in the array then push the lat & lng to parking fetch function.
$(document).ready(function () {
  $(".dropdown-content li").click(function (event) {
    const cityName = event.target.textContent;
    let latitude;
    let longitude;

    for (let i = 0; i < majorCityArray.length; i++) {
      if (cityName == majorCityArray[i].name) {
        latitude = majorCityArray[i].lat;
        longitude = majorCityArray[i].lng;
        break;
      }
    }
    callParkingApi(latitude, longitude);
    //?if this is the method we want it. Brahm's function to call yelp API can go here.
  });
});

// function to call the google places API.
function callParkingApi(lat, lng) {
  // had to download the chrome extension of CORS.
  const apiKey = "AIzaSyB-M5mkBsfudTXPd0jzZQG-aTX1J6TzZmM";
  const apiUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&types=parking&rankby=distance&key=" + apiKey;
  console.log(apiUrl);
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => parkingDisplay(data))
    .catch((error) => console.log(error + ":oh snap!")); //fix this later.
}

// function to display 5 nearby parking based on the city search.
function parkingDisplay(parking) {
  // displaying first five parking place info on the page.
  for (let i = 0; i < 5; i++) {
    const placeName = parking.results[i].name;
    const placeAddress = parking.results[i].vicinity;
    $("#parking-" + (i + 1)).append("<p><i class='fa-light fa-square-parking'>");
    $("#parking-" + (i + 1)).append("<p>Business Name: " + placeName);
    $("#parking-" + (i + 1)).append("<p>Address: " + placeAddress);
  }
}
