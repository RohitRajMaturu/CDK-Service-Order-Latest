import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { commonAPIService } from '../../providers/commonAPI-services';
import { VehiclePage } from '../vehicle/vehicle';
import { AuthService } from '../../providers/auth-service';



@Component({
  selector: 'page-allvehicles',
  templateUrl: 'allvehicles.html'
  
})
export class AllvehiclesPage implements OnInit {
  userId: any;
  public cars: any;
  selectedVehId: string;
  vId: any;
  loggedUserId = '';
  userName = '';
  isDealer:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _vehDetailsService: commonAPIService,public auth: AuthService) {
 this.assignValues();
  }

   assignValues()
  {
   let info = this.auth.getUserInfo();
   this.loggedUserId = info['userId'];
   this.userName = info['userName'];
   this.isDealer=info['isDealer'];
  }

  ngOnInit() {
    this._vehDetailsService.getAllVehiclesforCustomer(this.loggedUserId).subscribe(
      result => {

        this.cars = result;
       
        this.cars = Array.from(this.cars);
        
        console.log('Cars List' + this.cars);
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('getData completed');
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllvehiclesPage');
  }


  public DeleteSelectedVehicle(selectedVehId) {
    this._vehDetailsService
      .deleteSelectedVehicle(selectedVehId)
      .subscribe(
      result => this.ngOnInit(),
      error => console.log(error)
      );
  }

  public goToAddVehcilePage() {
    this.navCtrl.push(VehiclePage);
  }

}
