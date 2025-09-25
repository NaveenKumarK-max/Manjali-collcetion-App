import { GoldratemodelPage } from './../goldratemodel/goldratemodel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController, Events, ViewController, App, AlertController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { ConfirmschemePage } from '../confirmscheme/confirmscheme';
import { LoginPage } from '../login/login';
import { CheckschemePage } from '../checkscheme/checkscheme';
import { trigger, state, style, transition, animate, keyframes, ElementRef } from '@angular/core';
import { PayduesPage } from '../paydues/paydues';
import { ClassiPopupPage } from '../classi-popup/classi-popup';
import { KycPage } from '../kyc/kyc';
import { RatefixdisclaimerPage } from '../ratefixdisclaimer/ratefixdisclaimer';
import { EditprofilePage } from '../editprofile/editprofile';
/**
 * Generated class for the JoinschemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-joinscheme',
  templateUrl: 'joinscheme.html',
  providers: [CommonProvider],

  animations: [
    trigger('flyInTopSlow', [
      state("0", style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => 0', [
        animate('500ms ease-in', keyframes([
          style({ transform: 'translate3d(0,-500px,0)', offset: 0 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ]),

    trigger('flyAlternameSlow', [
      state("1", style({
        transform: 'translate3d(0,0,0)'
      })),
      state("0", style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => 1', [
        animate('1000ms ease-in', keyframes([
          style({ transform: 'translate3d(500px,0,0', offset: 0 }),
          style({ transform: 'translate3d(-10px,0,0)', offset: 0.5 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ]),
      transition('* => 0', [
        animate('1000ms ease-in', keyframes([
          style({ transform: 'translate3d(-1000px,0,0', offset: 0 }),
          style({ transform: 'translate3d(10px,0,0)', offset: 0.5 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ])

  ]

})
export class JoinschemePage {

  join: any[] = [];
  allow_join: any = true;
  alert_msg: any = '';
  desc: any = '';
  toggle: any = true;
  currency: any = { 'currency': { 'currency_symbol': '' } };
  currency_symbol: any = [];
  count: any[] = [];
  classimage: any = this.navParams.get('id');
  id_branch: any = null;
  joinbttn = true;

  schemeData = this.navParams.get('ActiveSchemes');
  cusdata: any = this.navParams.get('cusData');

  customerData: any = this.navParams.get('customerData');

  checknet = localStorage.getItem('checknetwork');

  constructor(public alertCtrl: AlertController, public events: Events, public load: LoadingController, public comman: CommonProvider, public navCtrl: NavController, public navParams: NavParams, public modal: ModalController, public toast: ToastController, public appCtrl: App, public viewCtrl: ViewController) {
    console.log(this.schemeData);
    console.log(this.cusdata);

    this.events.subscribe('checknetwork', (data) => {
      this.checknet = data;
      console.log(11111111111111111, data)
    });



    if (this.checknet == 'offline') {

      console.log(this.classimage)
      this.join = this.schemeData;
      console.log(this.join);
      this.cusdata = this.navParams.get('cusData')
      console.log('offline',this.cusdata);

    } else {
      // online Data :
      let loader = this.load.create({
       // content: 'Please Wait',
        spinner: 'crescent',
      });
      loader.present();

      this.cusdata = this.navParams.get('customerData');
      console.log('onine',this.cusdata);

      this.comman.getjoinscheme().then(data => {
        this.desc = this.navParams.get('id')['description']
        this.join = data.filter(data => (data['id_classification'] == this.navParams.get('id')['id_classification']));
        console.log(this.join);
        loader.dismiss();
        //
      })
      this.comman.getcurrency(this.id_branch).then(data => {
        this.currency = data;
      })

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinschemePage');
  }
  tog() {
    if (this.toggle == true) {
      this.toggle = false;
    }
    else {
      this.toggle = true;
    }
  }

  // this is KYC work based & Disclaimer Popup page redirect

  conf(data) {
    console.log(data)
    let status = JSON.parse(localStorage.getItem('logstatus'));
    console.log("Status" + status);
    if (status == false || status == null) {
      this.navCtrl.setRoot(LoginPage)
    }
    else {

      if (this.checknet == 'offline') {
        // offline
        console.log(data);
        console.log(this.schemeData);
        var particularScheme = this.schemeData.filter(item => item['id_scheme'] == data.id_scheme);
        console.log(particularScheme);
        this.navCtrl.push(ConfirmschemePage, { 'data': particularScheme, 'cusData': this.cusdata })
      } else {

        // online Data :

        if (status == false || status == null) {
          this.navCtrl.setRoot(LoginPage)
        }
        else {
          if (data.get_cus_pan == 1 || data.get_cus_nominee == 1) {
            if (data.get_cus_pan == 1 && data.get_cus_nominee == 1) {
              var subtitle = "Kindly update PAN and nominee details to join plan. ";
            }
            else if (data.get_cus_pan == 1) {
              var subtitle = "Kindly update PAN details to join plan. ";
            }
            else if (data.get_cus_nominee == 1) {
              var subtitle = "Kindly update nominee details to join plan. ";
            }
            let confirm = this.alertCtrl.create({
              title: "Update Profile",
              subTitle: subtitle,
              buttons: [
                {
                  text: 'Cancel',
                  handler: () => {
                    console.log('Disagree clicked');
                  }
                }, {
                  text: 'Update Now',
                  handler: () => {
                    this.navCtrl.push(EditprofilePage, { 'data': data, 'classimage': this.classimage, 'type': 'gotojoinsch' });
                  }
                }
              ]
            });
            confirm.present();
          }
          else if (this.currency['currency']['reg_existing'] == 1) {
            this.navCtrl.push(CheckschemePage, { 'data': data, 'classimage': this.classimage });
          }
          else {
            var kycstatus = JSON.parse(localStorage.getItem('kyc_status'));
            console.log(JSON.parse(localStorage.getItem('kyc_status')));
            var currentUser = JSON.parse(localStorage.getItem('sssuser'));
            console.log(JSON.parse(localStorage.getItem('sssuser')));
            this.navCtrl.push(ConfirmschemePage, { 'data': data, 'classimage': this.classimage })
          }
        }
      }
    }
  }

  paydue() {

    this.navCtrl.push(PayduesPage)
  }

  classipopup(data) {
    console.log(data);
    let mod = this.modal.create(ClassiPopupPage, { 'data': data, 'classimage': this.classimage });
    mod.present();
  }
  ionViewWillEnter() {
    let user = true;
    this.events.publish('user:created', user);

  }

  metal(){
    console.log('test')
    let mod = this.modal.create(GoldratemodelPage);
    mod.present();

  }

}
