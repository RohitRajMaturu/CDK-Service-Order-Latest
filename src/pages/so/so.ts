import { Component } from '@angular/core';
import {HomePage} from '../../pages/home/home'
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-so',
  templateUrl: 'so.html'
})
export class SOPage {
  selectedLocation: any;
  selectedDealer:any;
  selectedVehicle:any;
  selectedCheckbox:any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  myDate:any;
  soDetails = { selectedLocation: '', selectedVehicle: '',selectedDealer:'' };
  cbChecked: string[] = [];
  cbArr: string[];
   soComments:any;
   soDate:any;
   soTime:any;
   Dealers: Array<{title: string, note: string, icon: string}>

   constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthService) {
     // If we navigated to this page, we will have an item available as a nav param
    this.cbArr = [];
     this.soComments = "";
    this.cbChecked = [];
    this.selectedLocation = navParams.get('item');
    this.selectedDealer= navParams.get('dealer');
    this.selectedVehicle = navParams.get('vehicle');
   this.Dealers=[];
    this.loadCheckBoxValues();
   // this.selectedCheckbox=navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
 this.soDate= new Date().toISOString();
 this.soTime  = new Date().toISOString();
  }

  loadCheckBoxValues(){
    console.log(this.cbChecked);
    this.cbArr = ['OptionA', 'OptionB', 'OptionC'];
  }

locationChange()
{
var selectedLocation = this.soDetails.selectedLocation;
this.Dealers=this.items;

}

updateCheckedOptions(chBox, event) {
        var cbIdx = this.cbChecked.indexOf(chBox);

        if(event.target.checked) {
          if(cbIdx < 0 ){
               this.cbChecked.push(chBox);
             console.log(chBox);
          }
        } else {
          if(cbIdx >= 0 ){
             this.cbChecked.splice(cbIdx,1);
              console.log(cbIdx);
          }
        }
    }


 public createSO() {
   var soComments=this.soComments;
   var soDate= this.soDate.substring(0,10);
   var soTime = this.soTime.substring(11,19);
     console.log(this.cbChecked);
    this.auth.login(this.soDetails).subscribe(allowed => {
      if (allowed) {        
        this.navCtrl.setRoot(HomePage);
      } else {
        //this.showError("Access Denied");
      }
    },
      error => {
       // this.showError(error);
      });
  }

  public cancelSO()
  {
  this.navCtrl.pop();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SOPage, {
      item: item
    });
  }
}
