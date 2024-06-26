import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  private sroreSub: Subscription;

  constructor(
    // private authService: AuthService,
    // private router: Router,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
    this.sroreSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.isLoading = false;
      }
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password }),
      );
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({ email: email, password: password }),
      );
      // authObs = this.authService.signup(email, password);
    }

    // authObs.subscribe(
    //   (resData) => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMessage) => {
    //     this.error = errorMessage;
    //     // this.showErrorAlert(errorMessage);
    //     this.isLoading = false;
    //   },
    // );

    form.reset();
  }
  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy(): void {
    if (this.sroreSub) {
      this.sroreSub.unsubscribe();
    }
  }

  // private showErrorAlert(message: string){
  //     const alertCmp = new AlertComponent();
  // }
}
