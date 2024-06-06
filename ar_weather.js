let coordinates = {}
$(document).ready(function(){
    get_coordinates()
    get_weather()
})

function get_coordinates(){
    let params = new URLSearchParams(window.location.search)
    if(params.has("source") && params.has("destination")){
        let source = params.get("source")
        let destination = params.get("destinantion")
        coordinates.source_lat = source.split(";")[0]
        coordinates.source_lon = source.split(";")[1]
        coordinates.destination_lat = destination.split(";")[0]
        coordinates.destination_lon = destination.split(";")[1]
    }
    else{
        alert("coordinates not found")
        window.history.back();
    }
}

function get_weather(){
    $.ajax({
        url:`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates.source_lon}%2C${coordinates.source_lat}%3B${coordinates.destination_lon}%2C${coordinates.destination_lat}?alternatives=true&geometries=polyline&steps=true&access_token=pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA`,
        type:get,
        succes:function(responce){
            let name = responce.name
            let weather = responce.weather[0].main
            $("#scene_container").append(
                `
                <a-entity gps-entity-place="latitude: ${steps[i].maneuver.location[1]}; longitude: ${steps[i].maneuver.location[0]};">
                    <a-entity>
                        <a-text height="50" value="Weather forcast is ${weather} at ${name}></a-text>
                    </a-entity>
                </a-entity>
                `
            )
        }
    })
}