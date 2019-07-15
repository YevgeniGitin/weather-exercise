let map;
let infowindow;
let infoflag = 0;

function mapload() {
    map = new google.maps.Map(document.getElementById('map'), {//create new google map
        center: { lat: 32.798120, lng: 34.987247 },//set the look on israel
        zoom: 10
    });
    map.addListener('click', function(e) {//add event to map(click) and open info window
        openinfo(e.latLng);//send the x and y 
    });
}


async function openinfo(latLng) {
    let wether;
    if (infoflag === 1) {//close the old info window
        infowindow.close(map);
        infoflag = 0;
    }
    fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + latLng.lat() + "&lon=" + latLng.lng() + "&APPID=c894fa26f98d61a6892f65d827493bef&units=metric")//get thhe data
        .then((res) => {//turn the string to jeson object
            return res.json();
        })
        .then((res) => {//create the info window with data from the jeson
            infowindow = new google.maps.InfoWindow({
                content: ` Location: ${res.sys.country}  ${res.name}</br>  Sky: ${res.weather[0].description}</br>  Temperature:${res.main.temp}`,
                position: latLng,
                map: map
            });
            infowindow.open(map);
            infoflag = 1;
        })
        .catch((val) => {
            alert(val);
        })
}