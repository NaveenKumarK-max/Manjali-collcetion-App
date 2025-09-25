import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';

/**
 * Generated class for the OfferdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-offerdetail',
  templateUrl: 'offerdetail.html',
  providers: [CommonProvider]

})
export class OfferdetailPage {

  details:any = '';

  constructor(public load:LoadingController,public comman:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.offdetail(this.navParams.get('data')['id_offer']).then(data=>{

      this.details = data;
      console.log(this.details);
      loader.dismiss();
      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferdetailPage');
  }

}
