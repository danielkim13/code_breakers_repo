// major city array
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

$(document).ready(function () {
  function searchMajorCity(event) {
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
    saveSearchedCity(cityName);
    $(".recent-btn").remove();
    displayRecents();
    //?if this is the method we want it. Brahm's function to call yelp API can go here.
  }

  // clicking the dropdown menu will call the searchMajorCity function tocompare the value in the array then push the lat & lng to parking fetch function.
  $(".dropdown-content").click(searchMajorCity);

  // function calling parking API through google places js library. this solution was required due to CORS issue.
  function callParkingApi(lat, lng) {
    let location = new google.maps.LatLng(lat, lng);

    let map = new google.maps.Map(document.querySelector(".card-content"), {
      center: location,
      zoom: 0,
      width: 0,
      height: 0,
    });

    let request = {
      location: location,
      radius: "500",
      types: ["parking"],
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 1; i <= 5; i++) {
        var placeName = results[i - 1].name;
        const placeAddress = results[i - 1].vicinity;
        console.log(results);

        $("#parking-" + i).append("<p><i class='fa-light fa-square-parking'>");
        $("#parking-" + i).attr("class", "m-4 p-1 has-background-info-light parking-info");
        $("#business-" + i).text(placeName);
        $("#address-" + i).text(placeAddress);
      }
    }
  }

  function saveSearchedCity(cityName) {
    var recentlyViewedCity = JSON.parse(localStorage.getItem("city"));

    if (recentlyViewedCity == null) {
      recentlyViewedCity = [];
      recentlyViewedCity.unshift(cityName);
      localStorage.setItem("city", JSON.stringify(recentlyViewedCity));
    }

    if (recentlyViewedCity.length > 4) {
      recentlyViewedCity.pop();
    }

    if (!recentlyViewedCity.includes(cityName)) {
      recentlyViewedCity.unshift(cityName);
      localStorage.setItem("city", JSON.stringify(recentlyViewedCity));
    }
  }

  function displayRecents() {
    var recentlyViewedCity = JSON.parse(localStorage.getItem("city"));

    if (recentlyViewedCity) {
      for (let i = 0; i < recentlyViewedCity.length; i++) {
        var recentBtn = $("<button>");
        recentBtn.attr("class", "button recent-btn column is-three-fifths m-2 has-background-info-light");
        recentBtn.attr("type", "button");
        recentBtn.attr("value", recentlyViewedCity[i]);
        recentBtn.text(recentlyViewedCity[i]);
        $("#recentBtn").append(recentBtn);
      }
    }
  }

  displayRecents();
});
