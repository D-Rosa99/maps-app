import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
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

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;@types/google.maps
      position: fixed;
      bottom: 25px;
      left: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }

  `,
})
export class MapPage implements AfterViewInit {
  divEl = viewChild<ElementRef>('mapEl');
  zoomMap = signal<number>(8)
  mapSignal = signal<google.maps.Map | null>(null);

  zoomEffect = effect(() => {
    if( !this.mapSignal()) return

    this.mapSignal()?.setZoom(this.zoomMap())
  })

  async ngAfterViewInit() {
    if (!this.divEl()?.nativeElement) return;
    const mapEl = this.divEl()!.nativeElement;
    setOptions({ key: environment.GMAP_KEY });

    const { Map } = await importLibrary('maps');
    const map = new Map(mapEl, {
      zoom: this.zoomMap(),
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

    this.mapEventListener(map)
  }

  mapEventListener(mapInstance: google.maps.Map){
    mapInstance.addListener('zoom_changed', () => {
      const newZoom = mapInstance.getZoom()!
      this.zoomMap.set(newZoom)
    })

    this.mapSignal.set(mapInstance)
  }
}
