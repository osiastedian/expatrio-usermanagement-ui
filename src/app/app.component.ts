import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "./reducers/index";
import { Observable } from "rxjs";
import { AuthenticationSelectors } from "./selectors/authentication.selector";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private title = "Expatrio | User Manager";

  isAuthenticated: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private authSelector: AuthenticationSelectors
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.store.pipe(select(this.authSelector.isLoggedIn));
  }
}
