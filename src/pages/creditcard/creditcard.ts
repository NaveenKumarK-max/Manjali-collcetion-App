import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, App, ModalController, LoadingController, Events, ToastController, ViewController } from 'ionic-angular';
import { PaydetailmodalPage } from '../paydetailmodal/paydetailmodal';
import { CommonProvider, BaseAPIURL } from '../../providers/common';
import { HomePage } from '../home/home';
import { PayduesPage } from '../paydues/paydues';

declare var require: any

/**
 * Generated class for the CreditcardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-creditcard',
  templateUrl: 'creditcard.html',
  providers: [CommonProvider]

})

export class CreditcardPage {

  details: any = { 'cardno': '', 'cardname': '', 'exm': '', 'exy': '', 'cvv': '', 'status': false }
  total: any = 0;
  detail: any[] = this.navParams.get('data');
  temp: any[] = [];

  currency: any = '';
  title = this.navParams.get('title');
  // all = this.navParams.get('all');
  all = this.navParams.get('all').filter(data => data.pg_code == 1);
  cardtype: any = '';
  store: any = 0;
  id_branch: any = null;
  gateway: any;

  constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, public appCtrl: App, public toast: ToastController, public events: Events, public load: LoadingController, public comman: CommonProvider, public modal: ModalController, public navCtrl: NavController, public navParams: NavParams) {

    this.total = this.navParams.get('total')
    console.log(this.navParams.get('all'));
    console.log(this.navParams.get('title'));
    console.log(this.all[0]['pg_code']);
    console.log(this.all[0]['id_pg']);

    console.log('all :' + this.all);
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
    this.comman.getcurrency(this.id_branch).then(data => {

      this.currency = data;
      loader.dismiss();

    })
    console.log(this.navParams.get('data')[0])
    /*     this.detail.forEach((element,i) => {
          
          var index = 1;
    
          while(index <= element['sel_due'] ){
            var test:any = Object.assign({}, element);
            test['sel_due'] = 1;
            this.temp.push(test)
            index ++;
          }
        }); */
    console.log(this.detail)

    /*     this.detail.forEach((element, i) => {
    
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
              test.due_type = test.due_type;
            }
    
            this.temp.push(test)
            index++;
          }
        }); */


    this.detail.forEach((element, i) => {
      console.log(this.detail);
      console.log(element, i);
      console.log(test);

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
        console.log(test);
      }
    });
    console.log(this.temp)


  }
  updateremember(value) {

    if (value == true) {

      this.store = 1;
    }
    else {
      this.store = 0;
    }
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad CreditcardPage');
  }
  change(event) {
    document.getElementById('iban').addEventListener('input', function (event) {
      // console.log(event);
      (<HTMLInputElement>event.target).value = (<HTMLInputElement>event.target).value
        .replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    });
    this.details['cardno'] = (<HTMLInputElement>event.target).value
      .replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();

    var creditCardType = require('credit-card-type');
    var visaCards = creditCardType(this.details['cardno']);
    if (visaCards.length > 0) {
      this.cardtype = visaCards[0].type;
      console.log(visaCards);
    }
    if (this.details['cardno'].length == 0) {
      this.cardtype = '';

    }
  }
  ionViewWillEnter() {
    let user = false;

    this.events.publish('user:created', user);
  }
  ionViewWillLeave() {
    let user = true;

    this.events.publish('user:created', user);
  }
  pay() {

    let mod = this.modal.create(PaydetailmodalPage, { data: this.navParams.get('data'), total: this.navParams.get('total') })
    mod.present();

  }
  check() {
    //  this.continue();

    if (this.details['cardname'] != '' && this.details['cardno'] != '' && this.details['exm'] != '' && this.details['exy'] != '' && this.details['cvv'] != '') {

      this.continue();
    }
    else {
      let toast = this.toast.create({
        message: "Please Enter Valid Data",
        position: 'bottom',

        duration: 6000
      });
      toast.present();
    }
  }
  continue() {

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
          /*   'udf3': this.currency['metal_rates']['goldrate_22ct'], */
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
          /*  'udf3': this.currency['metal_rates']['goldrate_22ct'], */
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
    });

    console.log(test);
    console.log(this.details);

    this.gateway = this.all.length != 0 ? this.all[0]['id_pg'] : '';
    console.log(this.gateway);
    let submiturl = BaseAPIURL + "paymt/mobile_payment?firstname=" + currentUser['customer'].firstname + "&lastname=" + currentUser['customer'].lastname + "&phone=" + currentUser.mobile+"&id_branch=" + currentUser['customer'].id_branch + "&amount=" + this.total + "&redeemed_amount=" + this.navParams.get('redm') + "&productinfo=" + '' + "&email=" + currentUser['customer'].email + "&pg=" + this.title + "&bankcode=" + this.title + "&ccnum=" + this.details['cardno'] + "&ccname=" + this.details['cardname'] + "&ccvv=" + this.details['cvv'] + "&ccexpmon=" + this.details['exm'] + "&ccexpyr=" + 20 + this.details['exy'] + "&store_card=" + this.store + "&gateway=" + this.gateway + "&pay_arr=" + encodeURIComponent(JSON.stringify(test)) + "&nocache=" + n;
    console.log(submiturl);

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
        console.log(event['url']);
        paymentWindow.close();

        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Thanks for your payment with us.Your payment (sub. to realisation) is processed successfully.',
          buttons: ['Dismiss']

        });
        alert.present();
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

    console.log(this.details)
  }



}
