import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SoserviceProvider } from '../../providers/soservice/soservice';
import{HomePage} from '../../pages/home/home';
import{SohistoryPage} from '../../pages/sohistory/sohistory';
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
   public SohistoryPage: SohistoryPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public _SoserviceProvider: SoserviceProvider) {
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
  }

  UpdateComments(){
     var soComments = this.soComments;
     this._SoserviceProvider.updateComments(this.selectedId,soComments);
      this.navCtrl.push(SohistoryPage);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SodetailviewPage');
  }

  public cancelSO() {
    this.SohistoryPage.loaduserso();
    this.navCtrl.setRoot(SohistoryPage);
  }

}
