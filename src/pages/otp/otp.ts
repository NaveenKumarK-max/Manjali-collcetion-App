import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CommonProvider } from '../../providers/common';
import { ResetPassPage } from '../reset-password/reset-password';
import { SchemedetailPage } from '../schemedetail/schemedetail';
import { HomePage } from '../home/home';
// import { PingeneratePage } from '../pingenerate/pingenerate';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import { PayduesPage } from '../paydues/paydues';

/**
 * Generated class for the OtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
  providers: [CommonProvider]

})
export class OtpPage {

  temp: any = { "sysotp": '', "last_otp_expiry": "", "userotp": "",'mobile':'' };
  msg: any = '';
  page = this.navParams.get('page');
  postdata: any = '';
  exitmobile = this.navParams.get('mobile');
  currency: any = { 'currency': { 'currency_symbol': '' } };
  rates: any = '';
  id_branch: any = '';

  app_version = JSON.parse(localStorage.getItem('appVersion'));
  fromforgot = this.navParams.get('pagetype');

  countDown;
  counter = 0;
  tick = 1000;
  data: any = '';
  disable = false;


  constructor(public cd: ChangeDetectorRef, private menu: MenuController, public toast: ToastController, public load: LoadingController, public comman: CommonProvider, public navCtrl: NavController, public navParams: NavParams) {



    var newDateObj = new Date();
    newDateObj.setTime(newDateObj.getTime() + (1 * 60 * 1000));

    var secondBetweenTwoDate = Math.abs((new Date().getTime() - newDateObj.getTime()) / 1000);

    this.counter = secondBetweenTwoDate;
    this.countDown = Observable.timer(0, this.tick)
      .take(this.counter)
      .map(() => {
        this.data = this.counter
        this.cd.detectChanges();
        console.log('count : ' + this.counter)
        console.log(this.data)
        return --this.counter
      })

    this.comman.getcurrency(this.id_branch).then(data => {
      this.currency = data;
      this.rates = data['metal_rates']
    })

    console.log(this.navParams.get('page'))
    console.log(this.navParams.get('pagetype'))
    if (this.navParams.get('page') == 'old') {
      this.comman.generateotp(this.navParams.get('data'), '').then(data => {
        this.temp['sysotp'] = data['otp']
        this.temp['last_otp_expiry'] = data['expiry']
        this.temp['mobile'] = this.navParams.get('data');
      })
    }
    if (this.navParams.get('page') == 'new') {
      console.log(this.navParams.get('data')['mobile']);
      this.comman.generateotp(this.navParams.get('data')['mobile'], this.navParams.get('data')['email']).then(data => {

        this.temp['sysotp'] = data['otp']
        this.temp['last_otp_expiry'] = data['expiry']
        this.temp['mobile'] = this.navParams.get('data');


      })
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }
  sign() {

    this.navCtrl.setRoot(LoginPage)
  }
  submit() {
    let loader = this.load.create({
      //  content: 'Please Wait',
      spinner: 'crescent',
    });
    loader.present();

    console.log(this.navParams.get('pagetype'))
    console.log(this.navParams.get('page'))
    console.log(this.navParams.get('data'))

    if (this.navParams.get('page') == 'old' || this.navParams.get('page') == 'new') {
      console.log('1111111111', this.navParams.get('data'))

      console.log(this.temp)

      this.comman.checkotp(this.temp).then(data => {
        if (data['is_valid']) {

          this.msg = '';
          if (this.navParams.get('page') == 'old') {
            loader.dismiss();
            this.navCtrl.push(ResetPassPage, { 'data': this.navParams.get('data') })
          }

          if (this.navParams.get('page') == 'new') {
            this.comman.createcus(this.navParams.get('data')).then(data => {
              let ctrl = this.toast.create({
                message: data['msg'],
                duration: 6000,
                position: 'bottom'
              });
              loader.dismiss();
              ctrl.present();
              this.navCtrl.push(LoginPage)
              // if (data['status']) {
              //   this.navCtrl.push(PingeneratePage, { 'regisData': data, 'page': this.navParams.get('page') })
              // }
            })
          }
        }
        else {
          let ctrl = this.toast.create({
            message: data['msg'],
            duration: 2000,
            position: 'middle'
          });
          ctrl.present();
          this.msg = data['msg']
          loader.dismiss();
        }
      })
    }

    else {
      /*   console.log('error else');
        this.msg = "Errorr" */
      loader.dismiss();
    }




  }
  resend() {

    var newDateObj = new Date();
    newDateObj.setTime(newDateObj.getTime() + (1 * 60 * 1000));

    var secondBetweenTwoDate = Math.abs((new Date().getTime() - newDateObj.getTime()) / 1000);

    this.counter = secondBetweenTwoDate;
    this.countDown = Observable.timer(0, this.tick)
      .take(this.counter)
      .map(() => {
        this.data = this.counter
        this.cd.detectChanges();
        console.log('count : ' + this.counter)
        console.log(this.data)
        return --this.counter
      })


    let loader = this.load.create({
      // content: 'Please Wait',
      spinner: 'crescent',
    });
    loader.present();

    if (this.navParams.get('page') == 'old' || this.navParams.get('page') == 'directmobile') {
      console.log(this.navParams.get('page'));
      this.comman.generateotp(this.navParams.get('data'), '').then(data => {
        this.temp['sysotp'] = data['otp']
        this.temp['last_otp_expiry'] = data['expiry']
        loader.dismiss();
      })
    }

    if (this.navParams.get('page') == 'new') {
      console.log(this.navParams.get('page'));
      this.comman.generateotp(this.navParams.get('data')['mobile'], this.navParams.get('data')['email']).then(data => {

        this.temp['sysotp'] = data['otp']
        this.temp['last_otp_expiry'] = data['expiry']
        loader.dismiss();
      })
    }

  }
}
