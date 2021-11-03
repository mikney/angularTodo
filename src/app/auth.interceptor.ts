import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthServices} from "./services/auth.services";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{


  constructor(
    private authServices: AuthServices,
    private router: Router
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authServices.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.authServices.getToken()
        }
      })
    }
    return next.handle(req)
      .pipe(
      catchError((err => {
        console.log('Interceptor error')
        if (err.status === 401) {
          this.authServices.logout()
          this.router.navigate(['/login'])
        }
        return throwError(err)
      }))

      )
  }
}
