import { LatLng } from './LatLng.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalStateService } from '../shared/global-state.service';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {

  private geocoder: google.maps.Geocoder;
  private onGeocoderReady: Function;

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
  ) {}

  ngOnInit() {
    this.updateLocation(-26.195246, 28.034088, false, 9);

    this.searchControl = new FormControl();

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
    }
  }

  private updateLocation(lat: number, lng: number, updateSearchControl = true, zoom = 12) {
    this.location = {
      lat: lat,
      lng: lng
    }
    this.zoom = zoom;
    if(updateSearchControl) {
      this.updateSearchControl();
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
    this.router.navigate([this.searchControl.value], { relativeTo: this.route });
  }

}
