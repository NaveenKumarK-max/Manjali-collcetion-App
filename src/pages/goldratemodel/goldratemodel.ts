import { Component,Renderer } from '@angular/core';
import { App,IonicPage, NavController, NavParams,Events,  ViewController,ToastController ,LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';

/**
 * Generated class for the GoldratemodelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-goldratemodel',
  templateUrl: 'goldratemodel.html',
  providers: [CommonProvider]
})
export class GoldratemodelPage {
  // getcurrency = JSON.parse(localStorage.getItem('getcurrency'))['metal_rates'];
  getcurrency = JSON.parse(localStorage.getItem('getcurrency'))['metal_rates'];
  grate:any='0000';
  srate:any='0000';
  timedate:any='0000';

	id_branch: any = null;
  display:boolean=false;

  constructor(public appCtrl: App,public load:LoadingController, public toast:ToastController,public comman:CommonProvider, public event:Events,public navCtrl: NavController,public renderer: Renderer,public viewCtrl: ViewController, public navParams: NavParams) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'goldratemodel', true);
    console.log(this.getcurrency)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoldratemodelPage');
  }
  closeModal($event) {
    this.navCtrl.pop();
}
ionViewWillEnter(){
  this.comman.getcurrency(this.id_branch).then(data => {
    this.grate = data['metal_rates']['goldrate_22ct']
    this.srate = data['metal_rates']['silverrate_1gm']
    this.timedate = data['metal_rates']['updatetime']
    this.display=true;
    console.log(data)
  })
}
refresh(){
  this.display=false;
  this.comman.getcurrency(this.id_branch).then(data => {
    this.grate = data['metal_rates']['goldrate_22ct']
    this.srate = data['metal_rates']['silverrate_1gm']
    this.timedate = data['metal_rates']['updatetime']
    this.display=true;
    console.log(data)
  })
}
}
