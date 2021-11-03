import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ILoginData} from "../interface";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})


export class AuthServices {

  constructor(private http: HttpClient) {
  }

  private setToken(response: any) {
    if (response) {
      const expDate = new Date(new Date().getTime() + response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }

  login(loginData: ILoginData): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0Kdl7J4ki2c-WLd-wkLRwTOF6bnA-hws`,
      {...loginData, returnSecureToken: true})
      .pipe(
        tap(this.setToken),
      )
  }
  getToken(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp') || '')
    if (new Date() > expDate) {
      this.logout()
      return ''
    }
    return localStorage.getItem('fb-token') || ''
  }
  logout() {
    this.setToken(null)
  }
  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

