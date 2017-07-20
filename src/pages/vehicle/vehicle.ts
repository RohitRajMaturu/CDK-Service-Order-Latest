import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { commonAPIService } from '../../providers/commonAPI-services';
import { FormBuilder, Validators } from '@angular/forms'
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage implements OnInit {
  VIN: {}; status: any;
  public vehicleInfo: any;
  vehicleForm: any;
  public uVIN: any;
  loading: Loading;
  myForm: any;
  VINDetails: any;
  myManualForm: any;
  abc: any;
  showVINForm: boolean = false;
  showManualEntryform: boolean = false;
  scanResult: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private _vinDecoderService: commonAPIService, private alertCtrl: AlertController,
    public loadingCtrl: LoadingController, private builder: FormBuilder, private barcodeScanner: BarcodeScanner) {
    this.myForm = builder.group({
      'VIN': [''], 'vID': [''], 'Model': [''], 'Make': [''], 'Year': [''], 'Color': [''], 'Transmission': ['']
    })
    this.myManualForm = builder.group({
      'VIN': [''], 'vID': [''], 'Model': [''], 'Make': [''], 'Year': [''], 'Color': [''], 'Transmission': ['']
    })
  }


  ngOnInit() {

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

  public ScanBarCode() {

    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      alert(JSON.stringify(barcodeData));
      this.scanResult = JSON.stringify(barcodeData.text);

      alert(this.scanResult);

      this.getVehicledetails(this.scanResult);
    }, (err) => {
      // An error occurred
    });
  }




  public ShowVehcileDetails() {
    if (this.vehicleInfo) {
      return false;
    }
    return true;
  }


  public getVehicledetails(ScanVIN) {
    this._vinDecoderService.getVINDetails(ScanVIN).subscribe(
      result => {

        this.VINDetails = result;
        this.VINDetails = Array.from(this.VINDetails);
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('getData completed' + this.VINDetails);
      });
  }
  public AddVehcileDetails(vehicle) {

    console.log(vehicle);
    var postVehicleData = {
      UserId: 6,
      Make: vehicle[0].Make,
      Model: vehicle[0].Model,
      Color: vehicle[0].Color,
      Year: vehicle[0].Year,
      Transmission: vehicle[0].Transmission,
      VIN: vehicle[0].VIN
    }
    //this.showLoading()
    //console.log(postVehicleData);
    this._vinDecoderService.createVehicleDetails(postVehicleData);
    alert('success');
    this.navCtrl.setRoot(HomePage);
  }

  public showVINDecoder() {
    this.showVINForm = !this.showVINForm;
  }

  public showSelectvehManually() {
    this.showManualEntryform = !this.showManualEntryform
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
