import { Component, signal } from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  NavigationEnd
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('portfolio');

  constructor(private router: Router) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {

        gtag('config', 'AW-18320040291', {
          page_path: event.urlAfterRedirects
        });

      });

  }

  abrirWhatsApp() {
    window.open(environment.whatsapp, '_blank');
  }

}