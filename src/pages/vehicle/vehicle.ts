import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { commonAPIService } from '../../providers/commonAPI-services';
import { FormBuilder, Validators } from '@angular/forms'
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service';
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
  createSuccess = true;
  userId = '';
  userName = '';
  isDealer:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _vinDecoderService: commonAPIService, private alertCtrl: AlertController,
    public loadingCtrl: LoadingController, private builder: FormBuilder, private barcodeScanner: BarcodeScanner,public auth: AuthService) {
    this.myForm = builder.group({
      'VIN': [''], 'vID': [''], 'Model': [''], 'Make': [''], 'Year': [''], 'Color': [''], 'Transmission': ['']
    })
    this.myManualForm = builder.group({
      'VIN': [''], 'vID': [''], 'Model': [''], 'Make': [''], 'Year': [''], 'Color': [''], 'Transmission': ['']
    })
    this.assignValues();
  }


  ngOnInit() {

  }

 assignValues()
  {
   let info = this.auth.getUserInfo();
   this.userId = info['userId'];
   this.userName = info['userName'];
   this.isDealer=info['isDealer'];
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
      this.scanResult = JSON.stringify(barcodeData.text);
       this.myForm.controls.VIN=this.scanResult
      this.getVehicledetails('3500610051128');
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
        if(result.lenght<0){
          alert('No data fetched');
        }
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('getData completed' + this.VINDetails);
      });
  }
  public AddVehcileDetails(myManualForm) {

    console.log(myManualForm);
    var postVehicleData = {
      UserId: this.userId,
      Make: myManualForm.value.Make,
      Model: myManualForm.value.Model,
      Color: myManualForm.value.Color,
      Year: myManualForm.value.Year,
      Transmission: myManualForm.value.Transmission,
      VIN: myManualForm.value.VIN
    }

    this._vinDecoderService.createVehicleDetails(postVehicleData).subscribe(allowed => {

      if (allowed.success) {

        this.showPopup('Success', 'Vehicle added successfully');

      } else {
        //Observable.throw("Could not create Vehicle");
        this.showError('Failed');
      }
    },
      error => {
        this.showError(error);
      }
    );
  }

  public showVINDecoder() {
    this.showVINForm = !this.showVINForm;
  }

  public showVINwhenEntered(myForm) {
    this.getVehicledetails(myForm.value.VIN);
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


  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.setRoot(HomePage);
            }
          }
        }
      ]
    });
    alert.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Failed to add vehicle details',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


}
