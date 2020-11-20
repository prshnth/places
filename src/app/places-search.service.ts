import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { unset } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class PlacesSearchService {
  constructor(private http: HttpClient) {}
  search(location: string, coords: any = {}, offset: string = '0') {
    let params: any = {
      client_id: process.env.FOURSQUARE_CLIENT_ID,
      client_secret: process.env.FOURSQUARE_CLIENT_SECRET,
      v: '20211119',
      limit: '10',
      offset,
    };

    if (!!location) {
      params.near = location;
      coords = {};
      unset(params, 'll');
    }

    if (coords.latitude && coords.longitude) {
      params.ll = `${coords.latitude},${coords.longitude}`;
    }

    return this.http.get('https://api.foursquare.com/v2/venues/explore', {
      params,
    });
  }
}
