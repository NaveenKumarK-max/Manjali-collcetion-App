import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';

/**
 * Generated class for the BranchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-schememodal',
  templateUrl: 'schememodal.html',
  providers: [CommonProvider]

})
export class SchememodalPage {

  scheme:any[] = [];

  constructor(public load:LoadingController, public comman:CommonProvider,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.getscheme().then(data=>{
      this.scheme = data['schemes'];
      console.log(this.scheme);
    })
    loader.dismiss();
  }

  select(b){

    this.viewCtrl.dismiss({data:b,page:'modal'})
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BranchPage');
  }
  close(){

    this.viewCtrl.dismiss();
  }

}
