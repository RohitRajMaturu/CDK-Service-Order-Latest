import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class commonAPIService {
    // private _VINDecoderUrl="";
    private _VIN = "";
    private _vehInfo:any;
    public data: any;
    private _url: string = "https://jsonplaceholder.typicode.com/posts";
    constructor(private _http: Http) { };
    getVINDetails(_VIN) {
        return this._http.get('https://jsonplaceholder.typicode.com/posts/1').map(res => res.json());
    }

    createVehicleDetails(_vehInfo){
            //call insert vehicle api
            return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });

    }




}