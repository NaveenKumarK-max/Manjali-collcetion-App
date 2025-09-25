import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
/**
 * Generated class for the ComplaindetastausPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-complaindetastaus',
  templateUrl: 'complaindetastaus.html',
  providers: [CommonProvider]
})
export class ComplaindetastausPage {

  cdetail:any[] = [];
  comdetail = this.navParams.get('complaint');
  constructor(public load:LoadingController, public comman:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
   console.log(this.comdetail);
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

}
