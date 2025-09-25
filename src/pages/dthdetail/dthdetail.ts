import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController ,LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { DthstatusPage } from '../dthstatus/dthstatus';


/**
 * Generated class for the DthdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-dthdetail',
  templateUrl: 'dthdetail.html',
})
export class DthdetailPage {

  detail:any[] = [];
  searchData:any[] = [];
  public input: string = '';

  constructor(public toast:ToastController, private commonService: CommonProvider, private loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.loadingCtrl.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.commonService.dthrequest().then(data=>{

      this.detail = data;
      this.searchData = data;

      console.log(data);
      loader.dismiss();
    })
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DthdetailPage');
  }

  more(c){

    this.navCtrl.push(DthstatusPage,{data:c['id_enquiry']})
  }
  search() {
    
    this.detail = this.searchData.filter(item => item['ticket_no'].toUpperCase().includes(this.input.toUpperCase()));
  }
}
