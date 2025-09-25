import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ViewController,LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [CommonProvider]
})
export class AboutPage {
  companyName = JSON.parse(localStorage.getItem( 'company'))
  aboutus:any[] = [];

  constructor(public events: Events,public load:LoadingController, public comman:CommonProvider,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {

    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.termscondi().then(data=>{

      this.aboutus = data['about'];
      console.log(this.aboutus);
      loader.dismiss();
      console.log(this.aboutus);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
