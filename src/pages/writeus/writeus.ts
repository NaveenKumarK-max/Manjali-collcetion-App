import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { ComplaintdetailPage } from '../complaintdetail/complaintdetail';

/**
 * Generated class for the WriteusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-writeus',
  templateUrl: 'writeus.html',
  providers: [CommonProvider]

})
export class WriteusPage {

  complaints:any[] = [];
  searchData:any[] = [];
  public input: string = '';

  constructor(public comman:CommonProvider, public load:LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.complaints().then(data=>{

      this.complaints = data;
      this.searchData = data;

      console.log(data)
   
      loader.dismiss();
      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WriteusPage');
  }
  more(c){

    this.navCtrl.setRoot(ComplaintdetailPage,{data:c['id_enquiry']})
  }
  search() {

    // ng-show="chit.paid_installments == '0' && chit.isPendingStatExist == false  && allowDelete == true && chit.isPaymentExist == false"
    
    this.complaints = this.searchData.filter(item => item['ticket_no'].toUpperCase().includes(this.input.toUpperCase()));
  }
}
