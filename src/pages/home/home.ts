import { NavController } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation,GeolocationOptions,Geoposition} from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  cat: string = "mapview";
  options    : GeolocationOptions;
  currentPos : Geoposition;
  places     : Array<any>;

  constructor(public navCtrl: NavController , public geolocation: Geolocation) {

  }

  ionViewDidLoad(){
    setTimeout(this.loadMap(),1000);
  }


 loadMap(){

  var positionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 500
  };
    this.geolocation.getCurrentPosition().then((position) => {
 
      console.log(position);
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      this.addMap(latLng);
    }, (err) => {
      console.log(err);
    });
    
  }

addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  
    // let content = "<h4>Information!</h4>";         
    // this.addInfoWindow(marker, content);
}

// addInfoWindow(marker, content){
 
//   let infoWindow = new google.maps.InfoWindow({
//     content: content
//   });
 
//   google.maps.event.addListener(marker, 'click', () => {
//     infoWindow.open(this.map, marker);
//   });
// }

addMap(latLng){

    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.getRestaurants(latLng).then((results : Array<any>)=>{
        this.places = results;
        for(let i = 0 ;i < results.length ; i++)
        {
            this.createMarker(results[i]);
            console.log(results[i].icon + results[i].name + results[i].vicinity);
        }
    },(status)=>console.log(status));
    this.addMarker();
}

 getRestaurants(latLng)
  {
      var service = new google.maps.places.PlacesService(this.map);
      let request = {
          location : latLng,
          radius : 8047 ,
          types: ["restaurant"]
      };
      return new Promise((resolve,reject)=>{
          service.nearbySearch(request,function(results,status){
              if(status === google.maps.places.PlacesServiceStatus.OK)
              {
                  resolve(results);    
              }else
              {
                  reject(status);
              }

          }); 
      });
  }
createMarker(place)
{
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location
    });   
} 

}
