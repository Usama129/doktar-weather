import {inject} from "@angular/core";
import {OWM_API_KEY, OWM_BASE_URL} from "../../app.config";
import {HttpInterceptorFn} from '@angular/common/http';

export const OwmApiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = inject(OWM_BASE_URL);
  const apiKey = inject(OWM_API_KEY);
  if (req.url.startsWith(baseUrl)) {
    const modified = req.clone({
      setParams: {
        appid: apiKey
      }
    });
    return next(modified);
  }
  return next(req);
}
