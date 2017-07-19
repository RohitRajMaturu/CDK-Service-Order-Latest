import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule,Validators } from '@angular/forms';
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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SoserviceProvider } from '../providers/soservice/soservice';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Signup,
    LoginPage,
    VehiclePage,
    SOPage
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
    SOPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    commonAPIService,
    SoserviceProvider
  ]
})
export class AppModule { }
