import { Component } from '@angular/core';
import { NavController, NavParams,Loading,AlertController,LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { commonAPIService } from '../../providers/commonAPI-services';
import { Observable } from 'rxjs/Observable';
import{HomePage} from '../../pages/home/home';

/**
 * Generated class for the AddNewCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-new-customer',
  templateUrl: 'add-new-customer.html',
})
export class AddNewCustomerPage {
  myForm: any;
  Make: any;
  enteredVIN: any;
  VINDetails: any;
  loading: Loading;
  isDecodeClicked:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private builder: FormBuilder, private _vinDecoderService: commonAPIService,private alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    this.myForm = builder.group({
      'uName': ['', Validators.required],
      'fName': [''], 'mName': [''],
      'lName': ['', Validators.required],
      'cPhone': ['', Validators.required],
      'gender': ['m'],
      'DLNumber': ['', Validators.required],
      'Add1': [''], 'Add2': [''], 'City': [''], 'County': [''], 'zpCode': [''],
      'VIN': [''], 'vID': [''], 'Model': [''], 'Make': [''], 'Year': [''], 'Color': [''], 'Transmission': ['']
    })
  }


  public getVehicledetails() {
    this.isDecodeClicked=false;
    this._vinDecoderService.getVINDetails(this.myForm.value.VIN).subscribe(
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

  public registerCustomer(myForm) {

    this.showLoading()
    this._vinDecoderService.createCustomerByDealer(this.myForm.value).subscribe(allowed => {
      if (allowed) {
        this.navCtrl.setRoot(HomePage);
      } else {
        //this.showError("Access Denied");
        Observable.throw("Could not create customer");
      }
    },
      error => {
        this.showError(error);
      });

    //console.log(myForm.value);

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
