import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class commonAPIService {
    headers: Headers;
    options: RequestOptions;

    private _VIN = "";
    private _vehInfo: any;
    public data: any;
    public userId: any;
    public vehicleId: any;

    
    constructor(private _http: Http) { };
    getVINDetails(_VIN) {
        return this._http.get('http://172.31.109.204:81/api/Vehicle/VinDecode/' + _VIN).map(res => res.json());
    }

    createVehicleDetails(_vehInfo) {
        //call insert vehicle api
        
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
        let options = new RequestOptions({ headers: headers });

        this._http.post("http://172.31.109.204:81/api/Vehicle/AddVehicle", _vehInfo).subscribe(data => {
            data.json();
            //console.log(data.json());

        }, error => {
            console.log(error);// Error getting the data
        });
    }

    getAllVehiclesforCustomer(userId) {
        return this._http.get('http://172.31.109.204:81/api/Vehicle/GetUserVehicles/' + userId).map(res => res.json());
    }

    deleteSelectedVehicle(val: string) {
        return this._http
            .get("http://172.31.109.204:81/api/Vehicle/DeleteVehicle/" + val, this.options)
            .map(res => res.json())
        //.catch(this.handleError);
    }

    createCustomerByDealer(_vehInfo) {
        //call insert vehicle api
        return Observable.create(observer => {
            observer.next(true);
            observer.complete();
        });

    }

}