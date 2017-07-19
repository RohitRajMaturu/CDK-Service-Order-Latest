import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';



/*
  Generated class for the SoserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SoserviceProvider {
  public data:any;
  constructor(private _http: Http) {
    console.log('Hello SoserviceProvider Provider');
  }
load() {
 
  return this._http.get('http://172.31.110.225:81/api/Vehicle/GetUserVehicles/6').map(res => res);
  // if (this.data) {
  //   // already loaded data
  //   console.log('from service');
  //   return Promise.resolve(this.data);
  // }

  // // don't have the data yet
  // return new Promise(resolve => {
  //   // We're using Angular HTTP provider to request the data,
  //   // then on the response, it'll map the JSON data to a parsed JS object.
  //   // Next, we process the data and resolve the promise with the new data.
  //   this._http.get("https://jsonplaceholder.typicode.com/posts/1")
  //     .map(res => res.json());
  // });
}
  }

  // don't have the data yet
  // return new Promise(resolve => {
  //   // We're using Angular HTTP provider to request the data,
  //   // then on the response, it'll map the JSON data to a parsed JS object.
  //   // Next, we process the data and resolve the promise with the new data.
  //   this.http.get('../mockdata.json')
  //     .map(res => res.json())
  //     .subscribe(data => {
  //       // we've got back the raw data, now generate the core schedule data
  //       // and save the data for later reference
  //       this.data = data;
  //       console.log(data);
  //       resolve(this.data);
  //     });
  // });


