import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController ,LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { ComplaindetastausPage } from '../complaindetastaus/complaindetastaus';

/**
 * Generated class for the ComplaintdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-complaintdetail',
  templateUrl: 'complaintdetail.html',
  providers: [CommonProvider]

})
export class ComplaintdetailPage {
/* 
  cdetail:any[] = [];

  constructor(public load:LoadingController, public comman:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.getcomplaintstatus(this.navParams.get('data')).then(data=>{

      this.cdetail = data;
     
      console.log(data);
      loader.dismiss();
      
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplaintdetailPage');
  }
 */

  detail:any[] = [];
  searchData:any[] = [];
  public input: string = '';

  constructor(public toast:ToastController, private commonService: CommonProvider, private loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.loadingCtrl.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.commonService.complaints().then(data=>{

      this.detail = data;
      this.searchData = data;

      console.log(data);
      loader.dismiss();
    })
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplaintdetailPage');
  }

  more(c){

    this.navCtrl.push(ComplaindetastausPage,{data:c['id_enquiry'],complaint:c['comments']})
  }
  search() {
    
    this.detail = this.searchData.filter(item => item['ticket_no'].toUpperCase().includes(this.input.toUpperCase()));
  }

}
