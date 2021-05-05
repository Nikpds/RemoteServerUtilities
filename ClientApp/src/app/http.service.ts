import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { LoaderService } from './loader.service';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IDataLoader, DataLoader } from './models/common';
import { NotifyService } from './notify.service';
const headers = new HttpHeaders()
  .append('Content-Type', 'application/json')
  .append('Access-Control-Allow-Origin', '*');
@Injectable()
export class HTTPService {
  private baseUrl = environment.api;
  public showMessage = true;
  constructor(
    private http: HttpClient,
    private loader: LoaderService,
    private notify: NotifyService
  ) {}

  get<T>(url: string, customerLoader: IDataLoader = new DataLoader()) {
    this._handleLoader(true, customerLoader);
    return this.http
      .get<T>(`${this.baseUrl}${url}`, { headers })
      .pipe(
        map((res) => {
          console.log(res);
          this._handleLoader(false, customerLoader);
          return this._handleResponse(res);
        }),
        catchError((err) => this.errorHandler(err, customerLoader))
      );
  }

  post<T>(
    url: string,
    body: any,
    customerLoader: IDataLoader = new DataLoader()
  ) {
    this._handleLoader(true, customerLoader);
    return this.http
      .post<T>(`${this.baseUrl}${url}`, body, { headers })
      .pipe(
        map((res) => {
          this._handleLoader(false, customerLoader);
          return this._handleResponse(res);
        }),
        catchError((err) => this.errorHandler(err, customerLoader))
      );
  }

  put<T>(
    url: string,
    body: any,
    customerLoader: IDataLoader = new DataLoader()
  ) {
    this._handleLoader(true, customerLoader);
    return this.http
      .put<T>(`${this.baseUrl}${url}`, body, { headers })
      .pipe(
        map((res) => {
          this._handleLoader(false, customerLoader);
          return res;
        }),
        catchError((err) => this.errorHandler(err, customerLoader))
      );
  }

  delete<T>(url: string, customerLoader: IDataLoader = new DataLoader()) {
    this._handleLoader(true, customerLoader);
    return this.http
      .delete<T>(`${this.baseUrl}${url}`, { headers })
      .pipe(
        map((res) => {
          this._handleLoader(false, customerLoader);
          return res;
        }),
        catchError((err) => this.errorHandler(err, customerLoader))
      );
  }

  private _handleResponse(result: any) {
    return result;
  }

  externalCall(url: string, type: string) {
    return this.http[type]<any>(`${url}`).pipe(
      map((res) => res),
      catchError((err) => this.errorHandler(err, new DataLoader(false, true)))
    );
  }

  private _handleLoader(loading: boolean, loaderObject: IDataLoader) {
    if (!loaderObject.skipLoader) {
      if (loaderObject.internalLoader) {
        loaderObject.loading = loading;
      } else if (loaderObject) {
        loading ? this.loader.show() : this.loader.hide();
      }
    }
  }
  makeFileRequest(url: string, files: File[], load = true) {
    if (load) {
      this.loader.show();
    }
    return new Observable((observer) => {
      const token = localStorage.getItem('master_token');
      const formData: FormData = new FormData();
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i], files[i].name);
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if (load) {
              this.loader.hide();
            }
            return observer.next(xhr.response);
          } else {
            if (load) {
              this.loader.hide();
            }
            return observer.error(xhr.response);
          }
        }
      };
      xhr.upload.onprogress = (event) => {};
      xhr.open('POST', `${this.baseUrl}${url}`, true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      xhr.send(formData);
    });
  }

  errorHandler(error: any, loaderObject: IDataLoader) {
    if (this.showMessage) {
      this.notify.danger(error.error);
    }
    this.showMessage = true;
    if (loaderObject.internalLoader) {
      loaderObject.loading = false;
    } else {
      this.loader.hide();
    }
    return error;
  }
}
