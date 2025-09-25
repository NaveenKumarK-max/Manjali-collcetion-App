import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';

/**
 * Generated class for the RatefixdisclaimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-ratefixdisclaimer',
  templateUrl: 'ratefixdisclaimer.html',
})
export class RatefixdisclaimerPage {
  chckcontent = this.navParams.get('chckcontent');
  fixedrate = this.navParams.get('fixedrate');
  page = this.navParams.get('page');

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public load: LoadingController) {
    console.log(this.navParams.get('chckcontent'));
    console.log(this.navParams.get('fixedrate'))
    console.log(this.navParams.get('page'));
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatefixdisclaimerPage');
  }
  close(){
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
      dismissOnPageChange : true
    });
    loader.present();
    this.viewCtrl.dismiss();
  }

}
