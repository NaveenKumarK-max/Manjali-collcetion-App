
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
  selector: 'page-paydetailmodal',
  templateUrl: 'paydetailmodal.html',
})
export class PaydetailmodalPage {


  details:any = '';
  total:any = 0;
  temp:any[] = [];

  constructor(public event:Events,public navCtrl: NavController,public renderer: Renderer,public viewCtrl: ViewController, public navParams: NavParams) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'paydetailmodal', true);

  
    this.details = this.navParams.get('data');
    this.total = this.navParams.get('total');
    console.log(this.details);
    console.log( this.total);
    this.details.forEach((element,i) => {
      
      var index = 1;

      while(index <= element['sel_due'] ){
        var test:any = Object.assign({}, element);
        test['sel_due'] = 1;
        this.temp.push(test)
        index ++;
      }
    });
   console.log(this.navParams.get('data'))
   console.log(this.temp)


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomPopupPage');
  }
  close(){

    this.viewCtrl.dismiss();
  }
  fix(one,two){

    return parseInt(one) * parseInt(two);
  }
}
