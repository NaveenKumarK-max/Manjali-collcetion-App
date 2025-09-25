import { Component, ChangeDetectorRef } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController, AlertController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CommonProvider, BaseAPIURL } from '../../providers/common';
import { ResetPassPage } from '../reset-password/reset-password';
import { SchemedetailPage } from '../schemedetail/schemedetail';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import { PaymenthisPage } from '../paymenthis/paymenthis';
declare let cordova: any;

/**
 * Generated class for the PaymentotpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-paymentotp',
  templateUrl: 'paymentotp.html',
  providers: [CommonProvider]

})
export class PaymentotpPage {
  otptemp: any = { "sysotp": '', "last_otp_expiry": "", "userotp": "" };
  msg: any = '';
  page = this.navParams.get('page');
  postdata: any = '';
  exitmobile = this.navParams.get('mobile');
  countDown;
  counter = 0;
  tick = 1000;
  data: any = '';
  disable = false;

  all: any[] = [];
  net: any[] = [];
  temp: any[] = [];
  scard: any[] = [];

  total: any = this.navParams.get('total'); // for total used to Pay amt.
  //currency: any = '';
  status: any = false;
  payable: any = this.navParams.get('payable');
  details: any = this.navParams.get('detail');
  currentcussData: any = this.navParams.get('cusmobno');
  id_branch: any = null;
  branchlist: any;
  proceedPay: any = false;
  showCash: any = false;
  cardtype: any
  det: any = this.navParams.get('det');
  pay_mode: any = this.navParams.get('pay_mode');
  test : any[] = this.navParams.get('pay_arr');

  currency: any = { 'currency': { 'branch_settings': 0 } }

  constructor(public appCtrl: App, public viewCtrl: ViewController, public alertCtrl: AlertController, public ChangeDetectorRef: ChangeDetectorRef, private menu: MenuController, public toast: ToastController, public load: LoadingController, public comman: CommonProvider, public navCtrl: NavController, public navParams: NavParams) {

    console.log('paymode : ', this.pay_mode)
    console.log(this.total)
    console.log(this.payable)
    console.log(this.details)
    console.log(JSON.stringify(this.test));

/*     this.details.forEach((element, i) => {

      var index = 1;

      while (index <= element['sel_due']) {
        var test: any = Object.assign({}, element);

        // test['sel_due'] = 1;

        if (test.due_type == "AN" && test.sel_due > 1) {
          test.due_type = index == 1 ? "ND" : "AD";
        }
        else if (test.due_type == "AN" && test.sel_due == 1) {
          test.due_type = test.sel_due == 1 ? "ND" : "AD";
        } else {
          test.sel_due = test.due_type;
        }
        this.temp.push(test)
        index++;
      }
    });
    console.log(this.navParams.get('redm'));
    console.log(this.temp);

 */
    var newDateObj = new Date();
    newDateObj.setTime(newDateObj.getTime() + (1 * 60 * 1000));

    var secondBetweenTwoDate = Math.abs((new Date().getTime() - newDateObj.getTime()) / 1000);

    this.counter = secondBetweenTwoDate;
    this.countDown = Observable.timer(0, this.tick)
      .take(this.counter)
      .map(() => {
        this.data = this.counter
        this.ChangeDetectorRef.detectChanges();
        console.log('count : ' + this.counter)
        console.log(this.data)
        /*         if (this.data == 1) {
                  this.disable = true
                }else{
                  this.disable = false
                } */
        return --this.counter
      })

    if (this.navParams.get('page') == 'payment') {
      console.log(this.currentcussData['mobile']);
      this.comman.generateotp(this.currentcussData['mobile'], this.currentcussData['email']).then(data => {
        this.otptemp['sysotp'] = data['otp']
        this.otptemp['last_otp_expiry'] = data['expiry']
      })
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentotpPage');
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


  submit() {
    /*       let loader = this.load.create({
            content: 'Please Wait',
            spinner: 'dots',
          });
          loader.present(); */
    if (this.navParams.get('page') == 'payment') {

      this.comman.checkotp(this.otptemp).then(data => {
        if (data['is_valid']) {
          this.msg = '';

          if (this.navParams.get('page') == 'payment') {

           var my_Date = new Date(),
              n = my_Date.getTime();
            var pay: any = {};
            var currentUser = JSON.parse(localStorage.getItem('sssuser'));

          //  var test: any[] = [];
            console.log('cusdata : ', this.currentcussData);
            console.log('emp :', currentUser)
            console.log(this.currentcussData['firstname']);
            console.log(currentUser['employee']['id_employee'])
            console.log(this.id_branch);
            var payBranch = (this.currency['currency']['branch_settings'] == 0 ? currentUser['employee']['id_branch'] : this.id_branch)

            console.log(this.temp)
      /*        this.temp.forEach(element => {

              var acc_no = element.chit_number != null ? element.chit_number : "Not Allocated";

              if (element['gst_type'] == 0 && element['scheme_type'] == 0 || element['gst_type'] == 0 && element['scheme_type'] == 2 || element['gst_type'] == 0 && element['scheme_type'] == 3) {
                pay = {
                  'scheme_type': element.scheme_type,
                  'chit_number': element.code + "-" + acc_no,
                  'amount': element.payable,
                  'pay_amt': element.payable,
                  'max_amt': element.max_amount,
                  'min_amt': element.min_amount,
                  'udf1': element.id_scheme_account,
                  'udf2': "",

                  'udf3': element.metal_rate,
                  'udf4': element.payable,
                  'udf5': element.sel_due,
                  'charge': element.charge,
                  'charge_head': element.charge_head,
                  'due_type': element.due_type,
                  'discount': element.disamt,
                  'gst_amt': element.gstcalc,
                  'allowed_dues': element.allowed_dues,
                  'id_branch': element.id_branch
                };
                test.push(pay);
              }
              else if (element['gst_type'] == 1 && element['scheme_type'] == 0 || element['gst_type'] == 1 && element['scheme_type'] == 2 || element['gst_type'] == 1 && element['scheme_type'] == 3) {
                pay = {
                  'scheme_type': element.scheme_type,
                  'chit_number': element.code + "-" + acc_no,
                  'amount': parseInt(element.gstper) - parseInt(element.gstcalc),
                  'pay_amt': element.gstper,
                  'max_amt': element.max_amount,
                  'min_amt': element.min_amount,
                  'udf1': element.id_scheme_account,
                  'udf2': "",

                  'udf3': element.metal_rate,
                  'udf4': parseInt(element.gstper) - parseInt(element.gstcalc),
                  'udf5': element.sel_due,
                  'charge': element.charge,
                  'charge_head': element.charge_head,
                  'due_type': element.due_type,
                  'discount': element.disamt,
                  'gst_amt': element.gstcalc,
                  'allowed_dues': element.allowed_dues,
                  'id_branch': element.id_branch
                };
                test.push(pay);
              }

              else if (element['gst_type'] == 0 && element['scheme_type'] == 1) {
                pay = {
                  'scheme_type': element.scheme_type,
                  'chit_number': element.code + "-" + acc_no,
                  'amount': element.max_wgt_rate,
                  'pay_amt': element.max_wgt_rate,
                  'udf1': element.id_scheme_account,
                  'udf2': element.eligible_weight,

                  'udf3': element.metal_rate,
                  'udf4': element.max_wgt_rate,
                  'udf5': element.sel_due,
                  'charge': element.charge,
                  'charge_head': element.charge_head,
                  'due_type': element.due_type,
                  'discount': element.disamt,
                  'gst_amt': element.gstcalc,
                  'allowed_dues': element.allowed_dues,
                  'id_branch': element.id_branch
                };
                test.push(pay);

              }
              else if (element['gst_type'] == 1 && element['scheme_type'] == 1) {
                pay = {
                  'scheme_type': element.scheme_type,
                  'chit_number': element.code + "-" + acc_no,
                  'amount': parseInt(element.gstper) - parseInt(element.gstcalc),
                  'pay_amt': element.gstper,
                  'udf1': element.id_scheme_account,
                  'udf2': element.eligible_weight,

                  'udf3': element.metal_rate,
                  'udf4': parseInt(element.gstper) - parseInt(element.gstcalc),
                  'udf5': element.sel_due,
                  'charge': element.charge,
                  'charge_head': element.charge_head,
                  'due_type': element.due_type,
                  'discount': element.disamt,
                  'gst_amt': element.gstcalc,
                  'allowed_dues': element.allowed_dues,
                  'id_branch': element.id_branch
                };
                test.push(pay);
              }
              console.log(pay);
            });

            console.log(test);

            console.log(test);
            console.log(this.det)
            console.log(this.total)
            console.log(this.navParams.get('redm')) */
            console.log(this.total)
            let submiturl = BaseAPIURL + "paymt/mobile_payment?firstname=" + this.currentcussData['firstname'] + "&lastname=" + this.currentcussData['lastname'] + "&phone=" + this.currentcussData['mobile'] + "&id_branch=" + payBranch + "&amount=" + this.total + "&redeemed_amount=" + this.navParams.get('redm') + "&productinfo=" + undefined + "&email=" + this.currentcussData['email'] + "&id_employee=" + currentUser['employee']['id_employee'] + "&login_type=" + currentUser['employee']['login_type'] + "&pg=" + 'NB' + "&pay_mode=" + this.pay_mode + "&gateway=" + "0" + "&pg_code=" + "0" + "&pay_arr=" + encodeURIComponent(JSON.stringify(this.test)) + "&nocache=" + my_Date.getHours() + '' + my_Date.getMinutes() + '' + my_Date.getSeconds();;
            console.log('test' + JSON.stringify(this.test));
            console.log(submiturl);
            console.log(this.navParams.get('redm'));
            console.log(this.total)
            console.log(this.det['pg_code']);
            console.log(this.det['id_pg']);
            console.log(this.id_branch)
            var paymentWindow = window.open(submiturl, '_blank', 'location=no, clearsessioncache=yes');

            paymentWindow.addEventListener('loadstart', (event) => {

              if (event['url'] == BaseAPIURL + "adminapp/failed" || event['url'] == BaseAPIURL + "adminapp/failed") {
                paymentWindow.close();
                let alert = this.alertCtrl.create({
                  title: 'Sorry',
                  subTitle: 'Your transaction has been failed, Please try again',
                  //   buttons: ['Dismiss']
                  buttons: [
                    {
                      text: 'Dismiss',
                      role: 'cancel',
                      handler: () => {
                        console.log('Dismiss clicked');
                        this.navCtrl.setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });
                      }
                    }
                  ]
                });
                alert.present();
                /*        this.viewCtrl.dismiss();
                     //  this.appCtrl.getRootNav().setRoot(HomePage);
                     this.appCtrl.getRootNav().setRoot(PaymenthisPage); */
              }

              if (event['url'] == BaseAPIURL + "adminapp/cancel" || event['url'] == BaseAPIURL + "adminapp/cancel") {
                paymentWindow.close();
                let alert = this.alertCtrl.create({
                  title: 'Sorry',
                  subTitle: 'Your transaction has been cancelled, Please try again',
                  //  buttons: ['Dismiss']
                  buttons: [
                    {
                      text: 'Dismiss',
                      role: 'cancel',
                      handler: () => {
                        console.log('Dismiss clicked');
                        this.navCtrl.setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });
                      }
                    }
                  ]
                });
                alert.present();
                /*        this.viewCtrl.dismiss();
                    //   this.appCtrl.getRootNav().setRoot(HomePage);
                    this.appCtrl.getRootNav().setRoot(PaymenthisPage); */
              }
            });
            paymentWindow.addEventListener('loadstop', (event) => {

              console.log(event['url']);
              if (event['url'] == BaseAPIURL + "paymt/adminapp/success" || event['url'] == BaseAPIURL + "paymt/adminapp/success" || event['url'] == BaseAPIURL + "paymt/adminapp/success") {
                console.log(event['url']);
                console.log(event['url'] == BaseAPIURL + "paymt/adminapp/success");
                console.log(event['url'] == BaseAPIURL + "paymt/adminapp/success");
                paymentWindow.close();

                let alert = this.alertCtrl.create({
                  title: 'Success',
                  subTitle: 'Thanks for your payment with us.Your payment (sub. to realisation) is processed successfully.',
                  //  buttons: ['Dismiss']

                  buttons: [
                    {
                      text: 'Dismiss',
                      role: 'cancel',
                      handler: () => {
                        console.log('Dismiss clicked');
                        this.navCtrl.setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });
                      }
                    }
                  ]
                });
                alert.present();

                //  this.appCtrl.setRoot(PaymenthisPage);

                // this.appCtrl.getRootNav().setRoot(HomePage);
                /*     this.viewCtrl.dismiss().then(()=>{
                      this.appCtrl.getRootNav().setRoot(PaymenthisPage);
                  }); */
                //  this.appCtrl.getRootNav().setRoot(HomePage);


              }

              if (event['url'] == BaseAPIURL + "paymt/payment_rejected") {
                paymentWindow.close();

                let alert = this.alertCtrl.create({
                  title: 'Payment Rejected',
                  subTitle: 'Your payment has been rejected, please try again later ...',
                  //  buttons: ['Dismiss']
                  buttons: [
                    {
                      text: 'Dismiss',
                      role: 'cancel',
                      handler: () => {
                        console.log('Dismiss clicked');
                        this.navCtrl.setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });
                      }
                    }
                  ]
                });
                alert.present();
                /*   this.viewCtrl.dismiss();
                //  this.appCtrl.getRootNav().setRoot(HomePage);
                this.appCtrl.getRootNav().setRoot(PaymenthisPage); */
              }
            });
            paymentWindow.addEventListener('loaderror', (event) => {
              console.log('load error :' + JSON.stringify(event))
              paymentWindow.close();
              let alert = this.alertCtrl.create({
                title: 'Payment Under Process',
                //   buttons: ['Dismiss']
                buttons: [
                  {
                    text: 'Dismiss',
                    role: 'cancel',
                    handler: () => {
                      console.log('Dismiss clicked');
                      this.navCtrl.setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });
                    }
                  }
                ]
              });
              alert.present();
              /*      this.viewCtrl.dismiss();
                 //  this.appCtrl.getRootNav().setRoot(HomePage);
                 this.appCtrl.getRootNav().setRoot(PaymenthisPage); */
            });
            paymentWindow.addEventListener('exit', (event) => {
            });
            console.log(this.details);
            //   loader.dismiss();

          }
        }

        else {
          this.msg = data['msg']
          //    loader.dismiss();
        }
      });

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
        this.ChangeDetectorRef.detectChanges();
        console.log('count : ' + this.counter);
        console.log(this.data);
        /*         if (this.data == 1) {
                  this.disable = true
                }else{
                  this.disable = false
                } */
        return --this.counter
      })

    let loader = this.load.create({
    //  content: 'Please Wait',
      spinner: 'crescent',
    });
    loader.present();
    if (this.navParams.get('page') == 'payment') {
      console.log(this.currentcussData['mobile']);
      this.comman.generateotp(this.currentcussData['mobile'], this.currentcussData['email']).then(data => {
        this.otptemp['sysotp'] = data['otp']
        this.otptemp['last_otp_expiry'] = data['expiry']
      })
    }
    loader.dismiss();
  }

}
