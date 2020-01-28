import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { UrlSegment } from "@angular/router";
import { Authentication } from "src/app/models/authentication";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private tokenStoreKey = "access_token";
  private tokenStoreExpiration = "access_token_expiration";
  private authServer = "http://localhost:8080/";
  private clientId = "auth-server";
  private clientSecret = "auth-server-secret";
  constructor(private http: HttpClient) {}

  authenticationApp() {
    const grant_type = "authorization_code";
    const response_type = "code";
    const clientId = this.clientId;
    const redirect_uri = window.location.href;
    const authUrl = `${this.authServer}oauth/authorize?grant_type=${grant_type}&response_type=${response_type}&client_id=${clientId}&redirect_uri=${redirect_uri}`;
    window.location.href = authUrl;
  }

  fetchAccessToken(
    code: string,
    redirect_uri: string
  ): Observable<Authentication> {
    const tokenUrl = `${this.authServer}oauth/token`;
    const params = new HttpParams()
      .set("grant_type", "authorization_code")
      .set("code", code)
      .set("redirect_uri", redirect_uri)
      .set("client_id", this.clientId)
      .set("client_secret", this.clientSecret);
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', `${window.location.origin}/`);
    return this.http
      .post<Authentication>(tokenUrl, null, { params, headers })
      .pipe(
        tap(auth => {
          localStorage.setItem(this.tokenStoreKey, JSON.stringify(auth));
          const today = new Date();
          today.setTime(today.getSeconds() + auth.expires_in);
          localStorage.setItem(this.tokenStoreExpiration, `${today.getTime()}`);
        })
      );
  }

  getTokenInStorage(): Authentication {
    return JSON.parse(
      localStorage.getItem(this.tokenStoreKey)
    ) as Authentication;
  }

  hasToken(): boolean {
    const token = localStorage.getItem(this.tokenStoreKey);
    if (!token) {
      return false;
    }
    const today = new Date();
    const expirationDate = new Date(
      localStorage.getItem(this.tokenStoreExpiration)
    );
    return expirationDate.getTime() > today.getTime();
  }
}