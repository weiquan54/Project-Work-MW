import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-lmx-weather',
  templateUrl: './lmx-weather.component.html',
  styleUrls: ['./lmx-weather.component.css']
})
export class LMXWeatherComponent implements OnInit {

  constructor() {
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1Ijoid2VpcXVhbjU0IiwiYSI6ImNsbTVvYXpzYzA4dmgzaG10enZhcmFpYmQifQ.HS7bQpm_Nmi8TyeMbzGY0w';
  }
  private map!: mapboxgl.Map | undefined;
  private marker!: mapboxgl.Marker | undefined;
  @ViewChild('map')  mapElement!: ElementRef;

  @ViewChild('locationInput') locationInput!: ElementRef<HTMLInputElement>;
  @ViewChild('latitudeInput') latitudeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('longitudeInput') longitudeInput!: ElementRef<HTMLInputElement>;
  loading: boolean = true;

  @ViewChild('cityElement') cityElement!: ElementRef;
  @ViewChild('tempElement') tempElement!: ElementRef;
  @ViewChild('iconElement') iconElement!: ElementRef;
  @ViewChild('descriptionElement') descriptionElement!: ElementRef;
  @ViewChild('humidityElement') humidityElement!: ElementRef;
  @ViewChild('windElement') windElement!: ElementRef;
  @ViewChild('latitudeElement') latitudeElement!: ElementRef;
  @ViewChild('longitudeElement') longitudeElement!: ElementRef;


  apiKey: string = "7f44b31f0a66b96a87847d17e774cfc0";

  fetchWeatherByQuery(query: string) {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${this.apiKey}`;

    fetch(endpoint).then(response => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then(data => this.displayWeather(data));
      // console.log(query)
      // console.log(endpoint)
  }

  fetchWeatherByCoordinates(latitude: string, longitude: string) {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.apiKey}`;

    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then(data => this.displayWeather(data));
  }

  displayWeather(data: any): void {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { lat, lon } = data.coord;
    // Use property binding instead of direct DOM manipulation
    this.cityElement.nativeElement.innerText = "Weather in " + name;
    this.iconElement.nativeElement.src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    this.descriptionElement.nativeElement.innerText = description;
    this.tempElement.nativeElement.innerText = temp + "°C";
    this.humidityElement.nativeElement.innerText =
      "Humidity: " + humidity + "%";
    this.windElement.nativeElement.innerText =
      "Wind speed: " + speed + " km/h";
    this.latitudeElement.nativeElement.innerText = "Latitude:" + lat;
    this.longitudeElement.nativeElement.innerText = "Longitude:" + lon;
    this.loading = false;

    // Update map and marker
    this.map!.setCenter([lon, lat]);
    this.marker!.setLngLat([lon, lat]);

    // Clear input values
    this.locationInput.nativeElement.value = "";
    this.latitudeInput.nativeElement.value = "";
    this.longitudeInput.nativeElement.value = "";
  }


  search(): void {
    const location = this.locationInput.nativeElement.value;
    const latitude = this.latitudeInput.nativeElement.value;
    const longitude = this.longitudeInput.nativeElement.value;

    if (location) {
      this.fetchWeatherByQuery(location);
    } else if (latitude && longitude) {
      this.fetchWeatherByCoordinates(latitude, longitude);
    } else {
      alert('Please enter a location or coordinates.');
    }
  }
  ngOnInit() {

   // Initialize the map
    this.map = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [101.687164, 3.047149],
      zoom: 9
    });

    this.marker = new mapboxgl.Marker().setLngLat([101.687164, 3.047149]).addTo(this.map);
    this.fetchWeatherByCoordinates("3.047149","101.687164");
  }

}
