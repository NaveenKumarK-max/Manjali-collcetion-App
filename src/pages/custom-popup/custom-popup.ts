import { Component,Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events,  ViewController,ToastController ,LoadingController} from 'ionic-angular';
import { CommonProvider } from '../../providers/common';

/**
 * Generated class for the CustomPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-custom-popup',
  templateUrl: 'custom-popup.html',
  providers: [CommonProvider]
})
export class CustomPopupPage {


  details:any = '';
  currency: any = { 'currency': { 'currency_symbol': '' } };
  id_branch: any = null;
  
  constructor(public event:Events,public navCtrl: NavController,public renderer: Renderer,public viewCtrl: ViewController, public navParams: NavParams,public comman: CommonProvider) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'custom-popup', true);

  
    this.details = this.navParams.get('data');
   console.log(this.navParams.get('data'));
   this.comman.getcurrency(this.id_branch).then(data => {

    this.currency = data;
  })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomPopupPage');
  }
  close(){

    this.viewCtrl.dismiss();
  }

}
