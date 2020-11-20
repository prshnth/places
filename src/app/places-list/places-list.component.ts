import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css'],
})
export class PlacesListComponent implements OnInit {
  @Input() placesList: any = [];
  constructor() {}

  ngOnInit(): void {}
}
