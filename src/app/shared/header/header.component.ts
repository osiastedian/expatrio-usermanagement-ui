import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Authentication } from "src/app/models/authentication";
import { Observable, EMPTY, of } from "rxjs";
import { Router } from "@angular/router";
import { UserService } from "src/app/apis/user.service";
import { pluck, catchError, map } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import {
  Login,
  FetchAccessToken,
  CheckAuthentication,
  Logout
} from "src/app/actions/authentication.actions";
import { AuthenticationSelectors } from "src/app/selectors/authentication.selector";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  name = "";

  isAuthenticated: Observable<boolean>;

  currentUserFirstName: Observable<string>;

  @Output()
  authenticatedChange = new EventEmitter(true);

  constructor(
    private authService: AuthenticationService,
    private authSelectors: AuthenticationSelectors,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.currentUserFirstName = this.store.pipe(
      select(this.authSelectors.currentUser),
      map(user => (user ? user.firstName : ""))
    );
    this.isAuthenticated = this.store.pipe(
      select(this.authSelectors.isLoggedIn)
    );
    this.store.dispatch(new CheckAuthentication());
    this.store.dispatch(new FetchAccessToken());
  }

  login() {
    this.store.dispatch(
      new Login({ redirect_uri: `${window.location.origin}/` })
    );
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
