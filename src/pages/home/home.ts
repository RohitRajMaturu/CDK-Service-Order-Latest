import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';
  constructor(public navCtrl: NavController) {
  }

  testmethod() {
  //   , private auth: AuthService
  //   let info = this.auth.getUserInfo();
  //   if (info != undefined) {
  //     this.username = info['userId'];
  //     this.email = info['userName'];
  //   }
  // }
  }
}
