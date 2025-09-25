import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, App,Events } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { HomePage } from '../home/home';

/**
 * Generated class for the CusPendingMsgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-cus-pending-msg',
  templateUrl: 'cus-pending-msg.html',
  providers: [CommonProvider]
})
export class CusPendingMsgPage {

  message: any = '';
  cusdetail  = this.navParams.get('data')

  constructor(public appCtrl: App, public navCtrl: NavController,public event:Events, public navParams: NavParams, public viewCtrl: ViewController, public renderer: Renderer, public load: LoadingController, public comman: CommonProvider, public toast: ToastController) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'popupmodal', true);
    //data =this.navParams.get('data');
    console.log(this.cusdetail);
  }

  confirm() {
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));
    var temp = {

      "mobile": this.cusdetail['mobile'],
      "id_scheme_account": this.cusdetail['id_scheme_account'],
      'customer': this.cusdetail['customer'],
      "message": this.message,
      'id_employee': currentUser['employee']['id_employee'],
      'login_type': currentUser['employee']['login_type'],
      'emp_branch': currentUser['employee']['id_branch']

    }
    console.log(temp);

    if (this.message != '') {

      this.comman.pendingReson(temp).then(data => {

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CusPendingMsgPage');
  }
  closeModal($event) {
    this.navCtrl.pop();
  }

}
