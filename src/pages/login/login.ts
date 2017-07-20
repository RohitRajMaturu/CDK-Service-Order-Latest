import { Component } from '@angular/core';
import { HomePage } from '../../pages/home/home'
//import { NavController, NavParams } from 'ionic-angular';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Signup } from '../../pages/Signup/Signup'
import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Component({
    selector: 'page-so',
    templateUrl: 'login.html'
})
export class LoginPage {
    ErrorMessage: string;
    selectedItem: any;
    icons: string[];
    items: Array<{ title: string, note: string, icon: string }>;
    myDate: any;
    loading: Loading;
    registerCredentials = { email: '', password: '' };

    constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

    public createAccount() {
        this.nav.push(Signup);
    }



    public login() {
        this.showLoading()
        this.auth.login(this.registerCredentials).subscribe(allowed => {
            if (allowed.success) {   
                this.auth.loadUserDetails(this.registerCredentials);            
                this.nav.setRoot(HomePage,{credentials:this.registerCredentials});
            } else {
                this.showError(allowed.message);
                //Observable.throw("Invalid Credentials");                
            }
        },
            error => {
                this.showError(error);
            });
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    showError(text) {
        this.loading.dismiss();

        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    // constructor(public navCtrl: NavController, public navParams: NavParams) {
    //   // If we navigated to this page, we will have an item available as a nav param
    //   this.selectedItem = navParams.get('item');

    //   // Let's populate this page with some filler content for funzies
    //   this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    //   'american-football', 'boat', 'bluetooth', 'build'];

    //   this.items = [];
    //   for (let i = 1; i < 11; i++) {
    //     this.items.push({
    //       title: 'Item ' + i,
    //       note: 'This is item #' + i,
    //       icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //     });
    //   }

    //   this.myDate  = new Date().toISOString();
    // }

    itemTapped(event, item) {
        // That's right, we're pushing to ourselves!
        this.nav.push(LoginPage, {
            item: item
        });
    }
}