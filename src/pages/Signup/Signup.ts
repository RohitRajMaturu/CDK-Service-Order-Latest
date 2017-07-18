import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'page-Signup',
  templateUrl: 'Signup.html',
})
export class Signup {
  createSuccess = true; myForm: any;
mandatefields: string[];
myData: any;

constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, private builder: FormBuilder) {
  this.myForm = builder.group({
    'uName': ['', Validators.required],
    'fName': [''], 'mName': [''],
    'lName': ['',Validators.required],
    'cPhone': ['', Validators.required],
    'gender':['m'],
    'DLNumber': ['', Validators.required],
    'Add1': [''], 'Add2': [''], 'City': [''], 'County': [''], 'zpCode': ['']

  })
  this.mandatefields= ['uName', 'lname', 'cPhone', 'DLNumber'];
}

  
public register(myForm) {
  console.log(myForm.value);
  
 
  //   this.auth.register(myForm).subscribe(success => {
  //     if (success) {
  //       this.createSuccess = true;
  //       this.showPopup("Success", "Account created.");
  //     } else {
  //       this.showPopup("Error", "Problem creating account.");
  //     }
  //   },
  //     error => {
  //       this.showPopup("Error", error);
  //     });
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



  public disableButton(myForm){  
    let isdisable: boolean = false;
  this.mandatefields.forEach(element => {
    if(myForm.controls[element] && !isdisable && !myForm.controls[element].valid)
      isdisable = true
  });
  return isdisable;
};



}