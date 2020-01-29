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
  private title = "Expatrio | User Manager";

  isAuthenticated = false;

  constructor() {}

  ngOnInit() {
    document.title = this.title;
  }

  authenticatedChange(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
  }
}
