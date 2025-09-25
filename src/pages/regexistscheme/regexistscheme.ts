import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController, AlertController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { BranchPage } from '../branch/branch';
import { SchememodalPage } from '../schememodal/schememodal';
import { PayduesPage } from '../paydues/paydues';
import { OtpPage } from '../otp/otp';
import { ExregreqPage } from '../exregreq/exregreq';
/**
 * Generated class for the RegexistschemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-regexistscheme',
  templateUrl: 'regexistscheme.html',
  providers: [CommonProvider]

})
export class RegexistschemePage {

  scheme: any[] = [];
  branch: any[] = [];
  branchid: any = '';
  branchname: any = '';
  schemeid: any = '';
  //  schemename:any = '';
  currency: any = '';
  acno: any = '';
  acname: any = '';
  panno: any = '';
  nadata: any = { 'is_pan_required': 0 };
  id_branch: any = null;
  branch_settings:any ='';
  is_branchwise_cus_reg:any='';

  schemename = this.navParams.get('data')

  constructor(public alertCtrl: AlertController, public modal: ModalController, private commonservice: CommonProvider, private toastCtrl: ToastController, private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {

    var currentUser = JSON.parse(localStorage.getItem('sssuser'));
    console.log(JSON.parse(localStorage.getItem('sssuser')));
    console.log(currentUser['customer']['id_branch']);

console.log(this.nadata);
    let loader = this.loadingCtrl.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
    this.commonservice.getscheme().then(data => {

      this.scheme = data

    })
    this.commonservice.getcurrency(this.id_branch).then(data => {

      this.currency = data;
      console.log(this.currency)
      this.branch_settings = data['currency']['branch_settings'];
      this.is_branchwise_cus_reg = data['currency']['is_branchwise_cus_reg'];
      console.log(this.branch_settings);
      console.log(this.is_branchwise_cus_reg);

    })
    this.commonservice.getbranch().then(data => {

      this.branch = data;
      loader.dismiss();

    })
    if (this.schemename != false) {
      this.schemename = this.navParams.get('data')['code'];

    } else {
      this.schemename = '';
    }
    console.log('scheme_code' + this.schemename);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegexistschemePage');
  }
  opensmodal() {


    var mod = this.modal.create(SchememodalPage)
    mod.present();
    mod.onDidDismiss(data => {


      console.log(data)

      if (data != undefined) {
        this.schemename = data['data']['code']
        this.schemeid = data['data']['id_scheme']
        this.nadata = data['data']
        console.log(this.nadata);
      }

    });

  }
  openmodal() {



    var mod = this.modal.create(BranchPage)
    mod.present();
    mod.onDidDismiss(data => {

      console.log(data)
      if (data != undefined) {
        this.branchname = data['name']
        this.branchid = data['id_branch']
      }

    });
  }
  

  confirm() {
    var regexp = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
    var validPan = regexp.test(this.panno.toUpperCase());
    var proceed = ( this.nadata['branch_settings'] == 1 && this.is_branchwise_cus_reg !=1) ? true : false;
    if (this.acname != '' && (this.branchid != '' || proceed == false) && this.acno != '') {

      var currentUser = JSON.parse(localStorage.getItem('sssuser'));
      console.log(JSON.parse(localStorage.getItem('sssuser')));
      console.log(currentUser['customer']['id_branch']);

      var temp = { 
      "id_customer": currentUser['customer']['id_customer'],
       "id_scheme": this.schemeid,
       "regExistingReqOtp": this.currency['currency']['regExistingReqOtp'],
       "group_code": this.schemename,
       "scheme_acc_number": this.acno,
      /*  "id_branch": this.branchid, */
    //  'id_branch': $scope.existing.id_branch === undefined ? ($scope.userdata.profile == undefined ? null : $scope.userdata.profile.id_branch) : $scope.existing.id_branch,
       "id_branch": this.branchid == "" ? (currentUser['customer']['id_branch']== "" ? null : currentUser['customer']['id_branch']) : this.branchid ,
       "account_name": this.acname,
       "pan_no": this.panno,
       "is_new": "N"
      }

      console.log(temp);
      if (this.nadata['is_pan_required'] == 1 && this.panno.length == 10 && validPan == true) {

        let confirm = this.alertCtrl.create({
          title: 'Confirm Purchase Plan Joining',
          subTitle: 'Are you sure you want to join' + ' ' + this.nadata['scheme_name'],
          buttons: [
            {
              text: 'Cancel',
              handler: () => {
                console.log('Disagree clicked');
              }
            }, {
              text: 'Ok',
              handler: () => {
                console.log('Agree clicked');

                let loader = this.loadingCtrl.create({
                  content: 'Please Wait',
                  spinner: 'dots',
                });
                loader.present();
                console.log('no')
                this.commonservice.createac(temp).then(data => {
                  console.log(temp);
                  if (data['status']) {
                    if (this.scheme['chit_settings']['regExistingReqOtp'] == 0) {

                    let ctrl = this.toastCtrl.create({
                      message: data['msg'],
                      duration: 6000,
                      position: 'bottom'
                    });
                    loader.dismiss();
                    ctrl.present();
                    this.navCtrl.push(ExregreqPage);
                  } 
                  else {
                    loader.dismiss();
                    console.log(currentUser['mobile']);
                    this.navCtrl.setRoot(OtpPage, { 'data': data ,'mobile': currentUser['mobile'],page: 'existing' });
                  }
                  }
                  else {
                    let ctrl = this.toastCtrl.create({
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
      else if (this.nadata['is_pan_required'] == 0) {

        let confirm = this.alertCtrl.create({
          title: 'Confirm Purchase Plan Join',
          subTitle: 'Are you sure you want to join' + ' ' + this.nadata['scheme_name'],
          buttons: [
            {
              text: 'Cancel',
              handler: () => {
                console.log('Disagree clicked');
              }
            }, {
              text: 'Ok',
              handler: () => {
                console.log('Agree clicked');
                let loader = this.loadingCtrl.create({
                  content: 'Please Wait',
                  spinner: 'dots',
                });
                loader.present();
                console.log('no')
           
                  this.commonservice.createac(temp).then(data => {
                    console.log(temp);
                    if (data['status']) {
                      if (this.scheme['chit_settings']['regExistingReqOtp'] == 0) {

                      let ctrl = this.toastCtrl.create({
                        message: data['msg'],
                        duration: 6000,
                        position: 'bottom'
                      });
                      loader.dismiss();

                      ctrl.present();
                      this.navCtrl.push(ExregreqPage);
                    } 
                    else {
                      loader.dismiss();
                      this.navCtrl.setRoot(OtpPage, { 'data': data ,'mobile': currentUser['mobile'], page: 'existing' , 'temp':temp });
                    }

                    }
                    else {
                      let ctrl = this.toastCtrl.create({
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
      else {
        let ctrl = this.toastCtrl.create({
          message: "Please Enter Valid PAN No",
          duration: 6000,
          position: 'bottom'
        });
        ctrl.present();
      }


    }
    else {
      if (this.acname == '') {
        let ctrl = this.toastCtrl.create({
          message: "Please Fill Account Name",
          duration: 6000,
          position: 'bottom'
        });
        ctrl.present();
      }
      else if (this.branchid == '') {
        let ctrl = this.toastCtrl.create({
          message: "Please Select Branch",
          duration: 6000,
          position: 'bottom'
        });
        ctrl.present();
      }
      else if (this.acno == '') {
        let ctrl = this.toastCtrl.create({
          message: "Please Fill Account Number",
          duration: 6000,
          position: 'bottom'
        });
        ctrl.present();
      }


    }
  }
}
