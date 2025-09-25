import { Component,Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events,  ViewController,ToastController ,LoadingController} from 'ionic-angular';

/**
 * Generated class for the CustomPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-savecardmodel',
  templateUrl: 'savecardmodel.html',
})
export class SavecardmodelPage {


  details:any = '';
  total:any = 0;
  cvv:any = '';

  constructor(public event:Events,public navCtrl: NavController,public renderer: Renderer,public viewCtrl: ViewController, public navParams: NavParams) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'savecardmodel', true);

  
    this.details = this.navParams.get('data');
  //   this.total = this.navParams.get('total');

  //  console.log(this.navParams.get('data'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomPopupPage');
  }
  close(){
    

    this.viewCtrl.dismiss();
  }
  pay(data){

    this.viewCtrl.dismiss({details:{d:data,cvv:this.cvv}});

  }

}
