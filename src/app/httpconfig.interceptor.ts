import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = localStorage.getItem('token') || '{}';
    console.log("user",user)
    if (user  && user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user}`
        }
      });
    }
    return next.handle(request);
  }
}