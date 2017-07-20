import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { commonAPIService } from '../../providers/commonAPI-services';
import { VehiclePage } from '../vehicle/vehicle';




@Component({
  selector: 'page-allvehicles',
  templateUrl: 'allvehicles.html',
})
export class AllvehiclesPage implements OnInit {
  userId: any;
  public cars: any;
  selectedVehId: string;
  vId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _vehDetailsService: commonAPIService) {

  }

  ngOnInit() {
    this._vehDetailsService.getAllVehiclesforCustomer(6).subscribe(
      result => {

        this.cars = result;
        // if (result.length > 1) {
        this.cars = Array.from(this.cars);
        // }
        // else {
        //   this.cars = Array.of(this.cars);
        // }
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
