import { GoldratemodelPage } from './../goldratemodel/goldratemodel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController, AlertController, Events } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { BranchPage } from '../branch/branch';
import { DynamictermsPage } from '../dynamicterms/dynamicterms';
import { PayduesPage } from '../paydues/paydues';
import { WalletmodalPage } from '../walletmodal/walletmodal';
import { PaymentPage } from '../payment/payment';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
declare var cordova: any;

/**
 * Generated class for the ConfirmschemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-confirmscheme',
  templateUrl: 'confirmscheme.html',
  providers: [CommonProvider]

})
export class ConfirmschemePage {

  nadata: any = '';
  total: any = 0;
  branchname: any = '';
  branchid: any = '';
  wallet: any = 0;
  collect: any[] = [];

  accountname: any = '';
  refcode: any = '';
  agentcode: any = '';
  currency: any = '';
  payamt: any = '';
  toggle: any = true;
  pancode: any = '';
  status: any = false;
  err: any = false;
  id_branch: any = null;
  errormsg: any = '';
  allowjoin: any = false;
  branch_settings: any = '';
  is_branchwise_cus_reg: any = '';
  //  payoption:any;

  terms: any = false;
  wt: any[] = [];
  count: any[] = [];
  gifts: any[] = [];
  id_gift: any = '';
  reademp: any = false;
  readagent: any = false;
  logintype: any = '';

  classimage = this.navParams.get('classimage');
  particularschData = this.navParams.get('data');
  cusdata: any = this.navParams.get('cusData');

  checknet = localStorage.getItem('checknetwork');

  idfrontbase64: any = '';
  idbackbase64: any = '';
  frontname:any='';
  backname:any='';

  constructor(private toastCtrl: ToastController,private camera: Camera,private storage: Storage, public events: Events, public alertCtrl: AlertController, public toast: ToastController, public modal: ModalController, public load: LoadingController, public comman: CommonProvider, public navCtrl: NavController, public navParams: NavParams) {

    console.log(this.particularschData);
    console.log(this.cusdata)

    this.events.subscribe('checknetwork', (data) => {
      this.checknet = data;
      console.log(11111111111111111, data)
    });


    if (this.checknet == 'offline') {
      // offline
      this.nadata = this.particularschData[0];
      console.log('scheme: ', this.nadata);
      if (this.nadata['scheme_type'] == 0) {
        this.total = this.nadata['total_installments'] * this.nadata['amount'];
      }
      else if (this.nadata['scheme_type'] == 2) {
        this.total = this.nadata['total_installments'] * this.nadata['amount'];
      }
      else if (this.nadata['scheme_type'] == 1) {
        this.total = this.nadata['total_installments'] * this.nadata['max_weight'];
      }
    } else {

      // online Data :
      let loader = this.load.create({
      //  content: 'Please Wait',
        spinner: 'crescent',
      });
      loader.present();


      var currentcusData = JSON.parse(localStorage.getItem('customerData'));
      console.log(currentcusData)
      var currentUser = JSON.parse(localStorage.getItem('sssuser'));
      console.log(currentUser)
      this.logintype = currentUser['employee']['login_type']
      console.log(this.logintype);
      this.comman.getwt().then(data => {
        this.wt = data['weights']
      })
      this.comman.getcurrency(this.id_branch).then(data => {

        this.currency = data['currency'];
        this.branch_settings = data['currency']['branch_settings'];
        this.is_branchwise_cus_reg = data['currency']['is_branchwise_cus_reg'];
        console.log(this.branch_settings);
        console.log(this.is_branchwise_cus_reg);
        console.log(this.navParams.get('data')['id_scheme']);
        this.comman.joinscheme(this.navParams.get('data')['id_scheme']).then(data => {
          this.nadata = data['scheme'];
          this.wallet = data['wallet_balance']['wal_balance'];
          this.gifts = this.nadata['gifts']
          console.log(this.gifts);
          console.log(this.nadata['scheme_name']);
          if (data['status'] == false) {
            console.log(data['status']);
           // this.errormsg = data['msg']
           // console.log(this.nadata['allow_join']['msg']);
            this.wallet = data['wallet_balance']['wal_balance'];
            console.log(this.wallet)
            this.allowjoin = false;
          } else {
            this.allowjoin = true;
          }
          if (this.nadata['scheme_type'] == 0) {
            this.total = this.nadata['total_installments'] * this.nadata['amount'];
          }
          else if (this.nadata['scheme_type'] == 2) {
            this.total = this.nadata['total_installments'] * this.nadata['amount'];
          }
          else if (this.nadata['scheme_type'] == 1) {
            this.total = this.nadata['total_installments'] * this.nadata['max_weight'];
          }
          console.log(this.currency)
          console.log(this.nadata)

          var currentUser = JSON.parse(localStorage.getItem('sssuser'));
          console.log(currentUser)

          this.logintype = currentUser['employee']['login_type']
          console.log(this.logintype);

          if (this.currency['allow_referral'] == 1 && this.nadata['show_referral'] && this.logintype == "EMP") {
            this.refcode = currentUser['employee']['emp_ref_code'];
            console.log(this.refcode)
            this.readagent = true;
            console.log(this.reademp);
          }
          else if (this.currency['allow_referral'] == 1 && this.nadata['agent_refferal'] == 1 && this.logintype == "AGENT") {
            console.log(currentUser['employee']['agent_code']);
            this.agentcode = currentUser['employee']['agent_code'];
            console.log(this.agentcode);
            this.reademp = true;
            console.log(this.reademp);
          }
          loader.dismiss();
        })
      })

    }

   // loader.dismiss();

  }


  tog() {

    if (this.toggle == true) {
      this.toggle = false;
    }
    else {
      this.toggle = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmschemePage');
  }

  agree(e) {
    this.status = e.value;
    console.log(e);
  }

  openmodal() {

    let mod = this.modal.create(BranchPage)
    mod.present();
    mod.onDidDismiss(data => {
      console.log(data)
      if (data != undefined) {
        this.branchname = data['name']
        this.branchid = data['id_branch']
      }
    });

    console.log('1111')
  }
  public onKeyUp(event: any) {
    //   console.log(event)
    const NUMBER_REGEXP = /^[a-zA-Z ]*$/;
    let newValue = event.target.value;
    let regExp = new RegExp(NUMBER_REGEXP);

    if (!regExp.test(newValue)) {
      let toast = this.toast.create({
        message: "AccountName must contain alphabets only",
        position: 'bottom',
        duration: 6000
      });
      toast.present();
      // return true;
      this.allowjoin = false;
      console.log('true');
    } else {
      // return false;
      this.allowjoin = true;
      console.log('false');
    }
  }

  confirm() {

    if (this.checknet == 'offline') {
      // offline

      var currentUser = JSON.parse(localStorage.getItem('sssuser'));
      console.log(currentUser['employee']['id_branch']);

      var temp = {
        'id_customer': this.cusdata['id_customer'],
        "is_new": "Y",
        "referal_code": currentUser['employee']['emp_ref_code'],
        "agentcode": currentUser['employee']['agent_code'],
        "id_gift": this.nadata['has_gift'] == 1 ? this.id_gift : null,
        "login_type": currentUser['employee']['login_type'],

        account_name: this.accountname,
        allowPayDisc: 0,
        allow_pay: "Y",
        allow_unpaid_months: "0",
        allowed_dues: 0,
        branch_name: "NAC",
        branch_settings: "1",
        cc: false,
        charge: "0.00",
        charge_head: "Convenience fees",
        charge_type: "0",
        chit_number: this.nadata['code'],
        code: this.nadata['code'],
        cur_month_pdc: "0",
        currency_symbol: "INR",
        current_chances_pay: "0",
        current_chances_used: "1",
        current_date: new Date().getTime(),
        current_paid_installments: "1",
        current_total_amount: "0",
        current_total_weight: "0.000",
        currentmonthpaycount: "1",
        discount_val: "0.00",
        due_type:this.nadata['due_type'],
        eligible_weight: 0,
        err: false,
        firstPayDisc: "00",
        firstPayDisc_by: "0",
        firstPayamt_as_payamt: "0",
        firstPayamt_payable: null,
        firstPayment_amt: null,
        fixed_metal_rate: "NO",
        fixed_rate: null,
        fixed_wgt: "0.000",
        flexible_sch_type: this.nadata['flexible_sch_type'],
        flx_denomintion: this.nadata['flx_denomintion'],
        get_amt_in_schjoin: null,
        gst: "0",
        gst_type: "0",
        gstcalc: 0,
        gstper: 0,
        "id_branch": this.branchid == "" ? (currentUser['employee']['id_branch'] == "" ? null : currentUser['employee']['id_branch']) : this.branchid,
        id_scheme_account: "",
        isPaymentExist: true,
        isPendingStatExist: false,
        is_flexible_wgt: "0",
        is_pan_required: "0",
        last_paid_date: "00-00-0000",
        last_paid_duration: "0",
        last_paid_month: "10",

        last_transaction:
        {
          no_of_dues: '1',
          payment_amount: this.nadata['amount'],
          due_type: 'ND',
          act_amount: null,
          payment_status: '1'
        },

        maturity_date: null,
        max_allowed_limit: this.nadata['max_allowed_limit'] ,
        max_amount: this.nadata['max_amount'],
        max_chance: "0",
        max_weight: this.nadata['max_weight'],
        max_wgt_rate: currentUser['currency']['metal_rates']['goldrate_22ct'] * this.nadata['max_weight'],
        metal_rate: currentUser['currency']['metal_rates']['goldrate_22ct'],
        min_amount: this.nadata['min_amount'],
        min_chance: "1",
        mobile: this.cusdata['mobile'],
        multiply_value: this.nadata['flx_denomintion'],
        one_time_premium: this.nadata['one_time_premium'],
        otp_price_fixing: "0",
        paid_gst: "0",
        paid_installments: "0",
        pay_duration: "0",
        payable: this.nadata['scheme_type'] != 3 ? this.nadata['scheme_type'] == 1 ? this.nadata['max_weight'] : this.nadata['amount'] : this.nadata['max_amount'],
        pdc_payments: null,
        prev: this.nadata['max_amount'],
        previous_amount_eligible: "1",
        read: true,
        scheme_type: this.nadata['scheme_type'],
        sel_due: this.nadata['sel_due'],
        short_name: this.nadata['code'],
        start_date: new Date().getTime(),
        sub: null,
        temp_max_weight: 0,
        temp_max_wgt_rate: 0,
        temp_payable: this.nadata['max_amount'],
        tempeligible_weight: 0,
        total_installments: this.nadata['total_installments'],
        total_paid_amount: "0",
        total_paid_weight: "0.000",
        totalunpaid: "0",
        wgt_convert: "2",
        id_scheme:this.nadata['id_scheme']

      }

      console.log(temp);

      if (this.accountname != '') {
        if (this.status == true) {
          let confirm = this.alertCtrl.create({
            title: 'Confirm Purchase Plan Joining',
            subTitle: 'Are you sure to join this plan' + ' ' + this.nadata['scheme_name'] + '?',
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
                  console.log('yes')
                  this.storage.get('onlineSetData').then((val) => {
                    if (val != null) {
                      let whole: any = JSON.parse(val);
                      console.log(whole)
                      let ind = JSON.parse(val)['customer'].findIndex(data => data['mobile'] == this.cusdata['mobile'])
                      console.log(ind)
                      console.log(this.cusdata['mobile'])
                      JSON.parse(val)['customer'][ind]['payments'] != null ? whole['customer'][ind]['payments']['chits'].push(temp) : whole['customer'][ind]['payments'] = { 'chits': [temp] };
                      this.storage.set('onlineSetData', JSON.stringify(whole)).then((val) => {
                        var tempchkmob = JSON.parse(val)['customer'].filter(item => item['mobile'] == this.cusdata['mobile']);
                        console.log('tempchkmob :', tempchkmob);
                        this.navCtrl.push(PayduesPage, { 'offlineCusCurrentPay': tempchkmob })
                      });
                    }
                  });
                }
              }]
          })

          confirm.present();
        } else {
          let ctrl = this.toast.create({
            message: "Please Accept Terms and Conditions",
            duration: 3000,
            position: 'bottom'
          });
          ctrl.present();
        }
      } else {
        let ctrl = this.toast.create({
          message: "Please Fill Account Name",
          duration: 3000,
          position: 'bottom'
        });
        ctrl.present();
      }

    } else {

      // online Data

      var regexp = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
      var validPan = regexp.test(this.pancode.toUpperCase());

      console.log(this.nadata['acc_name']);
      console.log(validPan)
      var proceed = this.nadata['get_amt_in_schjoin'] == 1 ? true : false;
      var bran = (this.nadata['branch_settings'] == 1 && this.is_branchwise_cus_reg != 1) ? true : false;
      console.log(bran);

      if (this.accountname != '' && (this.branchid != '' || bran == false) && this.status == true && this.err == false) {

        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        console.log(currentUser['employee']['id_branch']);
        console.log(this.accountname);
        var currentcusData = JSON.parse(localStorage.getItem('customerData'));

        var post = {

          "id_customer": currentcusData['id_customer'],
          "mobile": currentcusData['mobile'],
          "id_scheme": this.nadata['id_scheme'],
          "group_code": this.nadata['code'],
          "scheme_acc_number": "",
          "account_name": this.accountname,
          "pan_no": this.pancode,
          "id_branch": this.branchid == "" ? (currentUser['employee']['id_branch'] == "" ? null : currentUser['employee']['id_branch']) : this.branchid,
          "is_new": "Y",
          "referal_code": this.refcode,
          "agentcode": this.agentcode,
          "payable": this.payamt,
          //  "payoption": this.payoption
          "id_gift": this.nadata['has_gift'] == 1 ? this.id_gift : null,
          "login_type": currentUser['employee']['login_type'],
          'idfront' :this.idfrontbase64,
          'idback' :this.idbackbase64,

        }

        console.log(post);

        if (this.nadata['is_pan_required'] == 1 && this.pancode.length == 10 && validPan == true) {

          let confirm = this.alertCtrl.create({
            title: 'Confirm Purchase Plan Joining',
            subTitle: 'Are you sure to join this plan' + ' ' + this.nadata['scheme_name'] + '?',
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

                  let loader = this.load.create({
                  //  content: 'Please Wait',
                    spinner: 'crescent',
                  });
                  loader.present();
                  console.log('no')
                  this.comman.createac(post).then(data => {

                    if (data['free_pay'] == '') {
                      console.log('ifff')

                      if (data['status']) {
                        console.log(data['status']);

                        let ctrl = this.toast.create({
                          message: data['msg'],
                          duration: 3000,
                          position: 'bottom'
                        });
                        loader.dismiss();
                        ctrl.present();

                        //  if (this.nadata['scheme_type'] == 0 || this.nadata['scheme_type'] == 2 || (this.nadata['scheme_type'] == 3 && this.nadata['get_amt_in_schjoin'] == 1)) {

                        //for wallet amount chk
                        if (this.wallet == 0 && this.wallet.length > 0 && this.currency['allow_wallet'] == 1) {
                          this.collect.push(data['chit']);
                          console.log(data['chit']);
                          this.navCtrl.push(PaymentPage, { redm: 0, data: this.payamt, detail: this.collect, payable: this.payamt })
                          console.log(this.total);
                          console.log(this.collect);
                          console.log(this.payamt);

                        }
                        else {
                      var currentcusData = JSON.parse(localStorage.getItem('customerData'));
                          var postdata = {
                            'id_employee': currentUser['employee']['id_employee'],
                            'login_type': currentUser['employee']['login_type'],
                            'cusmobile': currentcusData['mobile'],
                            'emp_branch': currentUser['employee']['id_branch'],
                            'branch_settings': this.currency['branch_settings'],
                            'schemecode': "",
                            'year': "",
                            'schemeaccno': ""
                        }
                        console.log(postdata);
                        localStorage.setItem('postdata', JSON.stringify(postdata));
                          this.navCtrl.push(PayduesPage)
                        }

                        //  this.navCtrl.push(PayduesPage)
                      }
                      else {
                        let ctrl = this.toast.create({
                          message: data['msg'],
                          duration: 3000,
                          position: 'bottom'
                        });
                        loader.dismiss();
                        ctrl.present();
                      }
                    }
                    else {
                      console.log('elee')
                      if (data['status']) {
                        let ctrl = this.toast.create({
                          message: data['free_pay'],
                          duration: 3000,
                          position: 'middle'
                        });
                        loader.dismiss();
                        ctrl.present();
                        var currentcusData = JSON.parse(localStorage.getItem('customerData'));
                        var postdata = {
                          'id_employee': currentUser['employee']['id_employee'],
                          'login_type': currentUser['employee']['login_type'],
                          'cusmobile': currentcusData['mobile'],
                          'emp_branch': currentUser['employee']['id_branch'],
                          'branch_settings': this.currency['branch_settings'],
                          'schemecode': "",
                          'year': "",
                          'schemeaccno': ""
                      }
                      console.log(postdata);
                      localStorage.setItem('postdata', JSON.stringify(postdata));
                        this.navCtrl.push(PayduesPage)
                      }
                      else {
                        let ctrl = this.toast.create({
                          message: data['msg'],
                          duration: 3000,
                          position: 'bottom'
                        });
                        loader.dismiss();
                        ctrl.present();
                      }
                    }
                  })
                }
              }
            ]
          });
          confirm.present();
        }
        else if (this.nadata['is_pan_required'] == 0) {

          let confirm = this.alertCtrl.create({
            title: 'Confirm Purchase Plan Joining',
            subTitle: 'Are you sure to join this plan' + ' ' + this.nadata['scheme_name'] + '?',
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
                  let loader = this.load.create({
                   // content: 'Please Wait',
                    spinner: 'crescent',
                  });
                  loader.present();
                  console.log('no');
                  this.comman.createac(post).then(data => {

                    if (data['free_pay'] == '') {

                      if (data['status']) {
                        console.log(data['status']);
                        let ctrl = this.toast.create({
                          message: data['msg'],
                          duration: 3000,
                          position: 'bottom'
                        });
                        loader.dismiss();
                        ctrl.present();
                        console.log(this.wallet);
                        console.log(this.nadata['get_amt_in_schjoin'])
                        console.log(this.nadata['scheme_type'] == 0 || this.nadata['scheme_type'] == 2 || (this.nadata['scheme_type'] == 3 && this.nadata['get_amt_in_schjoin'] == 1))
                        //     if (this.nadata['scheme_type'] == 0 || this.nadata['scheme_type'] == 2 || (this.nadata['scheme_type'] == 3 && this.nadata['get_amt_in_schjoin'] == 1)) {
                        console.log('wallet_balance')
                        //for wallet amount chk
                        if (this.wallet == 0 && this.currency['allow_wallet'] == 1) {
                          this.collect.push(data['chit']);
                          console.log(data['chit']);
                          this.navCtrl.push(PaymentPage, { redm: 0, data: this.payamt, detail: this.collect, payable: this.payamt, total: this.payamt })
                          console.log(this.total);
                          console.log(this.collect);
                          console.log(this.payamt);
                        } else {
                          console.log('go to paydues page');
                          var currentcusData = JSON.parse(localStorage.getItem('customerData'));
                          var postdata = {
                            'id_employee': currentUser['employee']['id_employee'],
                            'login_type': currentUser['employee']['login_type'],
                            'cusmobile': currentcusData['mobile'],
                            'emp_branch': currentUser['employee']['id_branch'],
                            'branch_settings': this.currency['branch_settings'],
                            'schemecode': "",
                            'year': "",
                            'schemeaccno': ""
                        }
                        console.log(postdata);
                        localStorage.setItem('postdata', JSON.stringify(postdata));
                          this.navCtrl.push(PayduesPage)
                        }

                      }
                      else {
                        let ctrl = this.toast.create({
                          message: data['msg'],
                          duration: 3000,
                          position: 'bottom'
                        });
                        loader.dismiss();
                        ctrl.present();
                      }
                    }
                    else {

                      if (data['status']) {
                        let ctrl = this.toast.create({
                          message: data['free_pay'],
                          duration: 3000,
                          position: 'middle'
                        });
                        loader.dismiss();

                        ctrl.present();
                        var currentcusData = JSON.parse(localStorage.getItem('customerData'));
                        var postdata = {
                          'id_employee': currentUser['employee']['id_employee'],
                          'login_type': currentUser['employee']['login_type'],
                          'cusmobile': currentcusData['mobile'],
                          'emp_branch': currentUser['employee']['id_branch'],
                          'branch_settings': this.currency['branch_settings'],
                          'schemecode': "",
                          'year': "",
                          'schemeaccno': ""
                      }
                      console.log(postdata);
                      localStorage.setItem('postdata', JSON.stringify(postdata));
                        this.navCtrl.push(PayduesPage)
                      }
                      else {
                        let ctrl = this.toast.create({
                          message: data['msg'],
                          duration: 3000,
                          position: 'bottom'
                        });
                        loader.dismiss();
                        ctrl.present();
                      }
                    }
                  })
                }
              }
            ]
          });
          confirm.present();
        }
        else {
          let ctrl = this.toast.create({
            message: "Please Enter Valid PAN No",
            duration: 3000,
            position: 'bottom'
          });
          ctrl.present();
        }
      }
      else {
        if (this.accountname == '') {
          let ctrl = this.toast.create({
            message: "Please Fill Account Name",
            duration: 3000,
            position: 'bottom'
          });
          ctrl.present();
        }
        else if (this.status == false) {
          let ctrl = this.toast.create({
            message: "Please Accept Terms and Conditions",
            duration: 3000,
            position: 'bottom'
          });
          ctrl.present();
        }
        else if (this.branchid == '' && this.nadata['branch_settings'] == 1 && this.is_branchwise_cus_reg != 1) {
          let ctrl = this.toast.create({
            message: "Please Select Branch",
            duration: 3000,
            position: 'bottom'
          });
          ctrl.present();
        }
        else if (this.payamt == '' && this.nadata['scheme_type'] == 3 && this.nadata['get_amt_in_schjoin'] == 1) {
          let ctrl = this.toast.create({
            message: "Please Enter Valuable Amount",
            duration: 3000,
            position: 'bottom'
          });
          ctrl.present();
        }

      }
    }

  }

  check() {
    console.log(this.payamt);
    console.log(this.nadata.max_amount);
    console.log(this.nadata.min_amount);
    console.log(parseInt(this.payamt) <= parseInt(this.nadata.max_amount) && parseInt(this.payamt) >= parseInt(this.nadata.min_amount));

    if (parseInt(this.payamt) <= parseInt(this.nadata.max_amount) && parseInt(this.payamt) >= parseInt(this.nadata.min_amount)) {
      console.log(parseInt(this.payamt) % parseInt(this.nadata['flx_denomintion']));
      if (parseInt(this.payamt) % parseInt(this.nadata['flx_denomintion'])) {
        console.log('multi');
        this.err = 'multi';
      } else {
        this.err = false;
        console.log('else');
      }
    } else {
      this.err = true;
    }
  }

  dynamic() {

    this.navCtrl.push(DynamictermsPage)
  }
  paydue() {

    this.navCtrl.push(PayduesPage)
  }
  ionViewWillEnter() {
    let user = true;
    this.events.publish('user:created', user);

  }


  public takePicture(sourceType, type) {
    console.log(sourceType)
    console.log(type)
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      //  destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true,
    };

    console.log(options)

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      if(type=='front'){
        this.frontname = 'front.jpg';
      }
      else if(type == 'back'){
        this.backname = 'back.jpg';
      }
      console.log(imagePath)
      let base64Image = 'data:image/jpeg;base64,' + imagePath;
      console.log(base64Image)

      this.uploadImage(base64Image, type);

    }, (err) => {
      console.log(err)
      this.presentToast('Error while selecting image.');
    })
  }
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }


  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 6000,
      position: 'middle'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage(base64Image, type) {
    console.log(base64Image);
    console.log(type);
    if (type == 'front') {
      this.idfrontbase64 = base64Image;
      console.log(this.idfrontbase64)
    } else if (type == 'back') {
      this.idbackbase64 = base64Image;
      console.log(this.idbackbase64)
    }

    // Destination URL
    var d = new Date(),
      n = d.getTime()
    // File for Upload
    var targetPath = this.pathForImage(base64Image) + '?nocache=' + n;
    // File name only
    var filename = base64Image;
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      params: {
        fileName: filename
      }
    };
    console.log("options",options)


}

metal(){
  console.log('test')
  let mod = this.modal.create(GoldratemodelPage);
  mod.present();

}
}
