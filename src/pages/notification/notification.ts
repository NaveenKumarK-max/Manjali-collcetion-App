import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { OfferdetailPage } from '../offerdetail/offerdetail';
import { NotifydetailPage } from '../notifydetail/notifydetail';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
  providers: [CommonProvider],

})
export class NotificationPage {

  lid:any = 0;
  list:any[] = [];
  
  constructor(public load:LoadingController, public comman:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
 
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    console.log(this.lid)
    this.comman.getnotify(this.lid).then(data=>{
      console.log(data)
      this.list = data;
      loader.dismiss();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }
  doInfinite(infiniteScroll:any){
    console.log(this.list)
    this.lid = this.list[this.list.length - 1]['id_sent_noti'];

    this.comman.getnotify(this.lid).then(data=>{
      console.log(data)
      for (let index = 0; index <  data.length; index++) {

        this.list.push(data[index])
      }
     
      infiniteScroll.complete();

    })
  }
  detail(i){

    this.navCtrl.push(NotifydetailPage,{'data':i})

  }

}
