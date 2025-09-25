import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { CommonProvider } from '../../providers/common';

/**
 * Generated class for the ComplaintdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dthstatus',
  templateUrl: 'dthstatus.html',
  providers: [CommonProvider]

})
export class DthstatusPage {

  cdetail:any[] = [];

  constructor(public load:LoadingController, public comman:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.dthstatus(this.navParams.get('data')).then(data=>{

      this.cdetail = data;
     
      console.log(data);
      loader.dismiss();
      
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplaintdetailPage');
  }

}
