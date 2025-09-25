import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';

/**
 * Generated class for the GiftlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-giftlist',
  templateUrl: 'giftlist.html',
  providers: [CommonProvider]
})
export class GiftlistPage {
  type = "mg";
  temp: any = { "id_customer": "", "mobile": '' }
  details: any[] = [];
  giftcards: any[] = [];

  constructor(public toast: ToastController, private commonService: CommonProvider, private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {


    this.details = JSON.parse(localStorage.getItem('sssuser'));

    if (this.details != null) {

      this.temp['id_customer'] = this.details['customer']['id_customer']
      this.temp['mobile'] = this.details['mobile']

    }
    console.log(JSON.parse(localStorage.getItem('sssuser')));

    let loader = this.loadingCtrl.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.commonService.getmygift(this.temp).then(data => {
      console.log(data);
      if (data.length > 0) {
        this.details = data;
        console.log(this.details);
      } else {

      }
      // loader.dismiss();
    })

    this.commonService.getmygiftcards(this.temp).then(data => {
      console.log(data);
      if (data.length > 0) {
        this.giftcards = data;
        console.log(this.giftcards);

      } else {

      }
      loader.dismiss();
    })

  }
  segmentChanged(e) {

    console.log(e)
    console.log(this.type);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiftlistPage');
  }



}
