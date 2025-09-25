import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, Events, LoadingController, AlertController, ViewController, App } from 'ionic-angular';
import { CommonProvider, BaseAPIURL } from '../../providers/common';
import { PaydetailmodalPage } from '../paydetailmodal/paydetailmodal';
import { CreditcardPage } from '../creditcard/creditcard';
import { NetbankPage } from '../netbank/netbank';
import { HomePage } from '../home/home';
import { PayduesPage } from '../paydues/paydues';
import { SavecardmodelPage } from '../savecardmodel/savecardmodel';
import { PaymenthisPage } from '../paymenthis/paymenthis';
import { PaymentotpPage } from '../paymentotp/paymentotp';
import { Storage } from '@ionic/storage';
declare let cordova: any;
declare var RazorpayCheckout: any;
declare let PgCordovaWrapper: any;
declare let CFPaymentGateway:any;

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
  providers: [CommonProvider]

})
export class PaymentPage {

  all: any[] = [];
  net: any[] = [];
  temp: any[] = [];
  scard: any[] = [];

  total: any = this.navParams.get('data'); // for total used to Pay amt.
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
  pay_mode: any
  companyName = JSON.parse(localStorage.getItem('company'))

  currency: any = { 'currency': { 'branch_settings': 0 } }

  checknet = localStorage.getItem('checknetwork');
  type: any = '';
  referenceNo: any = '';
  app_version = JSON.parse(localStorage.getItem('appVersion'));

  showstaticgateway: any= false;

  constructor(private storage: Storage, public appCtrl: App, public viewCtrl: ViewController, public alertCtrl: AlertController, public events: Events, public modal: ModalController, public comman: CommonProvider, public load: LoadingController, public toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {

    console.log(this.currentcussData , 'currentcussData')
    console.log(this.navParams.get('redm'))
    console.log(this.total);
    console.log(this.app_version)

    this.events.subscribe('checknetwork', (data) => {
      this.checknet = data;
      console.log(11111111111111111, data)
    });
    console.log('checkNet', this.checknet);

    let loader = this.load.create({
     // content: 'Please Wait',
      spinner: 'crescent',
    });
    loader.present();

    if (this.checknet == 'online') {
      let loader = this.load.create({
        // content: 'Please Wait',
         spinner: 'crescent',
         duration: 6000
       });
       loader.present();
       this.showstaticgateway = true;
      // offline

      this.comman.getcurrency(this.id_branch).then(data => {
        this.currency = data;
        console.log(this.currency['currency']['branch_settings'])
        this.comman.getallpayments().then(data => {
          this.showCash = true;
          this.all = data['pgData'];
          console.log(this.all);
          loader.dismiss();
        })
      })

      this.comman.getbranches().then(data => {
        this.branchlist = data;
        console.log(this.branchlist)
      })


    } else {
      this.showCash = true
      this.showstaticgateway= true
    }


    this.details.forEach((element, i) => {

      var index = 1;

      while (index <= element['sel_due']) {
        var test: any = Object.assign({}, element);
        if (test.due_type == "AN" && test.sel_due > 1) {
          console.log('if')
          test.due_type = index == 1 ? "ND" : "AD";
        }
        else if (test.due_type == "AN" && test.sel_due == 1) {
          console.log('elseif1')
          test.due_type = test.sel_due == 1 ? "ND" : "AD";
        }
        else if (test.due_type == "" && test.sel_due > 1) {
          console.log('elseif2')
          test.due_type = test.sel_due == 1 ? "ND" : "AD";
        }
        else if (test.due_type == "" && test.sel_due == 1) {
          console.log('elseif3')
          test.due_type = test.sel_due == 1 ? "ND" : "AD";
        }
        else {
          console.log('else')
          test.sel_due = test.due_type;
        }
        this.temp.push(test)
        index++;
      }
    });
    loader.dismiss();
    console.log(this.navParams.get('redm'));
    console.log(this.temp);
  }
  ionViewWillEnter() {
    let user = false;

    this.events.publish('user:created', user);

    localStorage.setItem('pay', 'true');
  }
  ionViewWillLeave() {
    localStorage.setItem('pay', 'false');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  tog(i, data) {
    console.log(data);
    console.log(i)
    var d = new Date(),
      n = d.getTime()
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));

    if (data['pg_code'] == 1) {
      console.log(data['pg_code']);
      if (this.status == false) {

        this.status = true;
      }
      else {
        this.status = false;

      }
    } else if (data == 4) {
      this.cashPayment(4, data);
    }
    else if (data == 5) {
      this.cashPayment(5, 'cc');  // credit card
    }
    else if (data == 6) {
      this.cashPayment(6, 'dc'); // // debit card
    }
    else if (data == 7) {
      this.cashPayment(7, 'nb'); // // NB
    }
    else if (data == 8) {
      this.cashPayment(8, 'upi'); // // upi
    }
    else {
      this.continuetech(data['pg_code'], data);
    }

  }
  pay() {

    let mod = this.modal.create(PaydetailmodalPage, { data: this.navParams.get('detail'), total: this.navParams.get('data') })
    mod.present();

  }
  credit(tit) {
    this.navCtrl.push(CreditcardPage, { redm: this.navParams.get('redm'), detail: this.temp, all: this.all, total: this.navParams.get('data'), data: this.navParams.get('detail'), title: tit })
    console.log(this.navParams.get('detail'));
    console.log(this.temp);
    console.log(this.all);
  }
  netbank(tit) {
    this.navCtrl.push(NetbankPage, { redm: this.navParams.get('redm'), detail: this.temp, total: this.navParams.get('data'), data: this.navParams.get('detail'), 'banks': this.net, title: tit, all: this.all })
    console.log(tit);
  }
  smodel(detail) {

    let mod = this.modal.create(SavecardmodelPage, { data: detail }, { enableBackdropDismiss: false })
    mod.present();
    mod.onDidDismiss(data => {
      console.log(data)
      if (data != null && data['details']['cvv'] != "") {
        this.continue(data);
        console.log(data)
      }
    });
  }
  continue(data) {
    var d = new Date(),
      n = d.getTime();
    var pay: any = {};
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));
    var test: any[] = [];

    console.log(this.temp)
    this.temp.forEach(element => {

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
          /* 'udf3': this.currency['metal_rates']['goldrate_22ct'], */
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
          /* 'udf3': this.currency['metal_rates']['goldrate_22ct'], */
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
          /* 'udf3': this.currency['metal_rates']['goldrate_22ct'], */
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
          /* 'udf3': this.currency['metal_rates']['goldrate_22ct'], */
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

    console.log(test)

    let submiturl = BaseAPIURL + "paymt/mobile_payment?firstname=" + currentUser['customer'].firstname + "&lastname=" + currentUser['customer'].lastname + "&phone=" + currentUser.mobile + "&id_employee=" + currentUser['employee']['id_employee'] + "&login_type=" + currentUser['employee']['login_type'] + "&id_branch=" + currentUser['customer'].id_branch + "&amount=" + this.total + "&redeemed_amount=" + this.navParams.get('redm') + "&productinfo=" + '' + "&email=" + currentUser['customer'].email + "&pg=" + data.details.d['card_mode'] + "&bankcode=" + data.details.d['card_mode'] + "&card_token=" + data.details.d['card_token'] + "&ccnum=" + data.details.d['card_no'] + "&ccname=" + data.details.d['card_name'] + "&ccvv=" + data.details['cvv'] + "&ccexpmon=" + data.details.d['expiry_month'] + "&ccexpyr=" + data.details.d['expiry_year'] + "&gateway=" + 1 + "&pay_arr=" + encodeURIComponent(JSON.stringify(test)) + "&nocache=" + n;

    console.log(submiturl)
    console.log(this.total)
    var paymentWindow = window.open(submiturl, '_blank', 'location=no, clearsessioncache=yes');

    paymentWindow.addEventListener('loadstart', (event) => {
      console.log(event)
      if (event['url'] == BaseAPIURL + "paymt/failureMURL") {
        paymentWindow.close();

        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: 'Your transaction has been failed, Please try again',
          buttons: ['Dismiss']

        });
        alert.present();
        this.viewCtrl.dismiss();
        this.appCtrl.getRootNav().setRoot(HomePage);

      }

      if (event['url'] == BaseAPIURL + "paymt/cancelMURL") {
        paymentWindow.close();

        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: 'Your transaction has been cancelled, Please try again',
          buttons: ['Dismiss']

        });
        alert.present();
        this.viewCtrl.dismiss();
        this.appCtrl.getRootNav().setRoot(HomePage);

      }
    });
    paymentWindow.addEventListener('loadstop', (event) => {
      if (event['url'] == BaseAPIURL + "paymt/successMURL") {
        paymentWindow.close();

        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Thanks for your payment with us.Your payment (sub. to realisation) is processed successfully.',
          buttons: ['Dismiss']

        });
        alert.present();
        //     this.appCtrl.getRootNav().setRoot(HomePage);
        this.viewCtrl.dismiss();
        this.appCtrl.getRootNav().setRoot(HomePage);

      }

      if (event['url'] == BaseAPIURL + "paymt/payment_rejected") {
        paymentWindow.close();

        let alert = this.alertCtrl.create({
          title: 'Payment Rejected',
          subTitle: 'Your payment has been rejected, please try again later ...',
          buttons: ['Dismiss']
        });
        alert.present();
        this.viewCtrl.dismiss();
        this.appCtrl.getRootNav().setRoot(HomePage);
      }
    });
    paymentWindow.addEventListener('loaderror', (event) => {
      console.log(JSON.stringify(event))
      paymentWindow.close();

      let alert = this.alertCtrl.create({
        title: 'Payment Under Process',
        buttons: ['Dismiss']

      });
      alert.present();
      this.viewCtrl.dismiss();
      this.appCtrl.getRootNav().setRoot(HomePage);
    });
    paymentWindow.addEventListener('exit', (event) => {
    });

  }
  continuetech(i, det) {

    console.log(det)
    var my_Date = new Date(),
      n = my_Date.getTime();
    var pay: any = {};
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));
    var test: any[] = [];
    console.log('cusdata : ', this.currentcussData);
    console.log('emp :', currentUser);
    console.log(this.currentcussData['firstname']);
    console.log(currentUser['employee']['id_employee']);
    console.log(this.id_branch);

    var payBranch = (this.currency['currency']['branch_settings'] == 0 ? currentUser['employee']['id_branch'] : this.id_branch)
    console.log(payBranch);
    console.log(this.temp);
    this.temp.forEach(element => {

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
          /* 'udf3': this.currency['metal_rates']['goldrate_22ct'], */
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
          /* 'udf3': this.currency['metal_rates']['goldrate_22ct'], */
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
          /* 'udf3': this.currency['metal_rates']['goldrate_22ct'], */
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
          /* 'udf3': this.currency['metal_rates']['goldrate_22ct'], */
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
/*     if (det['pg_code'] == 4) {
      console.log(test);
      console.log(det)
      console.log(this.total)
      console.log(this.navParams.get('redm'))
      let loader = this.load.create({
       // content: 'Please Wait',
        spinner: 'crescent',
      });
      loader.present();
      this.comman.mobileCF_payment(test, det, this.total, this.navParams.get('redm'), this.currentcussData, payBranch).then(res => {
        console.log(res['params']);
        // let submiturl = BaseAPIURL + "paymt/mobile_payment?firstname=" + currentUser['customer'].firstname + "&lastname=" + currentUser['customer'].lastname + "&phone=" + currentUser.mobile + "&id_branch=" + currentUser['customer'].id_branch + "&amount=" + this.total + "&redeemed_amount=" + this.navParams.get('redm') + "&productinfo=" + undefined + "&email=" + currentUser['customer'].email + "&pg=" + 'NB' + "&gateway=" + det['id_pg'] + "&pg_code=" + det['pg_code'] + "&pay_arr=" + encodeURIComponent(JSON.stringify(test)) + "&nocache=" + my_Date.getHours() + '' + my_Date.getMinutes() + '' + my_Date.getSeconds();;
        const params = {
          appId: res['params']['appId'],
          orderId: res['params']['orderId'],
          orderCurrency: res['params']['orderCurrency'],
          orderAmount: res['params']['orderAmount'],
          orderNote: res['params']['orderNote'],
          customerName: res['params']['customerName'],
          customerPhone: res['params']['customerPhone'],
          customerEmail: res['params']['customerEmail'],
          // eslint-disable-next-line max-len
          tokenData: res['params']['tokenData'],
          stage: res['params']['stage']
        };
        console.log(res)
        console.log(params)
        cordova.exec((success) => {
          console.log(JSON.parse(success))
          let cf_result = JSON.parse(success);
          this.comman.mobileCF_status(cf_result).then(res => {
            loader.dismiss();
            let alert = this.alertCtrl.create({
              title: res.title,
              subTitle: res.msg,
              buttons: ['Dismiss']
            });
            alert.present();
            this.appCtrl.getRootNav().setRoot(HomePage);
          })
        },  //Success callback
          (error) => {
            console.log(error)
            console.log(error.message);
          }, // Error Callback
          'PgCordovaWrapper',
          'startPaymentWEB',
          [params]);
      });
    } */
    if (det['pg_code'] == 4) {   //  cash free
      console.log(test);
      console.log(det)
      console.log(this.total)
      console.log(this.navParams.get('redm'))
      let loader = this.load.create({
        // content: 'Please Wait',
        spinner: 'crescent',
      });
      loader.present();

      this.comman.mobileCF_payment(test, det, this.total, this.navParams.get('redm'), this.currentcussData, payBranch).then(res => {
        console.log(res['params']);
        const params = {
          appId: res['params']['appId'],
          orderId: res['params']['orderId'],
          orderCurrency: res['params']['orderCurrency'],
          orderAmount: res['params']['orderAmount'],
          orderNote: res['params']['orderNote'],
          customerName: res['params']['customerName'],
          customerPhone: res['params']['customerPhone'],
          customerEmail: res['params']['customerEmail'],
          tokenData: res['params']['tokenData'],
          stage: res['params']['stage'],
          notifyUrl: res['params']['notifyUrl']
        };
        var that = this;
        // PgCordovaWrapper.startPaymentWEB(params,
        //   function (success) {
        //     //Success callback
        //     console.log(JSON.parse(success))
        //     // res['status'] = JSON.parse(success).txStatus
        //     // res['orderId'] = JSON.parse(success).orderId;
        //     // res['wholedata'] = JSON.parse(success);
        //     let cf_result = JSON.parse(success);
        //     that.comman.mobileCF_status(cf_result).then(res => {
        //       console.log('result :', res)
        //       loader.dismiss();
        //       let alert = that.alertCtrl.create({
        //         title: res.title,
        //         subTitle: res.msg,
        //         buttons: ['Dismiss']
        //       });
        //       alert.present();
        //       that.appCtrl.getRootNav().setRoot(HomePage);
        //     })
        //   },
        //   function (error) {
        //     //Error callback
        //     console.log(error)
        //     console.log(error.message);
        //   });


        var that = this;
        const callbacks = {
          onVerify: function (result) {
                       let details = {
               "orderID": result.orderID
             }
            console.log(JSON.stringify(result));

            that.comman.mobileCF_status(result).then(res => {
              console.log('result :', res)
              loader.dismiss();
              let alert = that.alertCtrl.create({
                title: res.title,
                subTitle: res.msg,
                buttons: ['Dismiss']
              });
              alert.present();
              loader.dismiss();
              that.viewCtrl.dismiss();
              that.events.publish('homerefresh', 1);
            })

          },
          onError: function (error) {
            console.log('err : ',error);

            let errorObj = {
              "orderID": error.orderID,
              "status": error.status,
              "code": error.code,
              "type": error.type,
              "message": error.message
            }
            console.log(errorObj);

            that.comman.mobileCF_status(error).then(res => {
              console.log('result :', res)
              loader.dismiss();
              let alert = that.alertCtrl.create({
                title: res.title,
                subTitle: res.msg,
                buttons: ['Dismiss']
              });
              alert.present();
              loader.dismiss();
              that.viewCtrl.dismiss();
              that.appCtrl.getRootNav().setRoot(HomePage);
              that.events.publish('homerefresh', 1);

            })
          }
        }
        CFPaymentGateway.setCallback(callbacks)

        CFPaymentGateway.doWebCheckoutPayment({
          "theme": {
            "navigationBarBackgroundColor": "#E64A19",
            "navigationBarTextColor": "#FFFFFF"
          },
          "session": {
            "payment_session_id": res['response']['payment_session_id'],
            "orderID": res['response']['order_id'],
            "environment": res.environment
          }
        })




      });

    }
    else {
      let submiturl = BaseAPIURL + "paymt/mobile_payment?firstname=" + this.currentcussData['firstname'] + "&lastname=" + this.currentcussData['firstname'] + "&phone=" + this.currentcussData['mobile'] + "&id_branch=" + payBranch + "&amount=" + this.total + "&redeemed_amount=" + this.navParams.get('redm') + "&productinfo=" + undefined + "&email=" + this.currentcussData['email'] + "&pg=" + 'NB' + "&gateway=" + det['id_pg'] + "&pg_code=" + det['pg_code'] + "&pay_arr=" + encodeURIComponent(JSON.stringify(test)) + "&nocache=" + my_Date.getHours() + '' + my_Date.getMinutes() + '' + my_Date.getSeconds();;
      console.log('test' + JSON.stringify(test));
      console.log(submiturl);
      console.log(this.navParams.get('redm'));
      console.log(this.total)
      console.log(det['pg_code']);
      console.log(det['id_pg']);
      var paymentWindow = window.open(submiturl, '_blank', 'location=no, clearsessioncache=yes');

      paymentWindow.addEventListener('loadstart', (event) => {

        if (event['url'] == BaseAPIURL + "paymt/hdfcRedirect/failed" || event['url'] == BaseAPIURL + "paymt/failureMURL") {
          paymentWindow.close();


          let alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: 'Your transaction has been failed, Please try again',
            buttons: ['Dismiss']

          });
          alert.present();
          this.viewCtrl.dismiss();
          this.appCtrl.getRootNav().setRoot(HomePage);

        }

        if (event['url'] == BaseAPIURL + "paymt/hdfcRedirect/cancel" || event['url'] == BaseAPIURL + "paymt/cancelMURL") {
          paymentWindow.close();

          let alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: 'Your transaction has been cancelled, Please try again',
            buttons: ['Dismiss']

          });
          alert.present();
          this.viewCtrl.dismiss();
          this.appCtrl.getRootNav().setRoot(HomePage);

        }
      });
      paymentWindow.addEventListener('loadstop', (event) => {

        console.log(event['url']);
        if (event['url'] == BaseAPIURL + "paymt/hdfcRedirect/success" || event['url'] == BaseAPIURL + "paymt/hdfcRedirect/complete" || event['url'] == BaseAPIURL + "paymt/successMURL") {
          console.log(event['url']);
          console.log(event['url'] == BaseAPIURL + "paymt/hdfcRedirect/success")
          console.log(event['url'] == BaseAPIURL + "paymt/hdfcRedirect/complete");
          paymentWindow.close();

          let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Thanks for your payment with us.Your payment (sub. to realisation) is processed successfully.',
            buttons: ['Dismiss']

          });
          alert.present();

          // this.appCtrl.getRootNav().setRoot(HomePage);
          this.viewCtrl.dismiss();
          this.appCtrl.getRootNav().setRoot(HomePage);

        }

        if (event['url'] == BaseAPIURL + "paymt/payment_rejected") {
          paymentWindow.close();

          let alert = this.alertCtrl.create({
            title: 'Payment Rejected',
            subTitle: 'Your payment has been rejected, please try again later ...',
            buttons: ['Dismiss']
          });
          alert.present();
          this.viewCtrl.dismiss();
          this.appCtrl.getRootNav().setRoot(HomePage);
        }
      });
      paymentWindow.addEventListener('loaderror', (event) => {
        console.log('load error :' + JSON.stringify(event))
        paymentWindow.close();
        let alert = this.alertCtrl.create({
          title: 'Payment Under Process',
          buttons: ['Dismiss']
        });
        alert.present();
        this.viewCtrl.dismiss();
        this.appCtrl.getRootNav().setRoot(HomePage);
      });
      paymentWindow.addEventListener('exit', (event) => {
      });
      console.log(this.details);
    }
  }

  cashPayment(i, det) {
    if (i == 4) {
      this.pay_mode = 'CSH'
      this.referenceNo = ''
      this.cardtype = "Cash"
    } else if (det == 'cc') {
      this.cardtype = "Credit Card"
      this.pay_mode = 'CC'
      console.log(this.pay_mode)
    } else if (det == 'dc') {
      this.cardtype = 'Debit Card'
      this.pay_mode = 'DC'
      console.log(this.pay_mode)
    } else if (det == 'nb') {
      this.cardtype = 'Net Banking'
      this.pay_mode = 'NB'
      console.log(this.pay_mode)
    } else if (det == 'upi') {
      this.cardtype = 'UPI Payment'
      this.pay_mode = 'UPI'
      console.log(this.pay_mode)
    }

    if (this.checknet == 'offline') {
      // offline

      console.log(i, det)
      console.log(this.currency['currency']['payment_otp_required'])

      let confirm = this.alertCtrl.create({
        title: 'Confirm to Pay '+' '+ this.cardtype,
        subTitle: 'Are you sure? Do you want to Pay '+' '+ this.cardtype,
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');

              var my_Date = new Date(),
                n = my_Date.getTime();
              var pay: any = {};
              var currentUser = JSON.parse(localStorage.getItem('sssuser'));
              var test: any[] = [];
              console.log('cusdata : ', this.currentcussData);
              console.log('emp :', currentUser)
              console.log(this.currentcussData['firstname']);
              console.log(currentUser['employee']['id_employee'])
              console.log(this.id_branch);
              var payBranch = (this.currency['currency']['branch_settings'] == 0 ? currentUser['employee']['id_branch'] : this.id_branch)
              console.log(this.temp)
              this.temp.forEach(element => {
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
                    //   'udf3': this.currency['metal_rates']['goldrate_22ct'],
                    'udf3': element.metal_rate,
                    'udf4': element.payable,
                    'udf5': element.sel_due,
                    'charge': element.charge,
                    'charge_head': element.charge_head,
                    'due_type': element.due_type,
                    'discount': element.disamt,
                    'gst_amt': element.gstcalc,
                    'allowed_dues': element.allowed_dues,
                    'id_branch': element.id_branch,
                    'mobile': this.currentcussData['mobile'],
                    'firstname': this.currentcussData['firstname'],
                    'paid_installments': parseInt(element.paid_installments) + 1,
                    'current_date': element.current_date,
                    "is_new": element.hasOwnProperty('is_new') ? element.is_new : "N",
                    "id_scheme": element.id_scheme,
                    'id_customer': element.id_customer,
                    "group_code": element.code,
                    'account_name': element.account_name,
                    'refernceNo': this.referenceNo,
                    'pay_mode': this.pay_mode


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
                    //'udf3': this.currency['metal_rates']['goldrate_22ct'],
                    'udf3': element.metal_rate,
                    'udf4': parseInt(element.gstper) - parseInt(element.gstcalc),
                    'udf5': element.sel_due,
                    'charge': element.charge,
                    'charge_head': element.charge_head,
                    'due_type': element.due_type,
                    'discount': element.disamt,
                    'gst_amt': element.gstcalc,
                    'allowed_dues': element.allowed_dues,
                    'id_branch': element.id_branch,
                    'mobile': this.currentcussData['mobile'],
                    'firstname': this.currentcussData['firstname'],
                    'paid_installments': parseInt(element.paid_installments) + 1,
                    'current_date': element.current_date,
                    "is_new": element.hasOwnProperty('is_new') ? element.is_new : "N",
                    "id_scheme": element.id_scheme,
                    'id_customer': element.id_customer,
                    "group_code": element.code,
                    'account_name': element.account_name,
                    'refernceNo': this.referenceNo,
                    'pay_mode': this.pay_mode

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
                    //'udf3': this.currency['metal_rates']['goldrate_22ct'],
                    'udf3': element.metal_rate,
                    'udf4': element.max_wgt_rate,
                    'udf5': element.sel_due,
                    'charge': element.charge,
                    'charge_head': element.charge_head,
                    'due_type': element.due_type,
                    'discount': element.disamt,
                    'gst_amt': element.gstcalc,
                    'allowed_dues': element.allowed_dues,
                    'id_branch': element.id_branch,
                    'mobile': this.currentcussData['mobile'],
                    'firstname': this.currentcussData['firstname'],
                    'paid_installments': parseInt(element.paid_installments) + 1,
                    'current_date': element.current_date,
                    "is_new": element.hasOwnProperty('is_new') ? element.is_new : "N",
                    "id_scheme": element.id_scheme,
                    'id_customer': element.id_customer,
                    "group_code": element.code,
                    'account_name': element.account_name,
                    'refernceNo': this.referenceNo,
                    'pay_mode': this.pay_mode

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
                    //'udf3': this.currency['metal_rates']['goldrate_22ct'],
                    'udf3': element.metal_rate,
                    'udf4': parseInt(element.gstper) - parseInt(element.gstcalc),
                    'udf5': element.sel_due,
                    'charge': element.charge,
                    'charge_head': element.charge_head,
                    'due_type': element.due_type,
                    'discount': element.disamt,
                    'gst_amt': element.gstcalc,
                    'allowed_dues': element.allowed_dues,
                    'id_branch': element.id_branch,
                    'mobile': this.currentcussData['mobile'],
                    'firstname': this.currentcussData['firstname'],
                    'paid_installments': parseInt(element.paid_installments) + 1,
                    'current_date': element.current_date,
                    "is_new": element.hasOwnProperty('is_new') ? element.is_new : "N",
                    "id_scheme": element.id_scheme,
                    'id_customer': element.id_customer,
                    "group_code": element.code,
                    'account_name': element.account_name,
                    'refernceNo': this.referenceNo,
                    'pay_mode': this.pay_mode

                  };
                  test.push(pay);
                }
                console.log(pay);
              });

              console.log(test)
              var whole: any = '';

              this.storage.get('onlineSetData').then((val) => {
                whole = JSON.parse(val);
                test.forEach(element => {
                  if (val != null) {
                    console.log(whole)
                    let ind = JSON.parse(val)['customer'].findIndex(data => data['mobile'] == element['mobile'])
                    console.log(ind)
                    let ind1 = JSON.parse(val)['customer'][ind]['payments']['chits'].findIndex(data => data['current_date'] == element['current_date'])
                    console.log(ind1)
                    console.log(element['current_date'])
                    console.log(element['paid_installments'])
                    whole['customer'][ind]['payments']['chits'][ind1]['paid_installments'] = element['paid_installments'];
                    console.log(whole['customer'][ind]['payments']['chits'][ind1]['paid_installments'])
                    this.storage.set('onlineSetData', JSON.stringify(whole)).then((val) => {
                      console.log(62873628736, JSON.parse(val)['customer'])
                    });

                  }
                });
              });


              console.log(test);

              console.log(test);
              console.log(det)
              console.log(this.total)
              console.log(this.navParams.get('redm'))
              var temp: any[] = [];
              this.storage.get('settledPayment').then((val) => {
                console.log(val)
                if (val != null) {
                  console.log(1234)
                  test.forEach(element => {
                    temp.push(element);
                  });
                  JSON.parse(val).forEach(element => {
                    temp.push(element);
                  });
                  this.storage.set('settledPayment', JSON.stringify(temp));
                  console.log(999, temp)
                  console.log(JSON.parse(localStorage.getItem('settledPayment')));
                  var historyData: any[] = []
                  temp.forEach(element => {
                    const num = element.pay_amt;
                    const wordify = (num) => {
                      const single = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
                      const double = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
                      const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
                      const formatTenth = (digit, prev) => {
                        return 0 == digit ? "" : " " + (1 == digit ? double[prev] : tens[digit])
                      };
                      const formatOther = (digit, next, denom) => {
                        return (0 != digit && 1 != next ? " " + single[digit] : "") + (0 != next || digit > 0 ? " " + denom : "")
                      };
                      let res = "";
                      let index = 0;
                      let digit = 0;
                      let next = 0;
                      let words = [];
                      if (num += "", isNaN(parseInt(num))) {
                        res = "";
                      }
                      else if (parseInt(num) > 0 && num.length <= 10) {
                        for (index = num.length - 1; index >= 0; index--) switch (digit = num[index] - 0, next = index > 0 ? num[index - 1] - 0 : 0, num.length - index - 1) {
                          case 0:
                            words.push(formatOther(digit, next, ""));
                            break;
                          case 1:
                            words.push(formatTenth(digit, num[index + 1]));
                            break;
                          case 2:
                            words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] && 0 != num[index + 2] ? " and" : "") : "");
                            break;
                          case 3:
                            words.push(formatOther(digit, next, "Thousand"));
                            break;
                          case 4:
                            words.push(formatTenth(digit, num[index + 1]));
                            break;
                          case 5:
                            words.push(formatOther(digit, next, "Lakh"));
                            break;
                          case 6:
                            words.push(formatTenth(digit, num[index + 1]));
                            break;
                          case 7:
                            words.push(formatOther(digit, next, "Crore"));
                            break;
                          case 8:
                            words.push(formatTenth(digit, num[index + 1]));
                            break;
                          case 9:
                            words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] || 0 != num[index + 2] ? " and" : " Crore") : "")
                        };
                        res = words.reverse().join("")
                      } else res = "";
                      return res
                    };
                    console.log(wordify(num));
                    var pay_printable: any = `${"\t\u001bE\u0001   Logimax\u001bE\u0001\r\n\t\u001bE\u0001 " + "103, 183/184, Subramaniam Road\u001bE\u0001\r\n\t\u001bE\u0001 " + " NAC - 641002\u001bE\u0001\r\n\r\n\t \u001bE\u0001 DAILY MONTLY GOLD SAVING\u001bE\u0001 \r\n================================================\r\n\tA/C No." + element.chit_number + "\r\n\tPAID MODE" + element['pay_mode'] + "\r\n\t" + "PAID WGT" + element.udf3 + "\r\n\tMOBILE " + element['mobile'] + "\r\n\tGOLD RATE " + element.udf2 + "\r\n\t" + "TOTAL WGT" + element.udf3 + "\r\n================================================\r\n\u001bE\u0001Received with thanks form\u001bE\u0001\r\n\u001bE\u0001" + element['firstname'] + "\u001bE\u0001\r\n\u001bE\u0001\r\nINR \u001bE\u0001" + element.pay_amt + "\u001bE\u0001\r\n\u001bE\u0001" + wordify(num) + "\u001bE\u0001\r\nFor \u001bE\u0001" + this.companyName + "\u001bE\u0001\r\n\u001bE\u0001\r\n\t               Signature\r\n"}`
                    var temphis = {
                      scheme_acc_number: element.chit_number,
                      payment_status: "Success",
                      metal_rate: element.udf3,
                      metal_weight: element.udf2,
                      branch_name: "NAC",
                      payment_amount: element.pay_amt,
                      date_payment: new Date().toISOString().split('T')[0],
                      pay_printable: pay_printable,
                      allow_print: 1,
                      id_transaction: new Date().getTime(),
                      'mobile': element['mobile'],
                      'firstname': element['firstname'],
                      payment_type: element['pay_mode']
                    }
                    historyData.push(temphis);
                    console.log(historyData);
                  })
                  this.storage.set('paymentHistoryData', JSON.stringify(historyData));
                  console.log(JSON.parse(localStorage.getItem('paymentHistoryData')));
                  this.storage.get('paymentHistoryData').then((val) => {
                    console.log('paymentHistoryData : ', val);
                  });

                  this.storage.get('settledPayment').then((val) => {
                    console.log('settledPayment : ', val);
                    let alert = this.alertCtrl.create({
                      title: 'Success',
                      subTitle: 'Thanks for your payment with us.Your payment (sub. to realisation) is processed successfully.',
                      buttons: ['Dismiss']
                    });
                    alert.present();
                    this.viewCtrl.dismiss();
                    this.navCtrl.setRoot(PaymenthisPage, { cusmobno: { 'mobile': this.currentcussData['mobile'] } });
                  });
                } else {
                  console.log(7894)
                  temp = test;
                  this.storage.set('settledPayment', JSON.stringify(test));
                  console.log(JSON.parse(localStorage.getItem('settledPayment')));
                  var historyData: any[] = []
                  temp.forEach(element => {
                    const num = element.pay_amt;
                    const wordify = (num) => {
                      const single = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
                      const double = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
                      const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
                      const formatTenth = (digit, prev) => {
                        return 0 == digit ? "" : " " + (1 == digit ? double[prev] : tens[digit])
                      };
                      const formatOther = (digit, next, denom) => {
                        return (0 != digit && 1 != next ? " " + single[digit] : "") + (0 != next || digit > 0 ? " " + denom : "")
                      };
                      let res = "";
                      let index = 0;
                      let digit = 0;
                      let next = 0;
                      let words = [];
                      if (num += "", isNaN(parseInt(num))) {
                        res = "";
                      }
                      else if (parseInt(num) > 0 && num.length <= 10) {
                        for (index = num.length - 1; index >= 0; index--) switch (digit = num[index] - 0, next = index > 0 ? num[index - 1] - 0 : 0, num.length - index - 1) {
                          case 0:
                            words.push(formatOther(digit, next, ""));
                            break;
                          case 1:
                            words.push(formatTenth(digit, num[index + 1]));
                            break;
                          case 2:
                            words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] && 0 != num[index + 2] ? " and" : "") : "");
                            break;
                          case 3:
                            words.push(formatOther(digit, next, "Thousand"));
                            break;
                          case 4:
                            words.push(formatTenth(digit, num[index + 1]));
                            break;
                          case 5:
                            words.push(formatOther(digit, next, "Lakh"));
                            break;
                          case 6:
                            words.push(formatTenth(digit, num[index + 1]));
                            break;
                          case 7:
                            words.push(formatOther(digit, next, "Crore"));
                            break;
                          case 8:
                            words.push(formatTenth(digit, num[index + 1]));
                            break;
                          case 9:
                            words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] || 0 != num[index + 2] ? " and" : " Crore") : "")
                        };
                        res = words.reverse().join("")
                      } else res = "";
                      return res
                    };
                    console.log(wordify(num));
                    var pay_printable: any = `${"\t\u001bE\u0001   Logimax\u001bE\u0001\r\n\t\u001bE\u0001 " + "103, 183/184, Subramaniam Road\u001bE\u0001\r\n\t\u001bE\u0001 " + " NAC - 641002\u001bE\u0001\r\n\r\n\t \u001bE\u0001 DAILY MONTLY GOLD SAVING\u001bE\u0001 \r\n================================================\r\n\tA/C No." + element.chit_number + "\r\n\tPAID MODE" + element['pay_mode'] + "\r\n\t" + "PAID WGT" + element.udf3 + "\r\n\tMOBILE " + element['mobile'] + "\r\n\tGOLD RATE " + element.udf2 + "\r\n\t" + "TOTAL WGT" + element.udf3 + "\r\n================================================\r\n\u001bE\u0001Received with thanks form\u001bE\u0001\r\n\u001bE\u0001" + element['firstname'] + "\u001bE\u0001\r\n\u001bE\u0001\r\nINR \u001bE\u0001" + element.pay_amt + "\u001bE\u0001\r\n\u001bE\u0001" + wordify(num) + "\u001bE\u0001\r\nFor \u001bE\u0001" + this.companyName + "\u001bE\u0001\r\n\u001bE\u0001\r\n\t                 Signature\r\n"}`
                    var temphis = {
                      scheme_acc_number: element.chit_number,
                      payment_status: "Success",
                      metal_rate: element.udf3,
                      metal_weight: element.udf2,
                      branch_name: "NAC",
                      payment_amount: element.pay_amt,
                      date_payment: new Date().toISOString().split('T')[0],
                      pay_printable: pay_printable,
                      allow_print: 1,
                      id_transaction: new Date().getTime(),
                      'mobile': element['mobile'],
                      'firstname': element['firstname'],
                      payment_type: element['pay_mode']
                    }
                    historyData.push(temphis);
                    console.log(historyData);
                  })
                  this.storage.set('paymentHistoryData', JSON.stringify(historyData));
                  console.log(JSON.parse(localStorage.getItem('paymentHistoryData')));

                  this.storage.get('paymentHistoryData').then((val) => {
                    console.log('paymentHistoryData : ', val);
                  });

                  this.storage.get('settledPayment').then((val) => {
                    console.log('settledPayment : ', val);
                    let alert = this.alertCtrl.create({
                      title: 'Success',
                      subTitle: 'Thanks for your payment with us.Your payment (sub. to realisation) is processed successfully.',
                      buttons: ['Dismiss']

                    });
                    alert.present();
                    this.viewCtrl.dismiss();
                    this.navCtrl.setRoot(PaymenthisPage, { cusmobno: { 'mobile': this.currentcussData['mobile'] } });
                  });
                }
              })
            }
          }
        ]
      });
      confirm.present();
    } else {

      // online Data

      console.log(i, det)
      console.log(this.currency['currency']['payment_otp_required'])

      let confirm = this.alertCtrl.create({
        title: 'Confirm to Pay'+' '+ this.cardtype,
        subTitle: 'Are you sure? Do you want to Pay'+' '+ this.cardtype,
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');

              var my_Date = new Date(),
                n = my_Date.getTime();
              var pay: any = {};
              var currentUser = JSON.parse(localStorage.getItem('sssuser'));

              var test: any[] = [];
              console.log('cusdata : ', this.currentcussData);
              console.log('emp :', currentUser)
              console.log(this.currentcussData['firstname']);
              console.log(currentUser['employee']['id_employee'])
              console.log(this.id_branch);
              var payBranch = (this.currency['currency']['branch_settings'] == 0 ? currentUser['employee']['id_branch'] : this.id_branch)

              console.log(this.temp)
              this.temp.forEach(element => {

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
                    //   'udf3': this.currency['metal_rates']['goldrate_22ct'],
                    'udf3': element.metal_rate,
                    'udf4': element.payable,
                    'udf5': element.sel_due,
                    'charge': element.charge,
                    'charge_head': element.charge_head,
                    'due_type': element.due_type,
                    'discount': element.disamt,
                    'gst_amt': element.gstcalc,
                    'allowed_dues': element.allowed_dues,
                    'id_branch': element.id_branch,
                    'refernceNo': this.referenceNo,
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
                    //'udf3': this.currency['metal_rates']['goldrate_22ct'],
                    'udf3': element.metal_rate,
                    'udf4': parseInt(element.gstper) - parseInt(element.gstcalc),
                    'udf5': element.sel_due,
                    'charge': element.charge,
                    'charge_head': element.charge_head,
                    'due_type': element.due_type,
                    'discount': element.disamt,
                    'gst_amt': element.gstcalc,
                    'allowed_dues': element.allowed_dues,
                    'id_branch': element.id_branch,
                    'refernceNo': this.referenceNo,
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
                    //'udf3': this.currency['metal_rates']['goldrate_22ct'],
                    'udf3': element.metal_rate,
                    'udf4': element.max_wgt_rate,
                    'udf5': element.sel_due,
                    'charge': element.charge,
                    'charge_head': element.charge_head,
                    'due_type': element.due_type,
                    'discount': element.disamt,
                    'gst_amt': element.gstcalc,
                    'allowed_dues': element.allowed_dues,
                    'id_branch': element.id_branch,
                    'refernceNo': this.referenceNo,
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
                    //'udf3': this.currency['metal_rates']['goldrate_22ct'],
                    'udf3': element.metal_rate,
                    'udf4': parseInt(element.gstper) - parseInt(element.gstcalc),
                    'udf5': element.sel_due,
                    'charge': element.charge,
                    'charge_head': element.charge_head,
                    'due_type': element.due_type,
                    'discount': element.disamt,
                    'gst_amt': element.gstcalc,
                    'allowed_dues': element.allowed_dues,
                    'id_branch': element.id_branch,
                    'refernceNo': this.referenceNo,
                  };
                  test.push(pay);
                }
                console.log(pay);
              });

              console.log(test);

              console.log(test);
              console.log(det)
              console.log(this.total)
              console.log(this.navParams.get('redm'))

              if (this.currency['currency']['payment_otp_required'] == 1) {
                this.navCtrl.push(PaymentotpPage, { 'det': det, 'i': i, page: 'payment', 'cusmobno': this.currentcussData, 'pay_mode': this.pay_mode, redm: this.navParams.get('redm'), detail: this.temp, all: this.all, total: this.total, data: this.navParams.get('detail'), pay_arr: test });
              } else {

                let submiturl = BaseAPIURL + "paymt/mobile_payment?firstname=" + this.currentcussData['firstname'] + "&lastname=" + this.currentcussData['lastname'] + "&phone=" + this.currentcussData['mobile'] + "&id_branch=" + payBranch + "&amount=" + this.total + "&redeemed_amount=" + this.navParams.get('redm') + "&productinfo=" + undefined + "&email=" + this.currentcussData['email'] + "&id_employee=" + currentUser['employee']['id_employee'] + "&login_type=" + currentUser['employee']['login_type'] + "&pg=" + 'NB' + "&pay_mode=" + this.pay_mode +"&refernceNo="+this.referenceNo+ "&gateway=" + "0" + "&pg_code=" + "0" + "&pay_arr=" + encodeURIComponent(JSON.stringify(test)) + "&nocache=" + my_Date.getHours() + '' + my_Date.getMinutes() + '' + my_Date.getSeconds();;
                console.log('test' + JSON.stringify(test));
                console.log(submiturl);
                console.log(this.navParams.get('redm'));
                console.log(this.total)
                console.log(det['pg_code']);
                console.log(det['id_pg']);
                console.log(this.id_branch)
             //   var paymentWindow = window.open(submiturl, '_blank', 'location=no, clearsessioncache=yes');

                    var paymentWindow =  cordova.InAppBrowser.open(submiturl, '_blank', 'location=no, clearsessioncache=yes');



                paymentWindow.addEventListener('loadstart', (event) => {
                  console.log('loadstart',event['url']);

                  if (event['url'] == BaseAPIURL + "adminapp/failed" || event['url'] == BaseAPIURL + "adminapp/failed") {
                    paymentWindow.close();
                    let alert = this.alertCtrl.create({
                      title: 'Sorry',
                      subTitle: 'Your transaction has been failed, Please try again',
                      buttons: ['Dismiss']
                    });
                    alert.present();
                    this.viewCtrl.dismiss();
                      this.appCtrl.getRootNav().setRoot(HomePage);
                 //   this.appCtrl.getRootNav().setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });
                  }

                  if (event['url'] == BaseAPIURL + "adminapp/cancel" || event['url'] == BaseAPIURL + "adminapp/cancel") {
                    paymentWindow.close();
                    let alert = this.alertCtrl.create({
                      title: 'Sorry',
                      subTitle: 'Your transaction has been cancelled, Please try again',
                      buttons: ['Dismiss']
                    });
                    alert.present();
                    this.viewCtrl.dismiss();
                       this.appCtrl.getRootNav().setRoot(HomePage);
                    //this.appCtrl.getRootNav().setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });
                  }
                });
                paymentWindow.addEventListener('loadstop', (event) => {

                  console.log('loadstop',event['url']);
                  if (event['url'] == BaseAPIURL + "paymt/adminapp/success" || event['url'] == BaseAPIURL + "paymt/adminapp/success" || event['url'] == BaseAPIURL + "paymt/adminapp/success") {
                    console.log(event['url']);
                    console.log(event['url'] == BaseAPIURL + "paymt/adminapp/success");
                    console.log(event['url'] == BaseAPIURL + "paymt/adminapp/success");
                    paymentWindow.close();

                    let alert = this.alertCtrl.create({
                      title: 'Success',
                      subTitle: 'Thanks for your payment with us.Your payment (sub. to realisation) is processed successfully.',
                      buttons: ['Dismiss']

                    });
                    alert.present();

                    // this.appCtrl.getRootNav().setRoot(HomePage);
                    this.viewCtrl.dismiss();
                      this.appCtrl.getRootNav().setRoot(HomePage);
                   // this.appCtrl.getRootNav().setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });

                  }

                  if (event['url'] == BaseAPIURL + "paymt/payment_rejected") {
                    paymentWindow.close();

                    let alert = this.alertCtrl.create({
                      title: 'Payment Rejected',
                      subTitle: 'Your payment has been rejected, please try again later ...',
                      buttons: ['Dismiss']
                    });
                    alert.present();
                    this.viewCtrl.dismiss();
                      this.appCtrl.getRootNav().setRoot(HomePage);
                  //  this.appCtrl.getRootNav().setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });
                  }
                });
                paymentWindow.addEventListener('loaderror', (event) => {
                  console.log('load error :' + JSON.stringify(event))
                  paymentWindow.close();
                  let alert = this.alertCtrl.create({
                    title: 'Payment Under Process',
                    buttons: ['Dismiss']
                  });
                  alert.present();
                  this.viewCtrl.dismiss();
                    this.appCtrl.getRootNav().setRoot(HomePage);
                //  this.appCtrl.getRootNav().setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });
                });
                paymentWindow.addEventListener('exit', (event) => {
                  console.log('exit',event['url']);
                });
                console.log(this.details);

              }


            }
          }
        ]
      });
      confirm.present();
    }
  }

  showref(e) {
    console.log(e);
    this.type = e;


  }


  cardPayment(i, det) {

    console.log(i, det)
    if (det == 'cc') {
      this.cardtype = "Credit Card"
      this.pay_mode = 'CC'
      console.log(this.pay_mode)
    } else {
      this.cardtype = 'Debit Card'
      this.pay_mode = 'DC'
      console.log(this.pay_mode)
    }

    let confirm = this.alertCtrl.create({
      title: 'Confirm to Pay' + ' ' + this.cardtype,
      subTitle: 'Are you sure? Do you want to Pay' + ' ' + this.cardtype,
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');

            var my_Date = new Date(),
              n = my_Date.getTime();
            var pay: any = {};
            var currentUser = JSON.parse(localStorage.getItem('sssuser'));

            var test: any[] = [];
            console.log('cusdata : ', this.currentcussData);
            console.log('emp :', currentUser)
            console.log(this.currentcussData['firstname']);
            console.log(currentUser['employee']['id_employee'])
            console.log(this.id_branch);
            var payBranch = (this.currency['currency']['branch_settings'] == 0 ? currentUser['employee']['id_branch'] : this.id_branch)

            console.log(this.temp)
            this.temp.forEach(element => {

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
            console.log(det)
            console.log(this.total)
            console.log(this.navParams.get('redm'))
            console.log(this.pay_mode)

            if (this.currency['currency']['payment_otp_required'] == 1) {
              this.navCtrl.push(PaymentotpPage, { 'det': det, 'i': i, page: 'payment', 'cusmobno': this.currentcussData, 'pay_mode': this.pay_mode, redm: this.navParams.get('redm'), detail: this.temp, all: this.all, total: this.total, data: this.navParams.get('detail'), pay_arr: test });
            } else {

              let submiturl = BaseAPIURL + "paymt/mobile_payment?firstname=" + this.currentcussData['firstname'] + "&lastname=" + this.currentcussData['lastname'] + "&phone=" + this.currentcussData['mobile'] + "&id_branch=" + payBranch + "&amount=" + this.total + "&redeemed_amount=" + this.navParams.get('redm') + "&productinfo=" + undefined + "&email=" + this.currentcussData['email'] + "&id_employee=" + currentUser['employee']['id_employee'] + "&login_type=" + currentUser['employee']['login_type'] + "&pg=" + 'NB' + "&pay_mode=" + this.pay_mode + "&gateway=" + "0" + "&pg_code=" + "0" + "&pay_arr=" + encodeURIComponent(JSON.stringify(test)) + "&nocache=" + my_Date.getHours() + '' + my_Date.getMinutes() + '' + my_Date.getSeconds();;
              console.log('test' + JSON.stringify(test));
              console.log(submiturl);
              console.log(this.navParams.get('redm'));
              console.log(this.total)
              console.log(det['pg_code']);
              console.log(det['id_pg']);
              console.log(this.id_branch)
              var paymentWindow = window.open(submiturl, '_blank', 'location=no, clearsessioncache=yes');

              paymentWindow.addEventListener('loadstart', (event) => {

                if (event['url'] == BaseAPIURL + "adminapp/failed" || event['url'] == BaseAPIURL + "adminapp/failed") {
                  paymentWindow.close();


                  let alert = this.alertCtrl.create({
                    title: 'Sorry',
                    subTitle: 'Your transaction has been failed, Please try again',
                    buttons: ['Dismiss']

                  });
                  alert.present();
                  this.viewCtrl.dismiss();
                  // this.appCtrl.getRootNav().setRoot(HomePage);
                  this.appCtrl.getRootNav().setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });

                }

                if (event['url'] == BaseAPIURL + "adminapp/cancel" || event['url'] == BaseAPIURL + "adminapp/cancel") {
                  paymentWindow.close();

                  let alert = this.alertCtrl.create({
                    title: 'Sorry',
                    subTitle: 'Your transaction has been cancelled, Please try again',
                    buttons: ['Dismiss']

                  });
                  alert.present();
                  this.viewCtrl.dismiss();
                  //  this.appCtrl.getRootNav().setRoot(HomePage);
                  this.appCtrl.getRootNav().setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });
                }
              });
              paymentWindow.addEventListener('loadstop', (event) => {

                console.log(event['url']);
                if (event['url'] == BaseAPIURL + "paymt/adminapp/success" || event['url'] == BaseAPIURL + "paymt/adminapp/success" || event['url'] == BaseAPIURL + "paymt/adminapp/success") {
                  console.log(event['url']);
                  console.log(event['url'] == BaseAPIURL + "paymt/adminapp/success")
                  console.log(event['url'] == BaseAPIURL + "paymt/adminapp/success");
                  paymentWindow.close();

                  let alert = this.alertCtrl.create({
                    title: 'Success',
                    subTitle: 'Thanks for your payment with us.Your payment (sub. to realisation) is processed successfully.',
                    buttons: ['Dismiss']

                  });
                  alert.present();

                  // this.appCtrl.getRootNav().setRoot(HomePage);
                  this.viewCtrl.dismiss();
                  //  this.appCtrl.getRootNav().setRoot(HomePage);
                  this.appCtrl.getRootNav().setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });

                }

                if (event['url'] == BaseAPIURL + "paymt/payment_rejected") {
                  paymentWindow.close();

                  let alert = this.alertCtrl.create({
                    title: 'Payment Rejected',
                    subTitle: 'Your payment has been rejected, please try again later ...',
                    buttons: ['Dismiss']
                  });
                  alert.present();
                  this.viewCtrl.dismiss();
                  //  this.appCtrl.getRootNav().setRoot(HomePage);
                  this.appCtrl.getRootNav().setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });
                }
              });
              paymentWindow.addEventListener('loaderror', (event) => {
                console.log('load error :' + JSON.stringify(event))
                paymentWindow.close();
                let alert = this.alertCtrl.create({
                  title: 'Payment Under Process',
                  buttons: ['Dismiss']
                });
                alert.present();
                this.viewCtrl.dismiss();
                //  this.appCtrl.getRootNav().setRoot(HomePage);
                this.appCtrl.getRootNav().setRoot(PaymenthisPage, { 'cusmobno': this.currentcussData });
              });
              paymentWindow.addEventListener('exit', (event) => {
              });
              console.log(this.details);

            }

          }
        }
      ]
    });
    confirm.present();

  }
  goBack() {
    console.log('true');

    var currentUser = JSON.parse(localStorage.getItem('sssuser'));
    var postdata = {
      'id_employee': currentUser['employee']['id_employee'],
      'login_type': currentUser['employee']['login_type'],
      'cusmobile': this.currentcussData['mobile'],
      'emp_branch': currentUser['employee']['id_branch'],
      'schemecode': "",
      'year': "",
      'schemeaccno': ""
  }
    // this.navCtrl.setRoot(PayduesPage);
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().setRoot(PayduesPage ,{'postdata':postdata,'pageType':'fromCollection'});

  }

}
