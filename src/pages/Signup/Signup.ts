import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage,Loading,LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { FormBuilder, Validators } from '@angular/forms'
import { commonAPIService } from '../../providers/commonAPI-services';
import { LoginPage } from '../login/login';



@Component({
  selector: 'page-Signup',
  templateUrl: 'Signup.html',
})
export class Signup {
  createSuccess = true; myForm: any;
  mandatefields: string[];
  myData: any;
loading: Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, private builder: FormBuilder,
              private _createCustomerService:commonAPIService,public loadingCtrl: LoadingController) {
    this.myForm = builder.group({
      'uName': ['', Validators.required],
      'uEmail':['',Validators.required],
      'fName': [''], 'mName': [''],
      'lName': ['', Validators.required],
      'cPhone': ['', Validators.required],
      'gender': ['m'],
      'DLNumber': ['', Validators.required],
      'Add1': [''], 'Add2': [''], 'City': [''], 'County': [''], 'zpCode': ['']

    })
    this.mandatefields = ['uName','uEmail','lname', 'cPhone', 'DLNumber'];
  }


  public register(myForm) {
    var postCustomerData = {
      UserName: myForm.value.uName,
      Password: 123456,
      FirstName: myForm.value.fName,
      LastName: myForm.value.lName,
      EmailAddress: myForm.value.uEmail,
      Gender: myForm.value.gender,
      CellPhone: myForm.value.cPhone,
      DLNumber: myForm.value.DLNumber,
      AddressLine1: myForm.value.Add1,
      AddressLine2: myForm.value.Add2,
      zipCode: myForm.value.zpCode,
      City: myForm.value.City,
      State: myForm.value.County
    }

    this._createCustomerService.createCustomerInfo(postCustomerData).subscribe(allowed => {
      if (allowed.success) {
          //alert(allowed.success);
          this.showPopup('Successful', 'User Created successfully');
        //this.navCtrl.setRoot(LoginPage);
      } else {
        alert(allowed.message);
      }
    },
      error => {
        this.showError(error);
      });

    //console.log(myForm.value);
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
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }


showError(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }




  public disableButton(myForm) {
    let isdisable: boolean = false;
    this.mandatefields.forEach(element => {
      if (myForm.controls[element] && !isdisable && !myForm.controls[element].valid)
        isdisable = true
    });
    return isdisable;
  };



}