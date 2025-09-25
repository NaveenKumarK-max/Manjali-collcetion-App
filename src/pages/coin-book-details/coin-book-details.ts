import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,Events } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';

/**
 * Generated class for the CoinBookDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-coin-book-details',
  templateUrl: 'coin-book-details.html',
  providers: [CommonProvider]
})
export class CoinBookDetailsPage {
  cdetail:any[] = [];
  coindetail = this.navParams.get('coindetail');
  product_name = this.navParams.get('product_name');
  coin_type = this.navParams.get('coin_type');
  gram = this.navParams.get('gram');
  qty = this.navParams.get('qty');
  
  constructor(private events: Events,public load:LoadingController, public comman:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {

    console.log(this.coindetail);
    console.log(this.coin_type);
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.custCoinEnqStatus(this.navParams.get('data')).then(data=>{
      this.cdetail = data;
      console.log(data);
      loader.dismiss();
      
    })
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CoinBookDetailsPage');
  }
  ionViewWillEnter() {
    let user = true;

    this.events.publish('user:created', user);
  }

  }




