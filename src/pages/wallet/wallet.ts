import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { CommonProvider } from '../../providers/common';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
  providers: [CommonProvider]

})
export class WalletPage {

  balance:any = 0;
  trans:any[] = [];

  lid:any = 0;
  currency:any = '';
  id_branch:any=null


  constructor(public load:LoadingController, public comman:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.getcurrency(this.id_branch).then(data =>{


      this.currency = data;
    this.comman.getrans(this.lid).then(data=>{

      console.log(data)
      this.trans = data['transactions'];
      // this.trans = data['transactions'].sort(function(data,dat){return dat['id_wallet_transaction'] - data['id_wallet_transaction']});
      this.balance = data['balance']
      loader.dismiss();
      
    })
  })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }
  doInfinite(infiniteScroll:any){
    this.lid = this.trans[this.trans.length - 1]['id_wallet_transaction'];


    this.comman.getrans(this.lid).then(data=>{

      console.log(data)
      for (let index = 0; index <  data['transactions'].length; index++) {

        this.trans.push(data['transactions'][index])
      }
     
      // this.trans = data['transactions'].sort(function(data,dat){return dat['id_wallet_transaction'] - data['id_wallet_transaction']});
      this.balance = data['balance']
      infiniteScroll.complete();

    })
  }

}
