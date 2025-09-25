
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
  selector: 'page-newarrivaldetail',
  templateUrl: 'newarrivaldetail.html',
  providers: [CommonProvider]

})
export class NewarrivaldetailPage {

  details:any = '';
  id_branch: any = null;
  currency: any = { 'currency': { 'currency_symbol': '' } };
  branchname: any = '';

  constructor(public load:LoadingController,public comman:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.newdetail(this.navParams.get('data')['id_new_arrivals']).then(data=>{

      this.details = data;
      console.log(this.details);
      loader.dismiss();
      
    })
    this.comman.getcurrency(this.id_branch).then(data => {

      this.currency = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferdetailPage');
  }

}
