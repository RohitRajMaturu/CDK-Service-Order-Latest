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
  isDealer:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public _SoserviceProvider: SoserviceProvider,private auth: AuthService) {
   this.assignValues();
 this.userso=this.loaduserso();
  }

  assignValues()
  {
     let info = this.auth.getUserInfo();
    this.username = info['userId'];
    this.email = info['userName']; 
    this.isDealer = info['isDealer'];
  }

  loaduserso(){
  //  this.assignValues();
    this._SoserviceProvider.loadsobasedonSo(this.isDealer).subscribe(
      result => {
        this.userso = result;
       // this.userso.comments = this.transform(result.comments);
        //this.userso.comments=result.comments;
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

 transform(str: string) {
        //let replaced = str.replace(/(\r\n|\r|\n)/g, '<br/>');
        let array = str.split("<br/>");
        for(let el of array) {
            if(!!el === false) {
                array.splice(array.indexOf(el), 1);
            }
        }

        return "<p>" + array.join("</p><p>") + "</p>";
    }

  ViewselectedVehicle(soId)
  {
    this.navCtrl.push(SodetailviewPage,{soId:soId});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SohistoryPage');
  }

}
