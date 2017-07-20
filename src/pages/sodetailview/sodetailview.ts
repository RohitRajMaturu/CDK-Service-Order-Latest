import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SoserviceProvider } from '../../providers/soservice/soservice';
import{HomePage} from '../../pages/home/home';
import{SohistoryPage} from '../../pages/sohistory/sohistory';
import { AuthService } from '../../providers/auth-service';
/**
 * Generated class for the SodetailviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-sodetailview',
  templateUrl: 'sodetailview.html',
})
export class SodetailviewPage {
   sodetail:any;
   soComments: any;
   selectedId:any;
   userId = '';
   userName = '';
   isDealer=false;
   public SohistoryPage: SohistoryPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public _SoserviceProvider: SoserviceProvider,private auth: AuthService) {
    this.selectedId=navParams.data.soId;
   this.showsoDetails(navParams.data.soId);
   this.soComments = "";
  }

  showsoDetails(soId)
  {
        this._SoserviceProvider.loadsoInDetail(soId).subscribe(
      result => {
        this.sodetail = result;
        console.log('result' + result);      
        this.sodetail = Array.from(this.sodetail);
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('getData completed');
      }
    );
    this.loadUserDetails();
  }


loadUserDetails()
{
  let info=this.auth.getUserInfo();
   this.userId = info['userId'];
   this.userName = info['userName'];
   this.isDealer=info['isDealer'];
}

  UpdateComments(){
     var soComments =this.userName+":"+ this.soComments;
     this._SoserviceProvider.updateComments(this.selectedId,soComments);
      this.navCtrl.setRoot(HomePage);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SodetailviewPage');
  }

  public cancelSO() {
    //this._SoserviceProvider.loadsobasedonSo(this.isDealer);
    let comments= this.userName+" has cancelled this so";
    this._SoserviceProvider.AcceptSO(this.selectedId,5,comments);
    this.navCtrl.setRoot(HomePage);
  }
  
  AcceptSO()
  {
    let comments ="";    
       comments =this.userName +":"+ "has accepted this SO";
      this._SoserviceProvider.AcceptSO(this.selectedId,2,comments);
      this.navCtrl.setRoot(HomePage);
  }

   RejectSO()
  {
       let comments ="";   
       comments =this.userName +":"+ "has rejected this SO";
      this._SoserviceProvider.RejectSO(this.selectedId,5,comments);
       this.navCtrl.setRoot(HomePage);
  }

  cancel()
  {
      this.navCtrl.setRoot(HomePage);    
  }
  inservice()
  {
    let comments=this.userName+':'+"has moved this SO to In-Service";
   this._SoserviceProvider.inService(this.selectedId,3,comments);
   this.navCtrl.setRoot(HomePage);
  }
  servicedone(){
 let comments=this.userName+':'+"has marked this So as Done";
     this._SoserviceProvider.serviceDone(this.selectedId,4,comments);
     this.navCtrl.setRoot(HomePage);
  }

}
