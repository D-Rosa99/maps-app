import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { environment } from '@env/environment';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map.page',
  imports: [],
  templateUrl: './map.page.html',
  styles: `
    div {
      width: 100vw;
      height: calc(100vh - 64px);
    }
  `,
})
export class MapPage implements AfterViewInit {
  divEl = viewChild<ElementRef>('mapEl');

  async ngAfterViewInit() {
    if (!this.divEl()?.nativeElement) return;
    const mapEl = this.divEl()!.nativeElement;

    setOptions({ key: environment.GMAP_KEY });

    const { Map } = await importLibrary('maps');
    const map = new Map(mapEl, {
      zoom: 8,
      minZoom: 3,
      maxZoom: 18,
      center: { lat: 40.7128, lng: -74.006 },
      restriction: {
        latLngBounds: {
          north: 85,
          south: -85,
          west: -180,
          east: 180,
        },
        strictBounds: true,
      },
    });
  }
}
