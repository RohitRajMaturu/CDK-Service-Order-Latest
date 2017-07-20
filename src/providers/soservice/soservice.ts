import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import { AuthService } from '../../providers/auth-service';





/*
  Generated class for the SoserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SoserviceProvider {
  public data: any;
  userId = '';
  userName = '';
  isDealer=false;

  constructor(private _http: Http,private auth: AuthService) {
    this.loadUserDetails();
    console.log('Hello SoserviceProvider Provider');
  }


loadUserDetails()
{
  let info=this.auth.getUserInfo();
   this.userId = info['userId'];
   this.userName = info['userName'];
   this.isDealer=info['isDealer'];
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
  loadsobasedonSo(isDealer) {

    if(!isDealer){
    return this._http.get('http://172.31.109.204:81/api/ServiceOrder/GetUserServiceOrderDetails/'+this.userId).map(res => res.json());
    }
  else{
    return this._http.get('http://172.31.109.204:81/api/ServiceOrder/GetDealerServiceOrderDetails/'+this.userName).map(res => res.json());
  }
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

  AcceptSO(sid,status,comments){
 var AcceptSO = {
     serviceId:sid,
      status:status,
      comments: comments
    }
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    this._http.post("http://172.31.109.204:81/api/ServiceOrder/UpdateServiceComments", AcceptSO).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);// Error getting the data
    });
  }

  RejectSO(sid,status,comments){
 var RejectSO = {
     serviceId:sid,
      status:status,
      comments: comments
    }
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    this._http.post("http://172.31.109.204:81/api/ServiceOrder/UpdateServiceComments", RejectSO).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);// Error getting the data
    });

  }

  inService(sid,status,comments)
  {
     var InserviceSO = {
     serviceId:sid,
      status:status,
     comments: comments
    }
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    this._http.post("http://172.31.109.204:81/api/ServiceOrder/UpdateServiceComments", InserviceSO).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);// Error getting the data
    });

  }
  serviceDone(sid,status,comments){
     var serviceDone = {
     serviceId:sid,
      status:status,
      comments:comments
    }
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    this._http.post("http://172.31.109.204:81/api/ServiceOrder/UpdateServiceComments", serviceDone).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);// Error getting the data
    });
  }

}

