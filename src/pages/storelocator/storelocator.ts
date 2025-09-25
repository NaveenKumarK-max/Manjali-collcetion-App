import { Component } from '@angular/core';
import {trigger, state, style, transition, animate, keyframes, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,LoadingController} from 'ionic-angular';
import { CommonProvider,BaseAPIURL } from '../../providers/common';


/**
 * Generated class for the StorelocatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-storelocator',
  templateUrl: 'storelocator.html',
  providers: [CommonProvider]
})
export class StorelocatorPage {
  branchdetail:any[] = [];
  baseurl:any = BaseAPIURL;

/*   searchTerm : any="";
  jsonData : any; */

  constructor(public load:LoadingController, public comman:CommonProvider,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {

    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
    
   console.log(this.baseurl);

    this.comman.getAllBranchDetail().then(data=>{

      this.branchdetail = data;
      console.log(this.branchdetail);
      loader.dismiss();
      
    })


  }
/*   setFilteredItems() {
 
    this.jsonData = this.branchdetail.filter(this.searchTerm);

} */


/*   viewmap(map_url){
    console.log(map_url);
    let submiturl = map_url + "&nocache=";
    var locationWindow = window.open(submiturl, '_blank', 'location=no, clearsessioncache=yes');

  } */

  viewmap(map_url){
    console.log(map_url);
    let submiturl = map_url;
    var locationWindow = window.open(submiturl);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StorelocatorPage');
  }

}
