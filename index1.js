let map;
let infowindow;
let infoflag = 0;

function mapload() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 32.798120, lng: 34.987247 },
        zoom: 10
    });
    map.addListener('click', function(e) {
        openinfo(e.latLng, map);
    });
}


async function openinfo(latLng, map) {
    let wether;
    if (infoflag === 1) {
        infowindow.close(map);
        infoflag = 0;
    }
    console.log(latLng.lat());
    console.log(latLng.lng());
    fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + latLng.lat() + "&lon=" + latLng.lng() + "&APPID=c894fa26f98d61a6892f65d827493bef&units=metric")
        .then((res) => {
            return res.json();
        })
        .then((res) => {
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