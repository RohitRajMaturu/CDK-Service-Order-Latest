import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SoserviceProvider} from '../../providers/soservice/soservice';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [SoserviceProvider]
})

export class ListPage{
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  public so:any ;

  constructor(public navCtrl: NavController,public _SoserviceProvider: SoserviceProvider) {
    console.log(this.loadPeople());
}
    // If we navigated to this page, we will have an item available as a nav param
   //this.selectedItem = navParams.get('item');
   
    // Let's populate this page with some filler content for funzies
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];

    // this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }

    loadPeople(){
   this._SoserviceProvider.load().subscribe(
     result => {
      
      this.so= result;
       console.log('result'+result);
       if(result.length>1)
        {
          this.so = Array.from(this.so);
        }
       else{
      this.so = Array.of(this.so);
       }
      console.log('so'+this.so);
    },
    err =>{
      console.error("Error : "+err);
    } ,
    () => {
      console.log('getData completed');
    }
  );
   
 }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
  }
  // console.log('load fired');
  // this._SoserviceProvider.load()
  // .subscribe(data =>   this.so = data
  // )
   
 

  // itemTapped(event, item) {
  //   // That's right, we're pushing to ourselves!
  //   this.navCtrl.push(ListPage, {
  //     item: item
  //   });
  // }
//}
