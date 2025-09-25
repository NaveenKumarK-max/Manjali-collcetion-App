import { Component } from '@angular/core';
import { IonicPage, NavController, App, NavParams, ToastController, ModalController, Events, LoadingController, AlertController } from 'ionic-angular';
import { CommonProvider, BaseAPIURL } from '../../providers/common';

import { PaydetailmodalPage } from '../paydetailmodal/paydetailmodal';
import { CreditcardPage } from '../creditcard/creditcard';
import { NetbankPage } from '../netbank/netbank';
import { SavecardmodelPage } from '../savecardmodel/savecardmodel';

/**
 * Generated class for the GiftpaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-giftpayment',
  templateUrl: 'giftpayment.html',
  providers: [CommonProvider]
})
export class GiftpaymentPage {
  all: any[] = [];
  net: any[] = [];
  temp: any[] = [];
  scard: any[] = [];
  total: any = 0;

  constructor(public appCtrl: App, public alertCtrl: AlertController, public events: Events, public modal: ModalController, public comman: CommonProvider, public load: LoadingController, public toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {

    console.log(this.navParams.get('redm'))
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.getallpayments().then(data => {

      this.all = data['pgData'];
      console.log(this.all)

    })
    this.comman.getsavedcards().then(data => {
      if (data.length > 0) {
        //   console.log(data['userCards']['user_cards'])
        this.scard = Object.keys(data['userCards']['user_cards']);
        console.log(Object.keys(data['userCards']['user_cards']));
      }

    })
    this.comman.getnetbank().then(data => {

      this.net = data;
      loader.dismiss();

    })
    console.log(this.navParams.get('redm'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiftpaymentPage');
  }

  /* for footer as hide in default. it's assigned in app.components.ts */
  ionViewWillEnter() {
    let user = false;

    this.events.publish('user:created', user);
  }

  check(amount) {
    console.log(amount);
  //  this.total -= parseInt(this.dues[i]['payable']) * parseInt(this.dues[i]['sel_due']);
  }


  pay() {

    let mod = this.modal.create(PaydetailmodalPage, { data: this.navParams.get('detail'), total: this.navParams.get('data') })
    mod.present();

  }
  credit(tit) {
    this.navCtrl.push(CreditcardPage, { redm: this.navParams.get('redm'), detail: this.temp, all: this.all, total: this.navParams.get('data'), data: this.navParams.get('detail'), title: tit })
  }
  netbank() {
    this.navCtrl.push(NetbankPage, { redm: this.navParams.get('redm'), detail: this.temp, total: this.navParams.get('data'), data: this.navParams.get('detail'), 'banks': this.net })

  }
  smodel(detail) {

    let mod = this.modal.create(SavecardmodelPage, { data: detail }, { enableBackdropDismiss: false })
    mod.present();
    mod.onDidDismiss(data => {

      console.log(data)
      if (data != null && data['details']['cvv'] != "") {

       //  this.continue(data);
        console.log(data)
      }

    });
  }


}
