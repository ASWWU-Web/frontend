//This is here just for testing. It should eventually be put in a separate git repo
//or be bundled with a base ASWWU project.

import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { SERVER_URL, COOKIE_DOMAIN } from '../config';
import {User} from "./user.model";

@Injectable()
export class RequestService {
  authUser: User;
  private isLoggedIn: boolean;

  private setCurrentUser(user: any): void {
    if(user.hasOwnProperty("wwuid") && user.wwuid) {
      this.authUser = new User(user);
      this.isLoggedIn = true;
    } else {
      this.authUser = undefined;
      this.isLoggedIn = false;
    }
  }

  /*
  * Verifies the login status of the current user.
  * Gets current user and sets it to authUser
  * Also returns the user object to the callback function.
  */
  verify(cb?: any): void {
    if(document.cookie.search("token=") !== -1)  {
      this.verifyGet("verify", data => {
        //Log in the user
        let user = data.user || null;
        this.setCurrentUser(user);
        if(typeof cb == "function") cb(user);
      }, err => {
          //user in not logged in remove authUser.
          this.setCurrentUser({});
          if(typeof cb == "function") cb(null);
      });
    } else {
      this.authUser = undefined;
      this.isLoggedIn = false;
    }
  }


  constructor(private http: Http) { }


  private createRequest(uri: string, contentType: string = "application/json"): any {
    let url = uri;
    if (!url.startsWith("http")) {
      url = SERVER_URL;
      if (url.split('').pop() != '/' && uri[0] != '/') url += '/';
      url += uri;
    }

    let headers = new Headers({
      'Content-Type': contentType
      //'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({ headers: headers });

    return { url: url, options: options };
  }

  /*
  * Seperate function to make get requests in the Verify function.
  * Use of the normal get function would cause an infinite loop.
  * */
  private verifyGet(uri: string, afterRequest, catchError): void {
    let req = this.createRequest(uri);
    this.http.get(req.url,req.options)
        .map(res => res.json())
        .subscribe(
            data => afterRequest(data),
            err => (catchError ? catchError(err) : console.error(err))
        );
  }

  private objToSearchParams(obj): URLSearchParams{
    let params: URLSearchParams = new URLSearchParams();
    for (var key in obj) {
        if (obj.hasOwnProperty(key)){
          if(typeof obj[key] == "string"){
            params.append(key, obj[key].replace(/;/g, ","));
          }else {
            params.append(key, JSON.stringify(obj[key]).replace(/;/g, ","));
          }
        }
    }
    return params;
  }

  /*
  * Functions to make get and post requests
  * If a full url isn't specified, the default is aswwu.com/ and then the path given
  * */
  get(uri: string, afterRequest, catchError): void {
    let req = this.createRequest(uri);
    this.verify();
    this.http.get(req.url,req.options)
      .map(res => res.json())
      .subscribe(
        data => afterRequest(data),
        err => (catchError ? catchError(err) : console.error(err))
      );
  }
  post(uri: string, data: any, afterRequest, catchError): void {
    let body = JSON.stringify(data);
    this.verify();
    let req = this.createRequest(uri);
    this.http.post(req.url, body, req.options)
      .map(res => res.json())
      .subscribe(
        data => afterRequest(data),
        err => (catchError ? catchError(err) : console.error(err))
      );
  }

  postxwww(uri: string, data: any, afterRequest, catchError): void {
    //let body = JSON.stringify(data);
    let body = this.objToSearchParams(data);
    this.verify();
    let req = this.createRequest(uri, "application/x-www-form-urlencoded");
    this.http.post(req.url, body.toString(), req.options)
      .map(res => res.json())
      .subscribe(
        data => afterRequest(data),
        err => (catchError ? catchError(err) : console.error(err))
      );
  }

  // postfile(uri: string, data: any, afterRequest, catchError): void {
  //
  //   public uploader:FileUploader = new FileUploader({url: SERVER_URL + uri});
  //   let body = this.objToSearchParams(data);
  // }

  /*
  * Function to view whether or not the user is logged in.
  * Not sure if needed.
  * TODO: see if we still need this function.
  * */
  isLoggedOn(): boolean {
    //Returns true if authUser is defined, false otherwise
    return this.isLoggedIn;
  }

}
