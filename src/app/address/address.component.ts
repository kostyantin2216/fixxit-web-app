import { LatLng } from './LatLng.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  private static DEFAULT_LAT = -26.195246;
  private static DEFAULT_LNG = 28.034088;

  private geocoder: google.maps.Geocoder;
  private onGeocoderReady: Function;

  public submitted = false;
  public location: LatLng;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {    
    this.updateLocation(-26.195246, 28.034088, false, 9);

    this.searchControl = new FormControl(null, Validators.required);

    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      if(this.onGeocoderReady) {
        this.onGeocoderReady();
        this.onGeocoderReady = null;
      }
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.updateLocation(place.geometry.location.lat(), place.geometry.location.lng(), false);
          this.searchControl.setValue(place.formatted_address);
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.updateLocation(position.coords.latitude, position.coords.longitude);
      });
    } else {
      this.updateSearchControl();
      console.log('missing geolocation');
    }
  }

  private updateLocation(lat: number, lng: number, updateSearchControl = true, zoom = 13) {
    if(lat && lng) {
      this.location = {
        lat: lat,
        lng: lng
      }
      this.zoom = zoom;
      if(updateSearchControl) {
        this.updateSearchControl();
      }
    }
  }

  private updateSearchControl() {
    if(this.geocoder) {
      this.geocoder.geocode({ 'location': this.location }, (results, status) => {
        if(status.toString() === 'OK' && results && results.length > 0) {
          this.searchControl.setValue(results[0].formatted_address);
        }
      });
    } else {
      this.onGeocoderReady = this.updateSearchControl;
    }
  }

  onMapClick(event) {
    this.updateLocation(event.coords.lat, event.coords.lng);
  }

  onSubmit() {
    if(this.searchControl.valid) {
      this.router.navigate([this.searchControl.value], { relativeTo: this.route });
    }
    this.submitted = true;
  }

}
