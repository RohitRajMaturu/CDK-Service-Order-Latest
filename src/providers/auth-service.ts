import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';


export class User {
  userId: any;
  userName: any;
  isDealer:boolean;

  constructor(userId: string, userName: string,isDealer:boolean) {
    this.userId = userId;
    this.userName = userName;
    this.isDealer=isDealer;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;
  returnValue: any;

  constructor(public _http: Http) { }

  public login(credentials) {
    if (credentials.email === '' || credentials.password === '') {
      return Observable.throw("Please insert credentials");
    } else {
      return this.isValidUser(credentials);

      //return this.returnValue;
      // return Observable.create(observer => {
      //   // At this point make a request to your backend to make a real check!
      //   let access =this.isValidUser(credentials); //(credentials.password === "pass" && credentials.email === "email");
      //   this.currentUser = new User('Simon', 'saimon@devdactic.com',);
      //   observer.next(access);
      //   observer.complete();
      // });
    }

    
  }
    public loadUserDetails(credentials)
    {        
      console.log(this._http.get('http://172.31.109.204:81/api/User/Validate/' + credentials.email + "/" + credentials.password).map(res => res.json()).subscribe(result=>{
       this.currentUser = new User(result.userInfo.Id,result.userInfo.UserName,result.userInfo.IsDealer);
       console.log(this.currentUser);
    }
      ));
    }
  public isValidUser(credentials) {
    return this._http.get('http://172.31.109.204:81/api/User/Validate/' + credentials.email + "/" + credentials.password).map(res => res.json());

  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }



  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
   this.currentUser=null;
   //this.navCtrl.setRoot(LoginPage);
  }
}