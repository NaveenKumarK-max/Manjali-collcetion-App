

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Events, ModalController, ViewController, App } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { CustomPopupPage } from '../custom-popup/custom-popup';
import { WalletmodalPage } from '../walletmodal/walletmodal';
import { PaymentPage } from '../payment/payment';
import { PaydetailmodalPage } from '../paydetailmodal/paydetailmodal';
import { providers } from '../../app/app.module';
import { HomePage } from '../home/home';
import { PaymenthisPage } from '../paymenthis/paymenthis';

/**
 * Generated class for the PayduesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-paydues',
  templateUrl: 'paydues.html',
  providers: [CommonProvider]

})
export class PayduesPage {

  dues: any[] = [];
  wt: any[] = [];
  tog: any[] = [];

  searchData: any[] = [];
  public input: string = '';
  total: any = 0;
  wallet: any = 0;
  collect: any[] = [];
  currency: any = { 'currency': { 'currency_symbol': '' } };
  err: any = false;
  gold_rate: any = 0;
  id_wt: any = ''
  id_sc: any = ''

  temp: any[] = [];
  color: any = false;
  dup: any[] = [];
  id_branch: any = null;
  disable_payment: '';
  disable_pay_reason: '';
  disable = true;

  cusmobno: any ;
  offcurpayment: any = this.navParams.get('offlineCusCurrentPay');
  companyName = JSON.parse(localStorage.getItem('company'))


  checknet = localStorage.getItem('checknetwork');
  app_version = JSON.parse(localStorage.getItem('appVersion'));
  pagetype = this.navParams.get('pageType');


  constructor(public appCtrl: App, public viewCtrl: ViewController, public toast: ToastController, public modal: ModalController, public events: Events, public comman: CommonProvider, public load: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
console.log(this.cusmobno)
console.log(this.pagetype);
    console.log('offcurpayment : ', this.offcurpayment);
    console.log(this.app_version)


    this.events.subscribe('checknetwork', (data) => {
      this.checknet = data;
      console.log(11111111111111111, data)
    });

    let user = false;



    if (this.checknet == 'offline') {
      // offline

      console.log(this.cusmobno);
      console.log(this.offcurpayment);
      this.cusmobno = this.offcurpayment[0];
      console.log(this.cusmobno);

      this.offcurpayment[0]['payments']['chits'].forEach((element, i) => {

        var newNum = "cc";
        var newNum2 = "sub";
        var newNum3 = "err";
        var newNum4 = "gstcalc";
        var newNum5 = "gstper";
        var newNum6 = "read";
        var newNum7 = "prev";
        var newNum8 = "temp_payable";
        var newNum9 = "temp_max_weight";
        var newNum10 = "temp_max_wgt_rate";

        var newVal = false;
        var newVal2 = null;
        var newVal3 = false;
        var newVal4 = 0;
        var newVal5 = 0;
        var newVal6 = true;

        this.offcurpayment[0]['payments']['chits'][i][newNum] = newVal;
        this.offcurpayment[0]['payments']['chits'][i][newNum2] = newVal2;
        this.offcurpayment[0]['payments']['chits'][i][newNum3] = newVal3;
        this.offcurpayment[0]['payments']['chits'][i][newNum4] = newVal4;
        this.offcurpayment[0]['payments']['chits'][i][newNum5] = newVal5;
        this.offcurpayment[0]['payments']['chits'][i][newNum6] = newVal6;
        this.offcurpayment[0]['payments']['chits'][i][newNum7] = element['payable'];
        this.offcurpayment[0]['payments']['chits'][i][newNum8] = element['payable'];
        this.offcurpayment[0]['payments']['chits'][i][newNum9] = element['eligible_weight'];
        this.offcurpayment[0]['payments']['chits'][i]['tempeligible_weight'] = element['eligible_weight'];

        this.offcurpayment[0]['payments']['chits'][i][newNum10] = element['max_wgt_rate'];
        // this.offcurpayment[0]['payments']['chits'][i]['tempweightcolor'] = this.wt['weights'].filter(item => item.weight <= element['eligible_weight']);

      });

      console.log(this.offcurpayment[0]['payments']['chits'])
      this.dues = this.offcurpayment[0]['payments']['chits']
      this.offcurpayment[0]['payments']['chits'].forEach((d, idx) => {
        if (d.hasOwnProperty('disable_payment') && d['disable_payment'] == '1' && d['disable_pay_reason'] != null) {
          this.disable_payment = d['disable_payment'];
          this.disable_pay_reason = d['disable_pay_reason'];
          console.log(d['disable_payment']);
          console.log(d['disable_pay_reason']);
        }
        console.log(this.dues[idx]['paid_installments'])
        console.log(this.dues[idx]['total_installments'])
        if (this.dues[idx]['paid_installments'] >= this.dues[idx]['total_installments'] || (this.dues[idx]['allow_pay'] == 'N')) {
          this.dues[idx]['allow_pay'] = 'N';
        }
        else {
          this.dues[idx]['allow_pay'] = 'Y';
        }
      })

      this.searchData = this.offcurpayment[0]['payments']['chits']
      this.dup = this.offcurpayment[0]['payments']['chits']
      localStorage.setItem('dup', JSON.stringify(this.dup))
      console.log(this.offcurpayment[0]['payments']['chits'])

    } else {

      // online Data

      let loader = this.load.create({
      //  content: 'Please Wait',
        spinner: 'crescent',
      });
      loader.present();

      this.comman.getcurrency(this.id_branch).then(data => {
        this.currency = data;
      })
      this.comman.getwt().then(data => {
        this.wt = data;
        this.gold_rate = parseFloat(data.rates.goldrate_22ct).toFixed(2);
        console.log('weights :',this.wt)

if(this.pagetype == 'fromCollection'){
    this.cusmobno = this.navParams.get('postdata');
    console.log(this.navParams.get('postdata'))
    console.log('if',this.cusmobno)
}else{
  console.log('else',this.cusmobno)
  this.cusmobno = JSON.parse(localStorage.getItem('postdata'))
}

        this.comman.fetchCustomerSchemes(this.cusmobno).then(data => {
          this.cusmobno = data['customer'];
          console.log(this.cusmobno);
          data['cusSchemes'].forEach((element, i) => {

            var newNum = "cc";
            var newNum2 = "sub";
            var newNum3 = "err";
            var newNum4 = "gstcalc";
            var newNum5 = "gstper";
            var newNum6 = "read";
            var newNum7 = "prev";
            var newNum8 = "temp_payable";
            var newNum9 = "temp_max_weight";
            var newNum10 = "temp_max_wgt_rate";

            var newVal = false;
            var newVal2 = null;
            var newVal3 = false;
            var newVal4 = 0;
            var newVal5 = 0;
            var newVal6 = true;

            data['cusSchemes'][i][newNum] = newVal;
            data['cusSchemes'][i][newNum2] = newVal2;
            data['cusSchemes'][i][newNum3] = newVal3;
            data['cusSchemes'][i][newNum4] = newVal4;
            data['cusSchemes'][i][newNum5] = newVal5;
            data['cusSchemes'][i][newNum6] = newVal6;
            data['cusSchemes'][i][newNum7] = element['payable'];
            data['cusSchemes'][i][newNum8] = element['payable'];
            data['cusSchemes'][i][newNum9] = element['eligible_weight'];
            data['cusSchemes'][i]['tempeligible_weight'] = element['eligible_weight'];

            data['cusSchemes'][i][newNum10] = element['max_wgt_rate'];
            data['cusSchemes'][i]['tempweightcolor'] = this.wt['weights'].filter(item => item.weight <= element['eligible_weight']);
          });
          console.log(data['cusSchemes'])
          this.dues = data['cusSchemes']
          data['cusSchemes'].forEach((d, idx) => {
            if (d.hasOwnProperty('disable_payment') && d['disable_payment'] == '1' && d['disable_pay_reason'] != null) {
              this.disable_payment = d['disable_payment'];
              this.disable_pay_reason = d['disable_pay_reason'];
              console.log(d['disable_payment']);
              console.log(d['disable_pay_reason']);
            }
          })
          this.searchData = data['cusSchemes']
          this.dup = data['cusSchemes']
          localStorage.setItem('dup', JSON.stringify(this.dup))
          console.log(data)
          loader.dismiss();
        })


      })

    }

  }


  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    let user = false;
    this.events.publish('user:created', user);
  }
  ionViewWillLeave() {
    let user = true;
    this.events.publish('user:created', user);
  }
  search() {
    this.dues = this.searchData.filter(item => item['chit_number'].toUpperCase().includes(this.input.toUpperCase()));
  }
  calc(index, data) {

    console.log(index)
    console.log(this.dues)

    if (this.tog[index] == true) {

      if (this.dues[index]['scheme_type'] == 0) {

        var payable = this.dues[index].payable == null ? 0 : this.dues[index].payable;
        if (this.dues[index].allowPayDisc == 'All' || (this.dues[index].allowPayDisc > 0 && (this.dues[index].paid_installments + 1) == this.dues[index].allowPayDisc)) {
          var calc_discount = this.dues[index].firstPayDisc_by == 1 ? this.dues[index].discount_val : (parseFloat(payable) * (parseFloat(this.dues[index].discount_val) / 100)).toFixed(2);
          this.dues[index]['disamt'] = calc_discount;
        } else {
          this.dues[index]['disamt'] = 0.0;

        }
        if (this.dues[index].charge_type == 0) {
          this.dues[index]['conv'] = (parseFloat(this.dues[index]['payable']) * (parseFloat(this.dues[index].charge) / 100)).toFixed(2);
        } else if (this.dues[index].charge_type == 1) {
          this.dues[index]['conv'] = this.dues[index].charge;
        }

        this.dues[index]['gstcalc'] = parseInt(this.dues[index]['payable']) * parseInt(this.dues[index]['gst']) / 100;
        if (this.dues[index]['gst_type'] == 0) {
          this.total += (parseInt(this.dues[index]['payable']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          this.collect.push(this.dues[index])
          console.log((this.dues[index]['payable']));
          console.log(parseInt(this.dues[index]['sel_due']));
          console.log('111' + parseInt(this.dues[index]['payable']) * parseInt(this.dues[index]['sel_due']));
          console.log(this.dues[index]);
          console.log(this.total);
          console.log(this.dues);
          console.log(this.dues[index]['payable']);

        }
        else if (this.dues[index]['gst_type'] == 1) {
          this.dues[index]['gstper'] = parseInt(this.dues[index]['payable']) * parseInt(this.dues[index]['sel_due']) + parseInt(this.dues[index]['gstcalc']);
          this.total += (parseInt(this.dues[index]['gstper']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          this.collect.push(this.dues[index]);

        }

        console.log(this.collect);

      }
      else if (this.dues[index]['scheme_type'] == 1) {

        var payable = this.dues[index].payable == null ? 0 : this.dues[index].payable;
        if (this.dues[index].allowPayDisc == 'All' || (this.dues[index].allowPayDisc > 0 && (this.dues[index].paid_installments + 1) == this.dues[index].allowPayDisc)) {
          var calc_discount = this.dues[index].firstPayDisc_by == 1 ? this.dues[index].discount_val : (parseFloat(payable) * (parseFloat(this.dues[index].discount_val) / 100)).toFixed(2);
          this.dues[index]['disamt'] = calc_discount;
        } else {
          this.dues[index]['disamt'] = 0.0;

        }
        if (this.dues[index].charge_type == 0) {
          this.dues[index]['conv'] = (parseFloat(this.dues[index]['payable']) * (parseFloat(this.dues[index].charge) / 100)).toFixed(2);
        } else if (this.dues[index].charge_type == 1) {
          this.dues[index]['conv'] = this.dues[index].charge;
        }
        this.dues[index]['gstcalc'] = parseInt(this.dues[index]['max_wgt_rate']) * parseInt(this.dues[index]['gst']) / 100;
        if (this.dues[index]['gst_type'] == 0) {

          this.total += (parseInt(this.dues[index]['max_wgt_rate']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          this.collect.push(this.dues[index])

          console.log(this.collect);
        }
        else if (this.dues[index]['gst_type'] == 1) {
          this.dues[index]['gstper'] = parseInt(this.dues[index]['max_wgt_rate']) * parseInt(this.dues[index]['sel_due']) + parseInt(this.dues[index]['gstcalc']);

          this.total += (parseInt(this.dues[index]['gstper']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          this.collect.push(this.dues[index])

          console.log(this.collect);
        }
      }
      else if (this.dues[index]['scheme_type'] == 2) {

        var payable = this.dues[index].payable == null ? 0 : this.dues[index].payable;
        if (this.dues[index].allowPayDisc == 'All' || (this.dues[index].allowPayDisc > 0 && (this.dues[index].paid_installments + 1) == this.dues[index].allowPayDisc)) {
          var calc_discount = this.dues[index].firstPayDisc_by == 1 ? this.dues[index].discount_val : (parseFloat(payable) * (parseFloat(this.dues[index].discount_val) / 100)).toFixed(2);
          this.dues[index]['disamt'] = calc_discount;
        } else {
          this.dues[index]['disamt'] = 0.0;

        }
        if (this.dues[index].charge_type == 0) {
          this.dues[index]['conv'] = (parseFloat(this.dues[index]['payable']) * (parseFloat(this.dues[index].charge) / 100)).toFixed(2);
        } else if (this.dues[index].charge_type == 1) {
          this.dues[index]['conv'] = this.dues[index].charge;
        }
        this.dues[index]['gstcalc'] = parseInt(this.dues[index]['payable']) * parseInt(this.dues[index]['gst']) / 100;

        if (this.dues[index]['gst_type'] == 0) {

          this.total += (parseInt(this.dues[index]['payable']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          this.collect.push(this.dues[index])

          console.log(this.collect);
        }
        else if (this.dues[index]['gst_type'] == 1) {
          this.dues[index]['gstper'] = parseInt(this.dues[index]['payable']) * parseInt(this.dues[index]['sel_due']) + parseInt(this.dues[index]['gstcalc']);

          this.total += (parseInt(this.dues[index]['gstper']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          this.collect.push(this.dues[index])

          console.log(this.collect);
        }
      }

      else if (this.dues[index]['scheme_type'] == 3) {

        var payable = this.dues[index].payable == null ? 0 : this.dues[index].payable;
        if (this.dues[index].allowPayDisc == 'All' || (this.dues[index].allowPayDisc > 0 && (this.dues[index].paid_installments + 1) == this.dues[index].allowPayDisc)) {
          var calc_discount = this.dues[index].firstPayDisc_by == 1 ? this.dues[index].discount_val : (parseFloat(payable) * (parseFloat(this.dues[index].discount_val) / 100)).toFixed(2);
          this.dues[index]['disamt'] = calc_discount;
        } else {
          this.dues[index]['disamt'] = 0.0;

        }
        if (this.dues[index].charge_type == 0) {
          this.dues[index]['conv'] = (parseFloat(this.dues[index]['payable']) * (parseFloat(this.dues[index].charge) / 100)).toFixed(2);
        } else if (this.dues[index].charge_type == 1) {
          this.dues[index]['conv'] = this.dues[index].charge;
        }
        this.dues[index]['read'] = false;
        console.log('read' + this.dues[index]['read']);
        this.dues[index]['gstcalc'] = parseInt(this.dues[index]['payable']) * parseInt(this.dues[index]['gst']) / 100;
        if (this.dues[index]['gst_type'] == 0) {

          this.total += (parseInt(this.dues[index]['payable']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          this.collect.push(this.dues[index])

          console.log(this.collect);
        }
        else if (this.dues[index]['gst_type'] == 1) {
          this.dues[index]['gstper'] = parseInt(this.dues[index]['payable']) * parseInt(this.dues[index]['sel_due']) + parseInt(this.dues[index]['gstcalc']);

          this.total += (parseInt(this.dues[index]['gstper']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          this.collect.push(this.dues[index])

          console.log(this.collect);
        }
      }


    }
    else {
      if (this.dues[index]['scheme_type'] == 0) {
        if (this.dues[index]['gst_type'] == 0) {

          this.dues[index]['gstper'] = 0;
          this.total -= (parseInt(this.dues[index]['payable']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          this.dues[index]['sel_due'] = 1;

          let indexx: number = this.collect.indexOf(data);
          if (indexx !== -1) {
            this.collect.splice(indexx, 1);

          }
          console.log(this.collect);
        }
        else if (this.dues[index]['gst_type'] == 1) {

          this.total -= (parseInt(this.dues[index]['gstper']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          this.dues[index]['sel_due'] = 1;

          let indexx: number = this.collect.indexOf(data);
          if (indexx !== -1) {
            this.collect.splice(indexx, 1);


          }

          console.log(this.collect);
        }
      }
      else if (this.dues[index]['scheme_type'] == 1 && this.dues[index]['is_flexible_wgt'] == 0) {
        if (this.dues[index]['gst_type'] == 0) {

          this.dues[index]['gstper'] = 0;
          this.total -= (parseInt(this.dues[index]['max_wgt_rate']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          this.dues[index]['sel_due'] = 1;

          let indexx: number = this.collect.indexOf(data);
          if (indexx !== -1) {
            this.collect.splice(indexx, 1);

          }
          console.log(this.collect);
        }
        else if (this.dues[index]['gst_type'] == 1) {

          this.total -= (parseInt(this.dues[index]['gstper']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          this.dues[index]['sel_due'] = 1;

          let indexx: number = this.collect.indexOf(data);
          if (indexx !== -1) {
            this.collect.splice(indexx, 1);

          }
          console.log(this.collect);
        }
      }
      else if (this.dues[index]['scheme_type'] == 1 && this.dues[index]['is_flexible_wgt'] == 1) {
        if (this.dues[index]['gst_type'] == 0) {

          this.dues[index]['gstper'] = 0;
          this.total -= (parseInt(this.dues[index]['max_wgt_rate']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          let indexx: number = this.collect.indexOf(data);
          if (indexx !== -1) {
            this.collect.splice(indexx, 1);

          }
          let wrate = JSON.parse(localStorage.getItem('dup'))[index]['max_wgt_rate'];
          let wwt = JSON.parse(localStorage.getItem('dup'))[index]['eligible_weight'];

          this.dues[index]['max_wgt_rate'] = wrate;
          this.dues[index]['eligible_weight'] = wwt;
          this.dues[index]['tempeligible_weight'] = wwt;

          this.color = false;
          this.dues[index]['cc'] = false;
          this.dues[index]['sub'] = null;
          console.log(JSON.parse(localStorage.getItem('dup'))[index]);
          console.log(this.dues[index]['max_wgt_rate']);

        }
        else if (this.dues[index]['gst_type'] == 1) {

          this.total -= (parseInt(this.dues[index]['gstper']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          let indexx: number = this.collect.indexOf(data);
          if (indexx !== -1) {
            this.collect.splice(indexx, 1);

          }
          let wrate = JSON.parse(localStorage.getItem('dup'))[index]['max_wgt_rate'];
          let wwt = JSON.parse(localStorage.getItem('dup'))[index]['eligible_weight'];

          this.dues[index]['max_wgt_rate'] = wrate;
          this.dues[index]['eligible_weight'] = wwt;
          this.dues[index]['tempeligible_weight'] = wwt;

          this.color = false;
          this.dues[index]['cc'] = false;
          this.dues[index]['sub'] = null;
          console.log(JSON.parse(localStorage.getItem('dup'))[index]);
          console.log(this.dues[index]['max_wgt_rate']);

        }
      }
      else if (this.dues[index]['scheme_type'] == 2) {
        if (this.dues[index]['gst_type'] == 0) {

          this.dues[index]['gstper'] = 0;
          this.total -= (parseInt(this.dues[index]['payable']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          this.dues[index]['sel_due'] = 1;

          let indexx: number = this.collect.indexOf(data);
          if (indexx !== -1) {
            this.collect.splice(indexx, 1);

          }
          console.log(this.collect);
        }
        else if (this.dues[index]['gst_type'] == 1) {

          this.total -= (parseInt(this.dues[index]['gstper']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          this.dues[index]['sel_due'] = 1;

          let indexx: number = this.collect.indexOf(data);
          if (indexx !== -1) {
            this.collect.splice(indexx, 1);

          }
          console.log(this.collect);
        }
      }
      else if (this.dues[index]['scheme_type'] == 3) {
        this.dues[index]['read'] = true;
        console.log('read true' + this.dues[index]['read']);
        if (this.dues[index]['gst_type'] == 0) {

          this.dues[index]['gstper'] = 0;
          this.total -= (parseInt(this.dues[index]['payable']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          let indexx: number = this.collect.indexOf(data);
          if (indexx !== -1) {
            this.collect.splice(indexx, 1);

          }
          console.log(this.collect);
        }
        else if (this.dues[index]['gst_type'] == 1) {

          this.total -= (parseInt(this.dues[index]['gstper']) * parseInt(this.dues[index]['sel_due'])) - parseInt(this.dues[index]['disamt']) + parseInt(this.dues[index]['conv']);
          let indexx: number = this.collect.indexOf(data);
          if (indexx !== -1) {
            this.collect.splice(indexx, 1);

          }
          console.log(this.collect);
        }
      }
    }

  }
  add(i, data) {
    let indexx: number = this.collect.indexOf(data);
    if (this.dues[i]['max_allowed_limit'] != 1 && this.dues[i]['sel_due'] < this.dues[i]['max_allowed_limit']) {

      if (indexx !== -1) {
        if (this.dues[i]['scheme_type'] == 0 || this.dues[i]['scheme_type'] == 3) {
          if (this.dues[i]['gst_type'] == 0) {

            this.dues[i]['sel_due'] = parseInt(this.dues[i]['sel_due']) + 1;
            this.total += (parseInt(this.dues[i]['payable'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);

          }
          else if (this.dues[i]['gst_type'] == 1) {

            this.dues[i]['sel_due'] = parseInt(this.dues[i]['sel_due']) + 1;
            this.total += (parseInt(this.dues[i]['gstper'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);

          }

        }
        else if (this.dues[i]['scheme_type'] == 2) {
          if (this.dues[i]['gst_type'] == 0) {

            this.dues[i]['sel_due'] = parseInt(this.dues[i]['sel_due']) + 1;
            this.total += (parseInt(this.dues[i]['payable'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);

          }
          else if (this.dues[i]['gst_type'] == 1) {

            this.dues[i]['sel_due'] = parseInt(this.dues[i]['sel_due']) + 1;
            this.total += (parseInt(this.dues[i]['gstper'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);

          }
        }
        else if (this.dues[i]['scheme_type'] == 1 && this.dues[i]['is_flexible_wgt'] == 0) {
          if (this.dues[i]['gst_type'] == 0) {

            this.dues[i]['sel_due'] = parseInt(this.dues[i]['sel_due']) + 1;
            this.total += (parseInt(this.dues[i]['max_wgt_rate'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);

          }
          else if (this.dues[i]['gst_type'] == 1) {

            this.dues[i]['sel_due'] = parseInt(this.dues[i]['sel_due']) + 1;
            this.total += (parseInt(this.dues[i]['gstper'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);

          }
        }

      }
      else {
        let ctrl = this.toast.create({
          message: 'Enable Scheme(s) to Proceed',
          duration: 1000,
          position: 'bottom'
        });
        ctrl.present();

      }
    }
  }
  remove(i, data) {
    let indexx: number = this.collect.indexOf(data);
    if (indexx !== -1) {
      if (this.dues[i]['sel_due'] > 1) {
        if (this.dues[i]['scheme_type'] == 0 || this.dues[i]['scheme_type'] == 3) {
          if (this.dues[i]['gst_type'] == 0) {


            this.dues[i]['sel_due'] = parseInt(this.dues[i]['sel_due']) - 1;
            this.total -= (parseInt(this.dues[i]['payable'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);
          }
          else if (this.dues[i]['gst_type'] == 1) {


            this.dues[i]['sel_due'] = parseInt(this.dues[i]['sel_due']) - 1;
            this.total -= (parseInt(this.dues[i]['gstper'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);

          }

        }
        else if (this.dues[i]['scheme_type'] == 2) {
          if (this.dues[i]['gst_type'] == 0) {

            this.dues[i]['sel_due'] = parseInt(this.dues[i]['sel_due']) - 1;
            this.total -= (parseInt(this.dues[i]['payable'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);



          }
          else if (this.dues[i]['gst_type'] == 1) {

            this.dues[i]['sel_due'] = parseInt(this.dues[i]['sel_due']) - 1;
            this.total -= (parseInt(this.dues[i]['gstper'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);



          }
        }
        else if (this.dues[i]['scheme_type'] == 1 && this.dues[i]['is_flexible_wgt'] == 0) {
          if (this.dues[i]['gst_type'] == 0) {

            this.dues[i]['sel_due'] = parseInt(this.dues[i]['sel_due']) - 1;
            this.total -= (parseInt(this.dues[i]['max_wgt_rate'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);

          }
          else if (this.dues[i]['gst_type'] == 1) {

            this.dues[i]['sel_due'] = parseInt(this.dues[i]['sel_due']) - 1;
            this.total -= (parseInt(this.dues[i]['gstper'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);

          }
        }

      }
    }
    else {
      let ctrl = this.toast.create({
        message: 'Enable Scheme(s) to Proceed',
        duration: 1000,
        position: 'bottom'
      });
      ctrl.present();

    }

  }
  flex(data, i, details, idx) {

    console.log(idx)
    // this.i

    if (this.dues[i]['gst_type'] == 0) {

      let indexx: number = this.collect.indexOf(details);
      if (indexx !== -1) {

        this.color = true;
        this.dues[i]['cc'] = true;
        this.dues[i]['sub'] = idx;

        this.total -= (parseInt(this.dues[i]['max_wgt_rate']) * parseInt(this.dues[i]['sel_due'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);

        this.id_wt = data['id_weight'];
        this.id_sc = details['id_scheme_account'];

        // this.dues[i]['eligible_weight'] = data['weight']
        this.dues[i]['max_wgt_rate'] = data['rate']
        this.dues[i]['gstcalc'] = parseInt(this.dues[i]['max_wgt_rate']) * parseInt(this.dues[i]['gst']) / 100;
        console.log(data['weight'])
        // this.collect.forEach((d,idx)=>{

        //   if(data['id_scheme_account'] == d['id_scheme_account'] )
        //   {
        //   this.collect[idx]['max_weight'] = data['weight']
        //   this.collect[idx]['max_wgt_rate'] = data['rate']
        //   this.collect[idx]['gstcalc'] = parseInt(this.dues[i]['max_wgt_rate'] ) * parseInt(this.dues[i]['gst'] ) / 100;


        //   }
        // })
        this.total += (parseInt(this.dues[i]['max_wgt_rate']) * parseInt(this.dues[i]['sel_due'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);

        console.log(this.collect)

      }
      else {
        this.color = false;
        let ctrl = this.toast.create({
          message: 'Enable Scheme(s) to Proceed',
          duration: 1000,
          position: 'bottom'
        });
        ctrl.present();
      }
    }

    if (this.dues[i]['gst_type'] == 1) {

      let indexx: number = this.collect.indexOf(details);
      if (indexx !== -1) {
        this.color = true;
        this.dues[i]['cc'] = true;
        this.dues[i]['sub'] = idx;

        this.total -= (parseInt(this.dues[i]['gstper']) * parseInt(this.dues[i]['sel_due'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);
        this.id_wt = data['id_weight'];
        this.id_sc = details['id_scheme_account'];

       // this.dues[i]['eligible_weight'] = data['weight']
        this.dues[i]['gstcalc'] = parseInt(data['rate']) * parseInt(this.dues[i]['gst']) / 100;
        this.dues[i]['gstper'] = parseInt(data['rate']) + parseInt(this.dues[i]['gstcalc']);

        // this.collect.forEach((d,idx)=>{

        //   if(data['id_scheme_account'] == d['id_scheme_account'] )
        //   {
        //   this.collect[idx]['max_weight'] = data['weight']
        //   this.collect[idx]['gstper'] = data['rate'];
        //   this.collect[idx]['gstcalc'] = parseInt(this.dues[i]['gstper'] ) * parseInt(this.dues[i]['gst'] ) / 100;


        //   }
        // })
        this.total += (parseInt(this.dues[i]['gstper']) * parseInt(this.dues[i]['sel_due'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);
        console.log(this.collect);

      }
      else {
        this.color = false;
        let ctrl = this.toast.create({
          message: 'Enable Scheme(s) to Proceed',
          duration: 1000,
          position: 'bottom'
        });
        ctrl.present();
      }
    }
  }
  pop(i) {

    console.log(i)
    let mod = this.modal.create(CustomPopupPage, { data: i })
    mod.present();
  }

  check(i, details) {
    console.log(this.dues[i]);
    if (this.dues[i]['gst_type'] == 0) {

      let indexx: number = this.collect.indexOf(details);
console.log('indexx :',indexx)
      if (indexx !== -1) {
        console.log('111',this.dues[i].prev % this.dues[i].flx_denomintion == 0);
        console.log('222',this.dues[i].prev % this.dues[i].flx_denomintion);

        console.log('33',this.dues[i]['flexible_sch_type'] != 4);
        console.log(this.dues[i].prev <= this.dues[i].max_amount);
        console.log(this.dues[i].prev >= parseInt(this.dues[i].min_amount));
        console.log(this.dues[i].prev >= parseInt(this.dues[i].max_amount));


        if (this.dues[i].prev <= parseInt(this.dues[i].max_amount) && this.dues[i].prev >= parseInt(this.dues[i].min_amount)) {
          this.dues[i]['err'] = false;
          console.log('false');
          console.log('444',this.dues[i].prev % this.dues[i].flx_denomintion == 0);
          console.log('555',this.dues[i]['flexible_sch_type'] != 4);
          if (this.dues[i].prev % this.dues[i].flx_denomintion == 0 && this.dues[i]['flexible_sch_type'] != 4) {
            console.log('iff')
            /*   console.log('multi');
              this.total -= (parseInt(this.dues[i]['payable']) * parseInt(this.dues[i]['sel_due'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);
              this.total += (parseInt(this.dues[i]['prev']) * parseInt(this.dues[i]['sel_due'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);
              this.dues[i]['payable'] = parseInt(this.dues[i]['prev']);
              this.dues[i]['gstcalc'] = parseInt(this.dues[i]['payable']) * parseInt(this.dues[i]['gst']) / 100;
              console.log(this.total) */
            console.log('multi');
            this.total -= (parseInt(this.dues[i]['payable']) * parseInt(this.dues[i]['sel_due'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);
            this.total += (parseInt(this.dues[i]['prev']) * parseInt(this.dues[i]['sel_due'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);
            this.dues[i]['payable'] = parseInt(this.dues[i]['prev']);
            this.dues[i]['gstcalc'] = parseInt(this.dues[i]['payable']) * parseInt(this.dues[i]['gst']) / 100;
            console.log(this.total)
          } else {
            console.log('else')
            console.log(this.dues[i]['flexible_sch_type'])
            if (this.dues[i]['flexible_sch_type'] != 4 && this.dues[i]['flx_denomintion'] != null && this.dues[i].prev % this.dues[i].flx_denomintion != 0) {
              this.dues[i]['err'] = 'multi';
              console.log(this.total)
            }
            console.log('else 2');
            this.total -= (parseInt(this.dues[i]['payable']) * parseInt(this.dues[i]['sel_due'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);
            this.total += (parseInt(this.dues[i]['prev']) * parseInt(this.dues[i]['sel_due'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);
            this.dues[i]['payable'] = parseInt(this.dues[i]['prev']);
            this.dues[i]['gstcalc'] = parseInt(this.dues[i]['payable']) * parseInt(this.dues[i]['gst']) / 100;
          }
        }
        else {
          console.log('err')
          this.dues[i]['err'] = true;
        }
      }
      else {
        this.color = false;
        let ctrl = this.toast.create({
          message: 'Enable Scheme(s) to Proceed',
          duration: 1000,
          position: 'bottom'
        });
        ctrl.present();
      }
    }
    /*     if (this.dues[i]['gst_type'] == 1) {

          let indexx: number = this.collect.indexOf(details);

          if (indexx !== -1) {


            if (this.dues[i].prev <= this.dues[i].max_amount && this.dues[i].prev >= parseInt(this.dues[i].min_amount)) {

              this.dues[i]['err'] = false;


              this.total -= (parseInt(this.dues[i]['gstper']) * parseInt(this.dues[i]['sel_due']))- parseInt(this.dues[i]['disamt']) +  parseInt(this.dues[i]['conv']);

              this.dues[i]['gstper'] = parseInt(this.dues[i]['prev']);
              this.dues[i]['payable'] = parseInt(this.dues[i]['prev']);

              this.dues[i]['gstcalc'] = parseInt(this.dues[i]['gstper']) * parseInt(this.dues[i]['gst']) / 100;
              this.dues[i]['gstper'] = parseInt(this.dues[i]['gstper']) * parseInt(this.dues[i]['sel_due']) + parseInt(this.dues[i]['gstcalc']);
              this.total += (parseInt(this.dues[i]['gstper']) * parseInt(this.dues[i]['sel_due']))- parseInt(this.dues[i]['disamt']) +  parseInt(this.dues[i]['conv']);

              console.log(this.total)
            }
            else {
              this.dues[i]['err'] = true;
            }
          }
          else {
            this.color = false;
            let ctrl = this.toast.create({
              message: 'Enable Scheme(s) to Proceed',
              duration: 1000,
              position: 'bottom'
            });
            ctrl.present();
          }
        } */

    if (this.dues[i]['gst_type'] == 1) {
      let indexx: number = this.collect.indexOf(details);
      if (indexx !== -1) {
        if (this.dues[i].prev <= parseInt(this.dues[i].max_amount) && this.dues[i].prev >= parseInt(this.dues[i].min_amount)) {
          this.dues[i]['err'] = false;
          if (this.dues[i].prev % this.dues[i].flx_denomintion == 0 && this.dues[i]['flexible_sch_type'] != 4) {

            this.total -= (parseInt(this.dues[i]['gstper']) * parseInt(this.dues[i]['sel_due'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);
            this.dues[i]['gstper'] = parseInt(this.dues[i]['prev']);
            this.dues[i]['payable'] = parseInt(this.dues[i]['prev']);
            this.dues[i]['gstcalc'] = parseInt(this.dues[i]['gstper']) * parseInt(this.dues[i]['gst']) / 100;
            this.dues[i]['gstper'] = parseInt(this.dues[i]['gstper']) * parseInt(this.dues[i]['sel_due']) + parseInt(this.dues[i]['gstcalc']);
            this.total += (parseInt(this.dues[i]['gstper']) * parseInt(this.dues[i]['sel_due'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);
            console.log(this.total)
          } else {
            console.log(this.dues[i]['flexible_sch_type'])
            if (this.dues[i]['flexible_sch_type'] != 4 && this.dues[i]['flx_denomintion'] != null && this.dues[i].prev % this.dues[i].flx_denomintion != 0) {
              this.dues[i]['err'] = 'multi';
              console.log(this.total)
            }

            this.total -= (parseInt(this.dues[i]['gstper']) * parseInt(this.dues[i]['sel_due'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);
            this.dues[i]['gstper'] = parseInt(this.dues[i]['prev']);
            this.dues[i]['payable'] = parseInt(this.dues[i]['prev']);
            this.dues[i]['gstcalc'] = parseInt(this.dues[i]['gstper']) * parseInt(this.dues[i]['gst']) / 100;
            this.dues[i]['gstper'] = parseInt(this.dues[i]['gstper']) * parseInt(this.dues[i]['sel_due']) + parseInt(this.dues[i]['gstcalc']);
            this.total += (parseInt(this.dues[i]['gstper']) * parseInt(this.dues[i]['sel_due'])) - parseInt(this.dues[i]['disamt']) + parseInt(this.dues[i]['conv']);
            console.log(this.total)

          }
        }
        else {
          this.dues[i]['err'] = true;
        }
      }
      else {
        this.color = false;
        let ctrl = this.toast.create({
          message: 'Enable Scheme(s) to Proceed',
          duration: 1000,
          position: 'bottom'
        });
        ctrl.present();
      }
    }



  }
  checkw(item, details) {

    console.log(item.weight <= details.tempeligible_weight)
    console.log(item)
    console.log(details)
    console.log(item['tempeligible_weight'])
    return item.weight <= details['tempeligible_weight'];
  }
  pay() {

    let mod = this.modal.create(PaydetailmodalPage, { data: this.collect, total: this.total })
    mod.present();

  }

  public onKeyUp(event: any) {
    //const NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
    const NUMBER_REGEXP = /^[0-9]*$/;
    let newValue = event.target.value;
    let regExp = new RegExp(NUMBER_REGEXP);

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
      return true;
    } else {
      return false;
    }
  }
  /*   proceed(){
      // filter
      this.collect.forEach((item) => {
        console.log(item.prev);
                if (item['scheme_type'] == 3) {

                  if (item.prev < item.min_amount && item.amount > item.max_amount) {

                  }

                }

              });
    } */
  continue() {

    var temp = this.collect.filter(item => item['err'] == true || item['err'] == 'multi')

    console.log(temp)
    console.log(temp.length)
    console.log(this.currency['currency']['useWalletForChit']);
    console.log(this.collect);

    if (this.collect.length > 0) {
      if (temp.length == 0) {
        console.log(this.wallet);

        if (this.wallet != 0 && this.wallet != null && this.currency['currency']['useWalletForChit'] == 1) {
          let mod = this.modal.create(WalletmodalPage, { data: this.wallet, detail: this.collect, payable: this.total });
          mod.present();
        }
        else {
          this.navCtrl.push(PaymentPage, { redm: 0, data: this.total, detail: this.collect, payable: this.total, cusmobno: this.cusmobno })
          console.log();
          console.log('total' + this.total);
        }
      }

      else {
        let ctrl = this.toast.create({
          message: 'Please Enter Correct Value',
          duration: 1000,
          position: 'bottom'
        });
        ctrl.present();
      }
    }
    else {
      let ctrl = this.toast.create({
        message: 'Select Scheme(s) to Proceed',
        duration: 1000,
        position: 'bottom'
      });
      ctrl.present();
    }

  }

  goBack($event) {
    console.log('true');
    //  ctrl.present();
    //this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().setRoot(HomePage);

    //  this.navCtrl.setRoot(HomePage);
  }

  payhistory() {
    console.log('true');
    this.navCtrl.push(PaymenthisPage, { cusmobno: this.cusmobno });
  }
  tostcheck(){
    if(this.collect.length>=15){
      let ctrl = this.toast.create({
        message: 'Maximum 15 Dues Only Allowed',
        duration: 2000,
        position: 'bottom'
      });
      ctrl.present();
    }
  }
}
