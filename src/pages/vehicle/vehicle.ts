import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Loading,AlertController,LoadingController } from 'ionic-angular';
import { commonAPIService } from '../../providers/commonAPI-services';
import { FormBuilder, Validators } from '@angular/forms'
import { Observable } from 'rxjs/Observable';
import {HomePage} from '../home/home';


@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage implements OnInit {
  VIN: {};
  public vehicleInfo: any;
  vehicleForm: any;
  public uVIN: any;
  loading: Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _vinDecoderService: commonAPIService,private alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }


  ngOnInit() {
    //var abc =this._vinDecoderService.getVINDetails().subscribe(vehData => this.vehicleInfo = vehData);
    //onsole.log(this.vehicleInfo);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiclePage');
  }

  public Decode() {

    this._vinDecoderService.getVINDetails(this.VIN).subscribe(
      result => {
        console.log('result' + result);
        this.vehicleInfo = result;
        this.vehicleInfo = Array.of(this.vehicleInfo);
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('getData completed' + this.vehicleInfo);
      });
  }
  
  public isReadonly() { return true; }
  
  public ShowVehcileDetails() {
    if (this.vehicleInfo) {
      return false;
    }
    return true;
  }

public AddVehcileDetails(vehicle){
      this.showLoading()
    this._vinDecoderService.createVehicleDetails(this.vehicleInfo).subscribe(allowed => {
      if (allowed) {
        this.navCtrl.setRoot(HomePage);
      } else {
        //this.showError("Access Denied");
        Observable.throw("Signup Failed");
      }
    },
      error => {
        this.showError(error);
      });
}

showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

   showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


}
