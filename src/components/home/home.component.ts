import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
export interface HousingLocation {
  id: number;
  name: string;
  city: string;
  state: string;
  photo: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent {

  housingLocationLists: HousingLocation[] = [
    {
      id: 1,
      name: 'Beautiful Apartments',
      city: 'New York',
      state: 'NY',
      photo: 'https://static.thenounproject.com/png/164716-200.png',
      availableUnits: 20,
      wifi: true,
      laundry: true
    },
    {
      id: 2,
      name: 'Modern Condos',
      city: 'Los Angeles',
      state: 'CA',
      photo: 'https://static.thenounproject.com/png/1143271-200.png',
      availableUnits: 15,
      wifi: false,
      laundry: false
    }
  ];
}
