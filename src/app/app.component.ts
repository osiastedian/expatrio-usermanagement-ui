import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "./core/services/authentication.service";
import { tap, switchMap } from "rxjs/operators";
import { of, Observable, EMPTY } from "rxjs";
import { Authentication } from "./models/authentication";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "usermanager";
  authentication: Observable<Authentication>;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authenticate();
  }

  private authenticate() {
    const regex = /code=(\w+)/g;
    const results = regex.exec(window.location.href);
    const code = results ? results[1] : null;
    let authTokenObs: Observable<Authentication> = EMPTY;
    if (!this.authenticationService.hasToken()) {
      if (code) {
        authTokenObs = this.authenticationService.fetchAccessToken(
          code,
          `${window.location.origin}/`
        );
      } else {
        this.authenticationService.authenticationApp();
      }
    } else {
      authTokenObs = of(this.authenticationService.getTokenInStorage());
    }
    this.authentication = authTokenObs;
  }
}
