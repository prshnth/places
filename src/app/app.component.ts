import { Component } from '@angular/core';
import { PlacesSearchService } from './places-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  placesList: any[] = [];
  totalResults = 0;
  errorFetchingInitialLocation = false;
  isLoading = false;
  currentLocation = '';
  currentCoords = {};

  constructor(private placesService: PlacesSearchService) {
    this.isLoading = true;
    window.navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.currentCoords = coords;
        this.placesService.search('', coords).subscribe((data: any) => {
          this.isLoading = false;
          this.totalResults = data.response.totalResults;
          this.placesList = data.response.groups[0].items;
        });
      },
      () => {
        this.errorFetchingInitialLocation = true;
      }
    );
  }
  onLocationSearch(location: any, pageNumber: any) {
    const offset = pageNumber ? (pageNumber - 1) * 10 : '0';
    this.isLoading = true;
    this.currentLocation = this.currentLocation || location;
    this.placesService
      .search(this.currentLocation, this.currentCoords, offset.toString())
      .subscribe((data: any) => {
        this.isLoading = false;
        this.totalResults = data.response.totalResults;
        this.placesList = data.response.groups[0].items;
      });
  }
}
