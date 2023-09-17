import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable()
export class TokenInterceptors implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

       const token = localStorage.getItem('token');
       console.log(token);
       req=req.clone({
        setHeaders:{
            Authorization:`Bearer ${token}`
        }
       })
    return next.handle(req)
    
    }
}