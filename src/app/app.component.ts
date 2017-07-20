import { Component, ViewChild } from '@angular/core';
import { commonAPIService } from '../providers/commonAPI-services';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SoserviceProvider } from '../providers/soservice/soservice';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Signup } from '../pages/Signup/Signup';
import { LoginPage } from '../pages/login/login';
import{VehiclePage} from '../pages/vehicle/vehicle';
import { SOPage } from '../pages/so/so';
import{SohistoryPage} from '../pages/sohistory/sohistory';
import {SodetailviewPage} from '../pages/sodetailview/sodetailview';
import {LogoutPage} from '../pages/logout/logout';
import { AllvehiclesPage } from '../pages/allvehicles/allvehicles';
import { AddNewCustomerPage } from '../pages/add-new-customer/add-new-customer';

@Component({
  templateUrl: 'app.html',
  providers: [commonAPIService,SoserviceProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

 pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Sign-Up', component: Signup },
      { title: 'Service Order', component: SOPage},
      { title: 'Add Vehicle', component: VehiclePage },
      { title: 'SO History', component: SohistoryPage },   
      { title: 'My Vehicles', component: AllvehiclesPage },
      { title: 'Add New Customer', component: AddNewCustomerPage},
      { title: "Logout", component: LogoutPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.push(page.component);
    // if (page.title == "Logout") {
    //   // Reset the content nav to have just this page
    //   this.nav.setRoot(LoginPage);
    // }
    // else {
      // we wouldn't want the back button to show in this scenario
      this.nav.push(page.component);
    // }
  }
}
