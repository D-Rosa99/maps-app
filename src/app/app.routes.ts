import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { HousesPage } from './pages/houses/houses.page';
import { MarkersPage } from './pages/markers/markers.page';

export const routes: Routes = [
  {
    path: 'map',
    component: HomePage,
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
