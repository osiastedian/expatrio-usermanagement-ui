import { Injectable } from '@angular/core';
import { Observable, EMPTY, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AuthenticationActionTypes,
  Login,
  SetIsLoggedIn,
  FetchAccessToken,
  FetchCurrentUser,
  CheckAuthentication,
  SetCurrentUser,
  SetAuthentication,
  Logout
} from '../actions/authentication.actions';
import { AuthenticationService } from '../core/services/authentication.service';
import { tap, switchMap, map, switchMapTo } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../apis/user.service';

@Injectable()
export class AuthenticationEffects {
  @Effect() loginEffect$: Observable<Action> = this.actions$.pipe(
    ofType(AuthenticationActionTypes.Login),
    switchMap((action: Login) => {
      this.authenticationService.authenticationApp(action.payload.redirect_uri);
      return EMPTY;
    })
  );

  @Effect() logoutEffect$: Observable<Action> = this.actions$.pipe(
    ofType(AuthenticationActionTypes.Logout),
    switchMap(() => {
      return this.authenticationService
        .logout()
        .pipe(
          switchMapTo(
            of(
              new SetIsLoggedIn({ isLoggedIn: false }),
              new SetAuthentication({ authentication: null })
            )
          ),
          tap(() => {
            this.authenticationService.redirectToLogoutPage();
          })
        );
    })
  );

  @Effect() checkAuthEffect$: Observable<Action> = this.actions$.pipe(
    ofType(AuthenticationActionTypes.CheckAuthentication),
    switchMap(() => {
      const isLoggedIn = this.authenticationService.hasToken();
      if (!isLoggedIn) {
        return of(new SetIsLoggedIn({ isLoggedIn }));
      }
      return of(new SetIsLoggedIn({ isLoggedIn }), new FetchCurrentUser());
    })
  );

  @Effect() fetchCurrentUserEffect$: Observable<Action> = this.actions$.pipe(
    ofType(AuthenticationActionTypes.FetchCurrentUser),
    switchMap(() => {
      return this.userService
        .getUserInfo()
        .pipe(map(user => new SetCurrentUser({ user })));
    })
  );

  @Effect() fetchAccessTokenEffect$: Observable<Action> = this.actions$.pipe(
    ofType(AuthenticationActionTypes.FetchAccessToken),
    switchMap(() => {
      const code = this.checkIfHasCode();
      if (!code) {
        return EMPTY;
      }
      return this.authenticationService
        .fetchAccessToken(code, `${window.location.origin}/`)
        .pipe(
          switchMap(authentication => {
            this.router.navigateByUrl('/');
            return of(
              new SetAuthentication({ authentication }),
              new CheckAuthentication()
            );
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  private checkIfHasCode() {
    const regex = /code=(\w+)/g;
    const results = regex.exec(window.location.href);
    return results ? results[1] : null;
  }
}
