import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, ToastController,Events } from 'ionic-angular';
import { PpPage } from '../pp/pp';
import { AboutPage } from '../about/about';
import { TcPage } from '../tc/tc';

/**
 * Generated class for the PolicyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-policy',
  templateUrl: 'policy.html',
})
export class PolicyPage {
  status = JSON.parse(localStorage.getItem('logstatus'));

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PolicyPage');
  }
  pp() {

    this.navCtrl.push(PpPage)
  }
  about() {

    this.navCtrl.push(AboutPage)
  }
  tc() {

    this.navCtrl.push(TcPage)
  }

}
