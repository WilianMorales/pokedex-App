import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinerSvc: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinerSvc.show();

    return next.handle(req).pipe(
      finalize(() => this.spinerSvc.hide())
    )
  }
}
