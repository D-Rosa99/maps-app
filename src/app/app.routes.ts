import { Routes } from '@angular/router';
import { HousesPage } from '@pages/houses/houses.page';
import { MarkersPage } from '@pages/markers/markers.page';
import { MapPage } from '@pages/map/map.page';

export const routes: Routes = [
  {
    path: 'map',
    component: MapPage,
    title: 'Map',
  },
  {
    path: 'houses',
    component: HousesPage,
    title: 'Houses',
  },
  {
    path: 'markers',
    component: MarkersPage,
    title: 'Markers',
  },
  {
    path: '**',
    redirectTo: 'map',
  },
];
