import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Authentication } from "src/app/models/authentication";
import { Observable, EMPTY, of } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  name = "";

  isAuthenticated = false;

  @Output()
  authenticatedChange = new EventEmitter(true);

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAuthentication();
    this.checkIfHasCode();
  }

  private checkAuthentication() {
    this.isAuthenticated = false;
    if (this.authService.hasToken()) {
      this.isAuthenticated = true;
    }
    this.authenticatedChange.emit(this.isAuthenticated);
  }

  private checkIfHasCode() {
    const regex = /code=(\w+)/g;
    const results = regex.exec(window.location.href);
    const code = results ? results[1] : null;
    if (!code) {
      return;
    }
    this.authService
      .fetchAccessToken(code, `${window.location.origin}/`)
      .subscribe(() => {
        this.checkAuthentication();
        this.router.navigateByUrl("/");
      });
  }

  login() {
    this.authService.authenticationApp(`${window.location.origin}/`);
  }

  logout() {}
}
