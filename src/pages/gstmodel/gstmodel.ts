import { Component,Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events,  ViewController,ToastController ,LoadingController} from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { PaymenthisPage } from '../paymenthis/paymenthis';

/**
 * Generated class for the CustomPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-gstmodel',
  templateUrl: 'gstmodel.html',
})
export class GstmodelPage {


  details:any = '';
  currency:any = '';

  
  constructor(public event:Events,public navCtrl: NavController,public renderer: Renderer,public viewCtrl: ViewController, public navParams: NavParams) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'gstmodel', true);

  
    this.details = this.navParams.get('data');
   console.log(this.navParams.get('data'));
  this.currency = this.navParams.get('currency');
  console.log(this.currency)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomPopupPage');
  }
  close(){

    this.viewCtrl.dismiss();
  }
  
  

}
