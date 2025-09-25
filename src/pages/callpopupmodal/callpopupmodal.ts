import { Component,Renderer } from '@angular/core';
import { App,IonicPage, NavController, NavParams,Events,  ViewController,ToastController ,LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';


@Component({
  selector: 'page-callpopupmodal',
  templateUrl: 'callpopupmodal.html',
  providers: [CommonProvider]
})
export class CallpopupmodalPage {

  details:any = this.navParams.get('data');
  constructor(public appCtrl: App,public load:LoadingController, public toast:ToastController,public comman:CommonProvider, public event:Events,public navCtrl: NavController,public renderer: Renderer,public viewCtrl: ViewController, public navParams: NavParams) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'callpopupmodal', true);

console.log(this.details);

  }
  closeModal($event) {
    this.navCtrl.pop();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CallpopupmodalPage');
  }

}
