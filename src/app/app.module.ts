import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule,Validators } from '@angular/forms';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SoserviceProvider } from '../providers/soservice/soservice';

import { AuthService } from './../providers/auth-service';
import { commonAPIService } from '../providers/commonAPI-services';
import { Http, Response, HttpModule } from '@angular/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Signup } from '../pages/Signup/Signup';
import { LoginPage } from '../pages/login/login';
import { VehiclePage } from '../pages/vehicle/vehicle';
import { SOPage } from '../pages/so/so';
import{SohistoryPage} from '../pages/sohistory/sohistory';
import {SodetailviewPage} from '../pages//sodetailview/sodetailview';
import {LogoutPage} from '../pages/logout/logout';
import { AllvehiclesPage } from '../pages/allvehicles/allvehicles';
import { AddNewCustomerPage } from '../pages/add-new-customer/add-new-customer';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Signup,
    LoginPage,
    VehiclePage,
    SOPage,
    SohistoryPage,
    SodetailviewPage,
    AllvehiclesPage,
    AddNewCustomerPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    HttpModule
    //LoginPage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Signup,
    LoginPage,
    VehiclePage,
    SOPage,
    SohistoryPage,
    SodetailviewPage,
    AllvehiclesPage,
    AddNewCustomerPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    commonAPIService,
    SoserviceProvider,
    BarcodeScanner
  ]
})
export class AppModule { }
