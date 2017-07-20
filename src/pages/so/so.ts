import { Component } from '@angular/core';
import { HomePage } from '../../pages/home/home'
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { SoserviceProvider } from '../../providers/soservice/soservice';

@Component({
  selector: 'page-so',
  templateUrl: 'so.html'
})
export class SOPage {
  selectedLocation: any;
  selectedDealer: any;
  selectedVehicle: any;
  selectedCheckbox: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  myDate: any;
  soDetails = { selectedLocation: '', selectedVehicle: '', selectedDealer: '' };
  cbChecked: string[] = [];
  cbArr: any;
  soComments: any;
  soDate: any;
  soTime: any;
  Dealers: any;
  Locations: any;
  vehicles: any;
  chkedvalues: string;
  userId = '';
  userName = '';
  isDealer:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, public _SoserviceProvider: SoserviceProvider,private alertCtrl: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.cbArr = [];
    this.soComments = "";
    this.chkedvalues = "";
    this.cbChecked = [];
    this.selectedLocation = '';
    this.selectedDealer = '';
    this.selectedVehicle = ''; 
    this.Dealers = [];
    this.assignValues();
    this.loadCheckBoxValues();
    this.Locations = this.loadLocations();
    this.vehicles = this.loadUserVehicles();

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
    this.soDate = new Date().toISOString();
    this.soTime = new Date().toISOString();
  }

 assignValues()
  {
   let info = this.auth.getUserInfo();
   this.userId = info['userId'];
   this.userName = info['userName'];
   this.isDealer=info['isDealer'];
  }


  loadLocations() {
    this._SoserviceProvider.load().subscribe(
      result => {

        this.Locations = result;
        console.log('result' + result);
        if (result.length > 1) {
          this.Locations = Array.from(this.Locations);
        }
        else {
          this.Locations = Array.of(this.Locations);
        }
        console.log('so' + this.Locations);
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('getData completed');
      }
    );

  }

  loadUserVehicles() {
    console.log(this.userId);
    this._SoserviceProvider.loadUserVehicles(this.userId).subscribe(
      result => {

        this.vehicles = result;
        console.log('result' + result);    
        this.vehicles = Array.from(this.vehicles);               
        console.log('so' + this.vehicles);
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('getData completed');
      }
    );
  }

  loadCheckBoxValues() {
    this._SoserviceProvider.loadBasicServicesProvided().subscribe(
      result => {

        this.cbArr = result;
        console.log('result' + result);
        if (result.length > 1) {
          this.cbArr = Array.from(this.cbArr);
        }
        else {
          this.cbArr = Array.of(this.cbArr);
        }
        console.log('so' + this.cbArr);
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('getData completed');
      }
    );

  }


  locationChange() {
    var selectedLocation = this.soDetails.selectedLocation;
    this.Dealers = this.loadDealers(selectedLocation);
  }

  loadDealers(locationId) {
    this._SoserviceProvider.loadDealersbasedonLocations(locationId).subscribe(
      result => {

        this.Dealers = result;
        console.log('result' + result);
        if (result.length > 1) {
          this.Dealers = Array.from(this.Dealers);
        }
        else {
          this.Dealers = Array.of(this.Dealers);
        }
        console.log('so' + this.Dealers);
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('getData completed');
      }
    );

  }

  updateCheckedOptions(chBox, event) {
    var cbIdx = chBox.ServicesId;

    if (event.target.checked) {
      if (cbIdx > 0) {
        this.cbChecked.push(cbIdx);
        console.log(this.cbChecked);
      }
    }
    else {
      if (cbIdx >= 0) {
        this.cbChecked.splice(cbIdx, 1);
        console.log(cbIdx);
      }
    }
  }

  public createSO() {
    var soComments = this.soComments;
    var soDate = this.soDate.substring(0, 10);
    var soTime = this.soTime.substring(11, 19);
    console.log(this.cbChecked);
    for (var i = 0; i < this.cbChecked.length; i++)// key in this.cbChecked) {
    {
      this.chkedvalues += this.cbChecked[i] + ',';
    }
    if (this.chkedvalues.substring(this.chkedvalues.length - 1, this.chkedvalues.length) == ',') {

      this.chkedvalues = this.chkedvalues.substring(0, this.chkedvalues.length - 1);
    }
var vehicleId=this.soDetails.selectedVehicle;
var dealerId=this.soDetails.selectedDealer;
var locationId=this.soDetails.selectedLocation;
    var postsoData={
UserId :this.userId,
VehicleId:vehicleId,
DealerId:dealerId,
ServicesOpted:this.chkedvalues,
Comments:this.userName+":"+soComments,
Status:1,
ScheduleDetails:soDate+'T'+soTime       
    }

    this._SoserviceProvider.postsoDetails(postsoData);
    this.showMessage('SO Created successfully');
    this.navCtrl.setRoot(HomePage);
  }
   showMessage(text) {        

        let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

  public cancelSO() {
    this.navCtrl.setRoot(HomePage);
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SOPage, {
      item: item
    });
  }
}
