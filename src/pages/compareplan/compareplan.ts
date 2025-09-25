import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CompareplanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-compareplan',
  templateUrl: 'compareplan.html',
})
export class CompareplanPage {
  compareimg :any ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
this.compareimg = this.navParams.get('compareimg')['currency'];
console.log(this.compareimg)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompareplanPage');
  }

}
