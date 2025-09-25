import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ViewController,LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
/**
 * Generated class for the TcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-tc',
  templateUrl: 'tc.html',
  providers: [CommonProvider]
})
export class TcPage {

  companyName = JSON.parse(localStorage.getItem( 'company'));
  termsconditi:any[] = [];

  constructor(public events: Events,public load:LoadingController, public comman:CommonProvider,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.termscondi().then(data=>{

      this.termsconditi = data[0];
      console.log(this.termsconditi);
      loader.dismiss();
      console.log(this.termsconditi);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TcPage');
  }
  /* for footer as hide in default. it's assigned in app.components.ts */
  ionViewWillEnter() {
    let user = true;
    this.events.publish('user:created', user);
  }
}



