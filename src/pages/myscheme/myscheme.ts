import { Component } from '@angular/core';
import { Events,IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, ModalController, ViewController, App } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { JoinschemePage } from '../joinscheme/joinscheme';
import { SchemedetailPage } from '../schemedetail/schemedetail';
import { SchemetypePage } from '../schemetype/schemetype';
import { RegexistschemePage } from '../regexistscheme/regexistscheme';
import { ClosedPage } from '../closed/closed';
import { PayduesPage } from '../paydues/paydues';
import { OtpPage } from '../otp/otp';
import { HomePage } from '../home/home';
import { RatefixdisclaimerPage } from '../ratefixdisclaimer/ratefixdisclaimer';
/**
 * Generated class for the MyschemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-myscheme',
  templateUrl: 'myscheme.html',
  providers: [CommonProvider]

})
export class MyschemePage {

  myscheme: any[] = [];
  searchData: any[] = [];
  public input: string = '';
  allowDelete: any = '';
  id_branch: any = ''
  currency: any = { 'currency': { 'reg_existing': 0 } };
  count: any[] = [];
  data:any=this.nav.get('data')
  allowpay:any;
  allowpaylength:any;

  constructor(public nav:NavParams,public events: Events,public alertCtrl: AlertController, public toast: ToastController, public load: LoadingController, public comman: CommonProvider, public navCtrl: NavController, public navParams: NavParams, public modal: ModalController, public appCtrl: App, public viewCtrl: ViewController) {
    let loader = this.load.create({
     // content: 'Please Wait',
      spinner: 'crescent',
    });
    loader.present();

    console.log(this.data)


    this.comman.getcurrency(this.id_branch).then(data => {

      this.currency = data;
      // this.comman.myschemes(this.data).then(data => {

        // this.allowDelete = data['allowDelete'];
        this.myscheme = this.data['cusSchemes'];
        this.searchData =this.data['cusSchemes'];
        this.allowpay =this.myscheme.filter(data => data['allow_pay'] == 'Y').length;
        // this.allowpaylength = this.allowpay.length
        console.log(this.allowpay)
     // let allowpay:any[] = this.

        console.log(this.myscheme);

        this.data['cusSchemes'].forEach((element, i) => {

          if (element['allow_pay'] == 'Y') {
            console.log(element['allow_pay'] == 'Y');
            this.count.push(element)
          }
        });
        loader.dismiss();
      // })

    })

    /*     this.comman.myschemes().then(data => {

          data['chits'].forEach((element, i) => {

            if (element['allow_pay'] == 'Y') {

              this.count.push(element)
            }
          });
          loader.dismiss();

        }); */


  }
  paydue() {

    this.navCtrl.push(PayduesPage)
  }
  search() {

    // ng-show="chit.paid_installments == '0' && chit.isPendingStatExist == false  && allowDelete == true && chit.isPaymentExist == false"

    this.myscheme = this.searchData.filter(item => item['code'].toUpperCase().includes(this.input.toUpperCase()));
  }
  del(id) {


    let confirm = this.alertCtrl.create({
      title: 'Confirm Purchase Plan Delete',
      subTitle: 'Are you sure? Do you want to delete Purchase Plan account?',
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
            this.comman.delscheme(id).then(data => {

              if (data['status']) {
                let ctrl = this.toast.create({
                  message: data['msg'],
                  duration: 6000,
                  position: 'bottom'
                });
                ctrl.present();
                // this.comman.myschemes(this.data).then(data => {

                  // this.allowDelete = data['allowDelete'];
                  this.myscheme =this.data['cusSchemes'];
                  this.searchData =this.data['cusSchemes'];
                  console.log(this.myscheme);
                  loader.dismiss();

                // })
              }
              else {
                let ctrl = this.toast.create({
                  message: data['msg'],
                  duration: 6000,
                  position: 'bottom'
                });
                loader.dismiss();
                ctrl.present();
              }
            })

          }
        }
      ]
    });
    confirm.present();

  }
  more(data) {

    this.navCtrl.push(SchemedetailPage, { 'data': data ,'myschemeData': this.nav.get('data') })
  }

  /*   Fixedrate(data) {
      console.log(data)

      let mod = this.modal.create(RatefixdisclaimerPage,{ 'fixedrate': data, 'page': 'myfixedrate' });
      mod.present();


      this.viewCtrl.dismiss().then(() => {
        console.log('tetst');
      //  this.appCtrl.getRootNav().setRoot(OtpPage, { 'data': data, page: 'fixedrate' });
    });


    } */



  Fixedrate(data) {
    console.log(data)
    let mod = this.modal.create(RatefixdisclaimerPage, { 'fixedrate': data, 'page': 'myfixedrate' });
    mod.present();
    mod.onDidDismiss(mdata => {
		console.log(mdata);
		if(mdata.action == 'proceed'){
			this.appCtrl.getRootNav().setRoot(OtpPage, { 'data': data, page: 'fixedrate' });
		}
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyschemePage');
    this.events.publish('isShown', 1);
  }
  gotype() {
    this.navCtrl.setRoot(SchemetypePage)
  }
  ex() {
    this.navCtrl.push(RegexistschemePage)
  }
  closedscheme() {
    this.navCtrl.push(ClosedPage)
  }
  goBack($event) {
    console.log('true');
    this.navCtrl.setRoot(HomePage);
  }
  scrollStart(event) {
    console.log(event);
    console.log(event.scrollTop);
    if (event.scrollTop <= 100) {
        let isShown = 1;
    this.events.publish('isShown', 1);

    } else {
        let isShown = 0;
    this.events.publish('isShown', 0);

    }
}
newscheme(){
  console.log(this.data)
  this.navCtrl.push(SchemetypePage,{customerData: this.data, 'pageType':'myscheme'});
}

}
