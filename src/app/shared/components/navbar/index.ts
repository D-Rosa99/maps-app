import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { routes } from '../../../app.routes';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'navbar-app',
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './index.html',
})
export class Navbar {
  private router = inject(Router);

  appRoutes = routes
    .filter((route) => route.title)
    .map((route) => ({ title: route.title as string, path: route.path as string }));

  currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url.slice(1)),
    ),
  );
}
