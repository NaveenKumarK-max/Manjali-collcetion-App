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
  selector: 'page-branch',
  templateUrl: 'branch.html',
  providers: [CommonProvider]

})
export class BranchPage {

  branch:any[] = [];
  toggle: any = true;

  constructor(public load:LoadingController, public comman:CommonProvider,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.getbranch().then(data=>{

      this.branch = data;
      console.log(this.branch);
      loader.dismiss();
      
    })
  }

  select(b){

    this.viewCtrl.dismiss(b)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BranchPage');
  }
  close(){

    this.viewCtrl.dismiss();
  }
  tog() {

    if (this.toggle == true) {
      this.toggle = false;
    }
    else {
      this.toggle = true;
    }
  }

}
