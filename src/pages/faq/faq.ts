import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController,Events } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
  providers: [CommonProvider]
})
export class FaqPage {
  companyName = JSON.parse(localStorage.getItem( 'company'))
  faq:any[] = [];

  constructor(public load:LoadingController, public comman:CommonProvider,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams,public events: Events) {
  
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.termscondi().then(data=>{

      this.faq = data[1];
      console.log(this.faq);
      loader.dismiss();

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }
    /* for footer as hide in default. it's assigned in app.components.ts */
    ionViewWillEnter() {
      let user = true;
      this.events.publish('user:created', user);
    }

}


