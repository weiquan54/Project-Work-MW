import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoginPage: boolean = false;
  title: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isLoginPage = this.checkIfLoginPage(this.activatedRoute);
      });
  }

  private checkIfLoginPage(route: ActivatedRoute): boolean {
    while (route.firstChild) {
      route = route.firstChild;
    }

    // Add or modify conditions based on your login route
    return route.snapshot.routeConfig?.path === 'login';
  }
}
