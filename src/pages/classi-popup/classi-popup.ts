import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, App,Events } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { HomePage } from '../home/home';

/**
 * Generated class for the ClassiPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-classi-popup',
  templateUrl: 'classi-popup.html',
  providers: [CommonProvider]
})

export class ClassiPopupPage {
  intresred_amt: any = '';
  intrested_wgt: any = '';
  message: any = '';
  // intresred_amt: any = '';
  err: any = false;

  classimage = this.navParams.get('classimage');
  data = this.navParams.get('data');

  constructor(public appCtrl: App, public navCtrl: NavController,public event:Events, public navParams: NavParams, public viewCtrl: ViewController, public renderer: Renderer, public load: LoadingController, public comman: CommonProvider, public toast: ToastController) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'popupmodal', true);
    //data =this.navParams.get('data');
    console.log(this.navParams.get('data'));
  }

  confirm() {
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));
    var temp = {

      "id_customer": currentUser['customer']['id_customer'],
      "mobile": currentUser['mobile'],
      "intresred_amt": this.intresred_amt,
      "intrested_wgt": this.intrested_wgt,
      "message": this.message,
      "id_scheme": this.navParams.get('data')['id_scheme']
    }
    console.log(temp);

    if ((this.intresred_amt != '' || this.intrested_wgt != '') && this.message != '') {
if(this.err == false){
      this.comman.intstenquiry(temp).then(data => {

        if (data['status']) {

          let ctrl = this.toast.create({
            message: data.message,
            duration: 3000,
            position: 'bottom'
          });
          ctrl.present();
          // this.navCtrl.setRoot(HomePage);
          this.viewCtrl.dismiss();
          this.appCtrl.getRootNav().setRoot(HomePage);
        }
      })
    }else{
      let toast = this.toast.create({
        message: "Please enter correct values.",
        position: 'bottom',
        duration: 6000
      });
      toast.present();
    }

    }
    else {
      let toast = this.toast.create({
        message: " * Fields Are Mandatory",
        position: 'bottom',
        duration: 6000
      });
      toast.present();
    }

  }

  check(type) {
    console.log(type)
   if(type == 1 ){ 
    console.log(this.intresred_amt);
    console.log(this.data['max_amount']);
    console.log(this.data['min_amount']);
     console.log(parseInt(this.intresred_amt) <= parseInt(this.data['max_amount']) && parseInt(this.intresred_amt) >= parseInt(this.data['min_amount']));
    // console.log(this.data['scheme'].max_amount);
    // console.log(this.data['scheme'].min_amount);

    if (parseInt(this.intresred_amt) <= parseInt(this.data['max_amount']) && parseInt(this.intresred_amt) >= parseInt(this.data['min_amount'])) {
      console.log(this.data['flx_denomintion']);
      console.log(parseInt(this.intresred_amt) % parseInt(this.data['flx_denomintion']));

      if (parseInt(this.intresred_amt) % parseInt(this.data['flx_denomintion'])) {

        console.log('multi');
        this.err = 'multi';
      } else {
        this.err = false;
        console.log('else');
      }
    } else {
      this.err = true;
    }
  }else{

    console.log(this.intrested_wgt);
    console.log(this.data['max_weight']);
    console.log(this.data['min_weight']);
     console.log(parseInt(this.intrested_wgt) <= parseInt(this.data['max_weight']) && parseInt(this.intrested_wgt) >= parseInt(this.data['min_weight']));

    if (parseInt(this.intrested_wgt) <= parseInt(this.data['max_weight']) && parseInt(this.intrested_wgt) >= parseInt(this.data['min_weight'])) {
      this.err = false;
        console.log('else');
    } else {
      this.err = true;
    }

  }
  }
  public onKeyUp(event: any) {
    //const NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
   const NUMBER_REGEXP = /^[0-9]*$/;
    let newValue = event.target.value;
    let regExp = new RegExp(NUMBER_REGEXP);

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
      return true;
    }else{
      return false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassiPopupPage');
  }
  closeModal($event) {
    this.navCtrl.pop();
  }

}
