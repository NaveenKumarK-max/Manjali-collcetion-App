import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController ,LoadingController,Events } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { CoinBookDetailsPage } from '../coin-book-details/coin-book-details';
/**
 * Generated class for the CoinBookListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-coin-book-list',
  templateUrl: 'coin-book-list.html',
  providers: [CommonProvider]
})
export class CoinBookListPage {
  detail:any[] = [];
  searchData:any[] = [];
  public input: string = '';
  constructor(private events: Events,public toast:ToastController, private commonService: CommonProvider, private loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams) {
 
    let loader = this.loadingCtrl.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.commonService.custCoinEnq().then(data=>{

      this.detail = data;
      this.searchData = data;

      console.log(data);
      loader.dismiss();
    })
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoinBookListPage');
  }

  more(c){

    this.navCtrl.push(CoinBookDetailsPage,{data:c['id_enquiry'],coindetail:c['comments'],product_name:c['product_name'],coin_type:c['coin_type'],gram:c['gram'],qty:c['qty']})
  }
  search() {
    
    this.detail = this.searchData.filter(item => item['ticket_no'].toUpperCase().includes(this.input.toUpperCase()));
  }
  ionViewWillEnter() {
    let user = true;

    this.events.publish('user:created', user);
  }
 

}
