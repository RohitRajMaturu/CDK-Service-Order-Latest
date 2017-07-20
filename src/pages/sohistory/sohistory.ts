import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SoserviceProvider } from '../../providers/soservice/soservice';
import {SodetailviewPage} from '../../pages/sodetailview/sodetailview';
import { AuthService } from '../../providers/auth-service';


/**
 * Generated class for the SohistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-sohistory',
  templateUrl: 'sohistory.html',
})
export class SohistoryPage {
 public userso:any;
  username = '';
  email = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,public _SoserviceProvider: SoserviceProvider,private auth: AuthService) {
     let info = this.auth.getUserInfo();
    this.username = info['userId'];
    this.email = info['userName']; 
 this.userso=this.loaduserso();
  }

  loaduserso(){
    this._SoserviceProvider.loadsobasedonSo().subscribe(
      result => {
        this.userso = result;
        console.log('result' + result);
        this.userso = Array.from(this.userso);        
        console.log(this.userso);
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('getData completed');
      }
    );
    console.log('ionViewDidLoad LoginPage');
  }

  ViewselectedVehicle(soId)
  {
    this.navCtrl.push(SodetailviewPage,{soId:soId});
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SohistoryPage');
  }

}
