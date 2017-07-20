import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
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
  public data: any;
  constructor(private _http: Http) {
    console.log('Hello SoserviceProvider Provider');
  }
  load() {
    console.log('load fired');
    return this._http.get('http://172.31.109.204:81/api/Location/GetAllLocations').map(res => res.json());
  }

  loadDealersbasedonLocations(locationId) {
    return this._http.get('http://172.31.109.204:81/api/Dealer/GetDealersByLocation/' + locationId).map(res => res.json());
  }

  loadUserVehicles(userId) {
    return this._http.get('http://172.31.109.204:81/api/Vehicle/GetUserVehicles/' + userId).map(res => res.json());
  }

  loadBasicServicesProvided() {
    return this._http.get('http://172.31.109.204:81/api/ServiceOrder/GetBasicServicesProvided').map(res => res.json());
  }
  postsoDetails(postsoDetails) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    let options = new RequestOptions({ headers: headers });

    this._http.post("http://172.31.109.204:81/api/ServiceOrder/CreateServiceOrder", postsoDetails).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);// Error getting the data
    });
  }
  loadsobasedonSo() {
    return this._http.get('http://172.31.109.204:81/api/ServiceOrder/GetUserServiceOrderDetails/6').map(res => res.json());
  }
  loadsoInDetail(soId) {
    return this._http.get('http://172.31.109.204:81/api/ServiceOrder/GetServiceOrderDetails/' + soId).map(res => res.json());
  }

  updateComments(sid,comments) {
    var commentsObj = {
      serviceId:sid,
      comments: comments
    }
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    this._http.post("http://172.31.109.204:81/api/ServiceOrder/UpdateServiceComments", commentsObj).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);// Error getting the data
    });
  }
}

