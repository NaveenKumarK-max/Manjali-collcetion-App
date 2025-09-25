import { Component, Pipe, PipeTransform, trigger, state, style, transition, animate, keyframes, ElementRef } from '@angular/core';
import { NavController, Platform, MenuController, Events, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Toast, Diagnostic, NativeStorage } from 'ionic-native';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CommonProvider } from '../../providers/common';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../login/login';
import { TcPage } from '../tc/tc';
import { OtpPage } from '../otp/otp';
import { BranchPage } from '../branch/branch';
//import { GenraltermsPage } from '../genralterms/genralterms';
import { CountrymodelPage } from '../countrymodel/countrymodel';
import { DatePicker } from '@ionic-native/date-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

declare var cordova: any;

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [CommonProvider]

})
export class RegisterPage {
  public registerForm: FormGroup;
  public mobile: AbstractControl;
  public passwd: AbstractControl;
  public cpasswd: AbstractControl;
  public firstname: AbstractControl;
  public lastname: AbstractControl;
  public uuid: AbstractControl;
  public token: AbstractControl;
  public device_type: AbstractControl;
  public branchname: AbstractControl;
  public email: AbstractControl;
  public check: AbstractControl;
  // public title: AbstractControl;
  public gender: AbstractControl;


  public pincode: AbstractControl;

  public address1: AbstractControl;
  public address2: AbstractControl;
  public countryname: AbstractControl;
  public statename: AbstractControl;
  public cityname: AbstractControl;

  public date_of_birth: AbstractControl;
  //  public maritalstatus: AbstractControl;
  public custype: AbstractControl;

  public adharno: AbstractControl;
  public adharnofileName: AbstractControl;

  public pannumber: AbstractControl;
  public panfileName: AbstractControl;

  public dlcno: AbstractControl;
  public dlfileName: AbstractControl;

  public nominee_name: AbstractControl;
  public nominee_mobile: AbstractControl;
  public nominee_relationship: AbstractControl;
  public nominee_address1: AbstractControl;
  public nominee_address2: AbstractControl;


  type = "p";
  count = 0;
  animateClass = { 'zoom-in': true };
  countries = [];
  states = [];
  cities = [];
  public submitted: boolean = false;
  isDisabled: boolean = false;
  errorMessage: string = '';
  /*   public typechecknew = 'password';
    public showPassnew = false;
    public typecheckconfirm = 'password';
    public showPassconfirm = false; */
  reg: any = /^[a-zA-Z ]*$/;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  pan = "([A-Z]){5}([0-9]){4}([A-Z]){1}$"
  pwd: any = false;
  accept: any = false;
  deviceid = JSON.parse(localStorage.getItem('DeviceData'));
  branch_name: any = '';
  branchid: any = '';
  // currency: any = { 'currency': { 'branch_settings': 0 , 'is_branchwise_cus_reg':0} };
  currency: any = '';
  branch_settings: any = '';
  is_branchwise_cus_reg: any = '';
  id_branch: any = null;

  details: any = '';
  country: any[] = [];
  state: any[] = [];
  city: any[] = [];
  id_country: any = '101';
  id_state: any = '35';
  id_city: any = '';
  birthdate: any;

  aadhaarbase64: any = '';
  panbase64: any = '';
  dlbase64: any = '';



  id_employee: any = '';
  login_type: any = '';
  custom_fields: any = { 'reg_custom_fields': { 'address1': 0, 'address2': 0, 'city': 0, 'country': 0, 'email': 0, 'state': 0, 'custype': 0, 'nominee_name': 0, 'nominee_mobile': 0, 'nominee_relationship': 0, 'nominee_address1': 0, 'nominee_address2': 0 } };
  currentUser = JSON.parse(localStorage.getItem('sssuser'));
  checknet = localStorage.getItem('checknetwork');

  app_version = JSON.parse(localStorage.getItem('appVersion'));


  constructor(private storage: Storage, private camera: Camera, private datePicker: DatePicker, private platform: Platform, private builder: FormBuilder, private nav: NavController, private events: Events, private menu: MenuController, private commonservice: CommonProvider, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private event: Events, public modal: ModalController, public comman: CommonProvider) {

    this.events.subscribe('checknetwork', (data) => {
      this.checknet = data;
      console.log(11111111111111111, data)
    });
    console.log('checkNet', this.checknet);
    console.log(this.app_version)

    this.nav = nav;
    this.menu = menu;
    this.platform = platform;
    this.registerForm = builder.group({
      'mobile': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      //  'passwd': ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
      //  'cpasswd': ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
      'firstname': ['', Validators.compose([Validators.required, Validators.pattern(this.reg)])],
      'lastname': ['', Validators.compose([Validators.required, Validators.pattern(this.reg)])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      //  'title': ['', Validators.compose([Validators.required])],
      'gender': this.gender != null ? this.gender : null,
      'check': false,
      'branchname': ['', Validators.compose([Validators.required]), this.branchname != null ? this.branchname['branchname'] : null],
      /*  'branchname': this.branchname != null ? this.branchname['branchname'] : null,  */
      'id_branch': this.id_branch != null ? this.id_branch['id_branch'] : null,
      'uuid': this.deviceid != null ? this.deviceid['uuid'] : null,
      'token': this.deviceid != null ? this.deviceid['token'] : null,
      'device_type': this.deviceid != null ? this.deviceid['device_type'] : null,

      'address1': ['', Validators.compose([Validators.required])],
      'address2': ['', Validators.compose([Validators.required])],
      'countryname': ['', Validators.compose([Validators.required])],
      'statename': ['', Validators.compose([Validators.required])],
      'cityname': ['', Validators.compose([Validators.required])],
      'id_country': this.id_country != null ? this.id_country['id_country'] : null,
      'id_state': this.id_state != null ? this.id_state['id_state'] : null,
      'id_city': this.id_city != null ? this.id_city['id_city'] : null,
      'date_of_birth': this.date_of_birth != null ? this.date_of_birth : null,
      //  'maritalstatus': this.maritalstatus != null ? this.maritalstatus : null,
      'pincode': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],

      'id_employee': this.currentUser != null ? this.currentUser['employee']['id_employee'] : null,
      'login_type': this.currentUser != null ? this.currentUser['employee']['login_type'] : null,
      // 'custype': this.custype != null ? this.custype : null,
      'custype': ['', Validators.compose([Validators.required])],


      'adharno': ['', Validators.compose([Validators.minLength(12), Validators.maxLength(12)])],
      'adharnofileName': this.adharnofileName != null ? this.adharnofileName['adharnofileName'] : null,

      'pannumber': ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.pan)])],
      'panfileName': this.panfileName != null ? this.panfileName['panfileName'] : null,

      'dlcno': ['', Validators.compose([Validators.minLength(15), Validators.maxLength(16)])],
      'dlfileName': this.dlfileName != null ? this.dlfileName['dlfileName'] : null,

      "aadharbaseFileName": '',
      "panbaseFileName": '',
      "dlbaseFileName": '',
      'nominee_name': ['', Validators.compose([Validators.required, Validators.pattern(this.reg)])],
      'nominee_mobile': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      'nominee_relationship': ['', Validators.compose([Validators.required, Validators.pattern(this.reg)])],
      'nominee_address1': ['', Validators.compose([Validators.required])],
      'nominee_address2': ['', Validators.compose([Validators.required])],


    });

    // { validator: this.checkIfMatchingPasswords('passwd', 'cpasswd') }

    //  this.title = this.registerForm.controls['title'];
    this.gender = this.registerForm.controls['gender'];
    this.mobile = this.registerForm.controls['mobile'];
    // this.passwd = this.registerForm.controls['passwd'];
    // this.cpasswd = this.registerForm.controls['cpasswd'];
    this.firstname = this.registerForm.controls['firstname'];
    this.lastname = this.registerForm.controls['lastname'];
    this.email = this.registerForm.controls['email'];
    this.check = this.registerForm.controls['check'];
    this.uuid = this.registerForm.controls['uuid'];
    this.token = this.registerForm.controls['token'];
    this.device_type = this.registerForm.controls['device_type'];
    this.branchname = this.registerForm.controls['branchname'];
    this.id_branch = this.registerForm.controls['id_branch'];

    this.address1 = this.registerForm.controls['address1'];
    this.address2 = this.registerForm.controls['address2'];
    this.countryname = this.registerForm.controls['countryname'];
    this.statename = this.registerForm.controls['statename'];
    this.cityname = this.registerForm.controls['cityname'];
    this.id_country = this.registerForm.controls['id_country'];
    this.id_state = this.registerForm.controls['id_state'];
    this.id_city = this.registerForm.controls['id_city'];
    this.date_of_birth = this.registerForm.controls['date_of_birth'];

    this.id_employee = this.registerForm.controls['id_employee'];
    this.login_type = this.registerForm.controls['login_type'];
    //  this.maritalstatus = this.registerForm.controls['maritalstatus'];

    this.pincode = this.registerForm.controls['pincode'];
    this.custype = this.registerForm.controls['custype'];

    this.adharno = this.registerForm.controls['adharno'];
    this.adharnofileName = this.registerForm.controls['adharnofileName'];

    this.pannumber = this.registerForm.controls['pannumber'];
    this.panfileName = this.registerForm.controls['panfileName'];

    this.dlcno = this.registerForm.controls['dlcno'];
    this.dlfileName = this.registerForm.controls['dlfileName'];

    this.nominee_name = this.registerForm.controls['nominee_name'];
    this.nominee_mobile = this.registerForm.controls['nominee_mobile'];
    this.nominee_relationship = this.registerForm.controls['nominee_relationship'];
    this.nominee_address1 = this.registerForm.controls['nominee_address1'];
    this.nominee_address2 = this.registerForm.controls['nominee_address2'];


    if (this.checknet == 'offline') {
      // offline
      this.registerForm.controls['countryname'].setValue('India');
      this.registerForm.controls['id_country'].setValue('101');
      this.registerForm.controls['statename'].setValue('TamilNadu');
      this.registerForm.controls['id_state'].setValue('35');
      // this.registerForm.controls['cityname'].setValue('Salem');
      // this.registerForm.controls['id_city'].setValue('4183');

    } else {

      // online Data

      this.comman.getcurrency(this.id_branch).then(data => {

        this.currency = data['currency'];
        console.log(this.currency);
        this.custom_fields = data['reg_custom_fields'];
        console.log(this.custom_fields)

        if (this.custom_fields['address1'] == 2) {
          this.registerForm.controls['address1'].setValidators([Validators.required]);
        }
        this.registerForm.controls['address1'].updateValueAndValidity();

        if (this.custom_fields['address2'] == 2) {
          this.registerForm.controls['address2'].setValidators([Validators.required]);
        }
        this.registerForm.controls['address2'].updateValueAndValidity();

        if (this.custom_fields['custype'] == 2) {
          this.registerForm.controls['custype'].setValidators([Validators.required]);
        }
        this.registerForm.controls['custype'].updateValueAndValidity();


        if (this.custom_fields['email'] == 2) {
          this.registerForm.controls['email'].setValidators([Validators.required, Validators.pattern(this.emailPattern)]);
        }
        this.registerForm.controls['email'].updateValueAndValidity();

        if (this.custom_fields['country'] == 2) {
          this.registerForm.controls['id_country'].setValidators([Validators.required]);
        }
        this.registerForm.controls['id_country'].updateValueAndValidity();

        if (this.custom_fields['state'] == 2) {
          this.registerForm.controls['id_state'].setValidators([Validators.required]);
        }
        this.registerForm.controls['id_state'].updateValueAndValidity();

        if (this.custom_fields['city'] == 2) {
          this.registerForm.controls['id_city'].setValidators([Validators.required]);
        }
        this.registerForm.controls['id_city'].updateValueAndValidity();

        /* Nominee */

        if (this.custom_fields['nominee_name'] == 2) {
          this.registerForm.controls['nominee_name'].setValidators([Validators.required]);
        }
        this.registerForm.controls['nominee_name'].updateValueAndValidity();

        if (this.custom_fields['nominee_mobile'] == 2) {
          this.registerForm.controls['nominee_mobile'].setValidators([Validators.required]);
        }
        this.registerForm.controls['nominee_mobile'].updateValueAndValidity();

        if (this.custom_fields['nominee_relationship'] == 2) {
          this.registerForm.controls['nominee_relationship'].setValidators([Validators.required]);
        }
        this.registerForm.controls['nominee_relationship'].updateValueAndValidity();

        if (this.custom_fields['nominee_address1'] == 2) {
          this.registerForm.controls['nominee_address1'].setValidators([Validators.required]);
        }
        this.registerForm.controls['nominee_address1'].updateValueAndValidity();

        if (this.custom_fields['nominee_address2'] == 2) {
          this.registerForm.controls['nominee_address2'].setValidators([Validators.required]);
        }
        this.registerForm.controls['nominee_address2'].updateValueAndValidity();



        if (this.custom_fields['address1'] == 0 || this.custom_fields['address1'] == 1) {
          this.registerForm.controls['address1'].clearValidators();
        }
        this.registerForm.controls['address1'].updateValueAndValidity();

        if (this.custom_fields['address2'] == 0 || this.custom_fields['address2'] == 1) {
          this.registerForm.controls['address2'].clearValidators();
        }
        this.registerForm.controls['address2'].updateValueAndValidity();

        if (this.custom_fields['custype'] == 0 || this.custom_fields['custype'] == 1) {
          this.registerForm.controls['custype'].clearValidators();
        }
        this.registerForm.controls['custype'].updateValueAndValidity();


        if (this.custom_fields['email'] == 0 || this.custom_fields['email'] == 1) {
          this.registerForm.controls['email'].clearValidators();
        }
        this.registerForm.controls['email'].updateValueAndValidity();

        if (this.custom_fields['country'] == 0 || this.custom_fields['country'] == 1) {
          this.registerForm.controls['id_country'].clearValidators();
        }
        this.registerForm.controls['id_country'].updateValueAndValidity();

        if (this.custom_fields['state'] == 0 || this.custom_fields['state'] == 1) {
          this.registerForm.controls['id_state'].clearValidators();
        }
        this.registerForm.controls['id_state'].updateValueAndValidity();

        if (this.custom_fields['city'] == 0 || this.custom_fields['city'] == 1) {
          this.registerForm.controls['id_city'].clearValidators();
        }
        this.registerForm.controls['id_city'].updateValueAndValidity();


        /* Nominee */
        if (this.custom_fields['nominee_name'] == 0 || this.custom_fields['nominee_name'] == 1) {
          this.registerForm.controls['nominee_name'].clearValidators();
        }
        this.registerForm.controls['nominee_name'].updateValueAndValidity();

        if (this.custom_fields['nominee_mobile'] == 0 || this.custom_fields['nominee_mobile'] == 1) {
          this.registerForm.controls['nominee_mobile'].clearValidators();
        }
        this.registerForm.controls['nominee_mobile'].updateValueAndValidity();

        if (this.custom_fields['nominee_relationship'] == 0 || this.custom_fields['nominee_relationship'] == 1) {
          this.registerForm.controls['nominee_relationship'].clearValidators();
        }
        this.registerForm.controls['nominee_relationship'].updateValueAndValidity();

        if (this.custom_fields['nominee_address1'] == 0 || this.custom_fields['nominee_address1'] == 1) {
          this.registerForm.controls['nominee_address1'].clearValidators();
        }
        this.registerForm.controls['nominee_address1'].updateValueAndValidity();

        if (this.custom_fields['nominee_address2'] == 0 || this.custom_fields['nominee_address2'] == 1) {
          this.registerForm.controls['nominee_address2'].clearValidators();
        }
        this.registerForm.controls['nominee_address2'].updateValueAndValidity();



        this.branch_settings = data['currency']['branch_settings'];
        this.is_branchwise_cus_reg = data['currency']['is_branchwise_cus_reg'];
        console.log(this.branch_settings);
        console.log(this.is_branchwise_cus_reg);
        this.comman.getcountry().then(data => {
          console.log(data)
          this.country = data;
        })

        this.registerForm.controls['countryname'].setValue('India');
        this.registerForm.controls['id_country'].setValue('101');
        console.log(this.registerForm.controls['id_country'].value);
        this.comman.getstate(this.registerForm.controls['id_country'].value).then(data => {
          this.state = data;
        })
        this.registerForm.controls['statename'].setValue('TamilNadu');
        this.registerForm.controls['id_state'].setValue('35');
        console.log(this.registerForm.controls['id_state'].value);
        this.comman.getcity(this.registerForm.controls['id_state'].value).then(data => {
          this.city = data;
          console.log(this.city);
        })
        // this.registerForm.controls['cityname'].setValue('Salem');
        // this.registerForm.controls['id_city'].setValue('4183');
        // console.log(this.registerForm.controls['id_city'].value);
      })

    }





    console.log(this.currentUser);


  }
  // ionViewWillLeave(){
  //     this.nav.setRoot(HomePage)
  // }
  home() {
    this.nav.setRoot(LoginPage) //navigate to HomePage
  }

  ionViewDidLoad() {

  }
  /* for footer as hide in default. it's assigned in app.components.ts */
  ionViewWillEnter() {
    let user = false;
    this.events.publish('user:created', user);
  }

  terms() {

    this.nav.push(TcPage)
  }

  public onSubmit(values: any): void {
    console.log(this.registerForm)
    console.log(this.currency);
    console.log(this.registerForm.get('id_country').value);
    console.log(this.registerForm.get('id_state').value);
    console.log(this.registerForm.get('id_state').valid)
    var proceed = (this.branch_settings == 1 && this.is_branchwise_cus_reg == 1) ? true : false;
    console.log(proceed);
    console.log(this.registerForm.controls['check'].value)
    // if (this.registerForm.get('title').valid) {
    if (this.registerForm.get('firstname').valid) {
      if (this.registerForm.get('lastname').valid) {
        //     if (this.registerForm.get('gender').valid) {
        console.log(this.registerForm.get('mobile'))
        if (this.registerForm.get('mobile').valid) {
          if (this.registerForm.get('email').valid) {
            //   if (this.registerForm.get('gender').valid) {
            //  if (this.registerForm.get('date_of_birth').valid) {
            //    if (this.registerForm.get('adharno').valid) {
            if (this.registerForm.get('id_state').valid) {
              if (this.registerForm.get('id_city').valid) {
                if (this.registerForm.get('address1').valid) {
                  if (this.registerForm.get('address2').valid) {

                    if (this.registerForm.get('pincode').valid) {
                      if (this.registerForm.get('custype').valid) {
                        // if (this.registerForm.get('passwd').valid && this.registerForm.get('cpasswd').valid && this.registerForm.controls['passwd'].value == this.registerForm.controls['cpasswd'].value) {
                        if (this.registerForm.get('nominee_name').valid) {
                          if (this.registerForm.get('nominee_mobile').valid) {
                            if (this.registerForm.get('nominee_relationship').valid) {
                              if (this.registerForm.get('nominee_address1').valid) {
                                if (this.registerForm.get('nominee_address2').valid) {

                                  if (proceed == false) {

                                    if (this.registerForm.controls['check'].value == true) {
                                      if (this.checknet == 'offline') {
                                        // offline
                                        this.storage.get('onlineSetData').then((val) => {

                                          if (val != null) {
                                            let whole: any = JSON.parse(val);
                                            console.log(whole)
                                            let ind = JSON.parse(val)['customer'].findIndex(data => data['mobile'] == this.registerForm.get('mobile').value)
                                            console.log(ind)
                                            if (ind < 0) {
                                              values['payments'] = null;
                                              values['id_customer'] = 'new' + new Date().getTime();
                                              values['time'] = 'new';

                                              whole['customer'].push(values)
                                              this.storage.set('onlineSetData', JSON.stringify(whole)).then((val) => {
                                                this.storage.get('localnewcus').then((val1) => {
                                                  if (val1 == null) {
                                                    this.storage.set('localnewcus', JSON.stringify([values])).then((val) => {
                                                      console.log('tempchkmob :', JSON.parse(val));
                                                      this.presentToast('Customer Registered Successfully');
                                                      this.nav.setRoot(HomePage);
                                                    });
                                                  }
                                                  else {
                                                    console.log(JSON.parse(val1))
                                                    let t: any[] = JSON.parse(val1);
                                                    t.push(values)
                                                    this.storage.set('localnewcus', JSON.stringify(t)).then((val) => {

                                                      console.log('tempchkmob :', JSON.parse(val));
                                                      this.presentToast('Customer Registered Successfully');
                                                      this.nav.setRoot(HomePage);
                                                    });
                                                  }
                                                });
                                              });
                                            }
                                            else {
                                              this.presentToast('Already Customer Registered');
                                            }
                                            console.log(this.registerForm.get('mobile'))
                                          }
                                        });

                                      } else {

                                        // online Data
                                        console.log(values, 'valuesdata')

                                        this.errorMessage = 'Doing Register...';
                                        this.isDisabled = true;
                                        let loader = this.loadingCtrl.create({
                                          // content: 'Please Wait',
                                          spinner: 'crescent',
                                        });
                                        loader.present();
                                        if (this.currency['reg_otp_required'] == 0) {

                                          this.commonservice.createcus(values).then(data => {
                                            let ctrl = this.toastCtrl.create({
                                              message: data['msg'],
                                              duration: 6000,
                                              position: 'bottom'
                                            });
                                            loader.dismiss();
                                            ctrl.present();
                                            //      this.navCtrl.push(LoginPage)
                                            this.nav.setRoot(HomePage);
                                          }, error => {
                                            this.isDisabled = false;
                                            loader.dismiss();
                                          });

                                        } else {
                                          this.commonservice.isnoreg(this.registerForm.controls['mobile'].value, this.registerForm.controls['email'].value).then(res => {
                                            if (res) {
                                              if (res['is_reg'] == false) {
                                                let toast = this.toastCtrl.create({
                                                  message: res.msg,
                                                  duration: 6000
                                                });
                                                toast.present();
                                                this.nav.setRoot(OtpPage, { data: this.registerForm.value, page: 'new' });
                                              } else {
                                                let toast = this.toastCtrl.create({
                                                  message: res.msg,
                                                  duration: 6000
                                                });
                                                toast.present();

                                                this.errorMessage = res.msg;
                                                this.isDisabled = false;
                                              }
                                              loader.dismiss();
                                            }
                                          }, error => {
                                            this.isDisabled = false;
                                            loader.dismiss();
                                          });
                                        }

                                      }

                                    }

                                    else {
                                      console.log('tc');
                                      let toast = this.toastCtrl.create({
                                        message: 'Please accept Terms and the Conditions',
                                        position: 'bottom',
                                        duration: 6000
                                      });
                                      toast.present();
                                    }

                                  }
                                  else {

                                    if (this.registerForm.get('branchname').valid) {
                                      console.log('branch');
                                      console.log(values, 'valuesdata')
                                      console.log(this.registerForm.get('branchname').valid);
                                      console.log(proceed);
                                      console.log(this.registerForm.valid)
                                      if (this.registerForm.controls['check'].value == true) {
                                        this.errorMessage = 'Doing Register...';
                                        this.isDisabled = true;
                                        let loader = this.loadingCtrl.create({
                                          // content: 'Please Wait',
                                          spinner: 'crescent',
                                        });
                                        loader.present();
                                        if (this.currency['reg_otp_required'] == 0) {
                                          this.commonservice.createcus(values).then(data => {
                                            let ctrl = this.toastCtrl.create({
                                              message: data['msg'],
                                              duration: 6000,
                                              position: 'bottom'
                                            });
                                            loader.dismiss();
                                            ctrl.present();
                                            //      this.navCtrl.push(LoginPage)
                                            this.nav.setRoot(HomePage);

                                          }, error => {
                                            this.isDisabled = false;
                                            loader.dismiss();
                                          });
                                        } else {

                                          this.commonservice.isnoreg(this.registerForm.controls['mobile'].value, this.registerForm.controls['email'].value).then(res => {
                                            if (res) {
                                              if (res['is_reg'] == false) {
                                                let toast = this.toastCtrl.create({
                                                  message: res.msg,
                                                  duration: 6000
                                                });
                                                toast.present();
                                                this.nav.setRoot(OtpPage, { data: this.registerForm.value, page: 'new' });
                                              } else {
                                                let toast = this.toastCtrl.create({
                                                  message: res.msg,
                                                  duration: 6000
                                                });
                                                toast.present();

                                                this.errorMessage = res.msg;
                                                this.isDisabled = false;
                                              }
                                              loader.dismiss();
                                            }
                                          }, error => {
                                            this.isDisabled = false;
                                            loader.dismiss();
                                          });
                                        }
                                      }

                                      else {
                                        console.log('tc');
                                        let toast = this.toastCtrl.create({
                                          message: 'Please accept Terms and the Conditions',
                                          position: 'bottom',

                                          duration: 6000
                                        });
                                        toast.present();
                                      }
                                    }
                                    else {
                                      console.log('branch');
                                      let toast = this.toastCtrl.create({
                                        message: 'Please Select Branch',
                                        position: 'bottom',

                                        duration: 6000
                                      });
                                      toast.present();
                                    }

                                  }



                                } else {
                                  console.log('branch');
                                  let toast = this.toastCtrl.create({
                                    message: 'Please Enter Nominee Address2',
                                    position: 'bottom',

                                    duration: 6000
                                  });
                                  toast.present();
                                }
                              } else {
                                console.log('branch');
                                let toast = this.toastCtrl.create({
                                  message: 'Please Enter Nominee Address1',
                                  position: 'bottom',

                                  duration: 6000
                                });
                                toast.present();
                              }
                            } else {
                              console.log('branch');
                              let toast = this.toastCtrl.create({
                                message: 'Please Enter Nominee Relationship',
                                position: 'bottom',

                                duration: 6000
                              });
                              toast.present();
                            }
                          } else {
                            console.log('branch');
                            let toast = this.toastCtrl.create({
                              message: 'Please Enter Nominee Mobile Number',
                              position: 'bottom',

                              duration: 6000
                            });
                            toast.present();
                          }
                        } else {
                          console.log('branch');
                          let toast = this.toastCtrl.create({
                            message: 'Please Enter Nominee Name',
                            position: 'bottom',

                            duration: 6000
                          });
                          toast.present();
                        }



                      } else {

                        let toast = this.toastCtrl.create({
                          message: 'Please Select Customertype',
                          position: 'bottom',

                          duration: 6000
                        });
                        toast.present();

                      }

                    } else {

                      let toast = this.toastCtrl.create({
                        message: 'Please Enter Pincode',
                        position: 'bottom',

                        duration: 6000
                      });
                      toast.present();

                    }



                  } else {
                    let toast = this.toastCtrl.create({
                      message: 'Please Enter Your Address2',
                      position: 'bottom',

                      duration: 6000
                    });
                    toast.present();

                  }
                } else {

                  let toast = this.toastCtrl.create({
                    message: 'Please Enter Your Address1',
                    position: 'bottom',

                    duration: 6000
                  });
                  toast.present();
                }

              } else {
                let toast = this.toastCtrl.create({
                  message: 'Please Select Your City',
                  position: 'bottom',

                  duration: 6000
                });
                toast.present();

              }
            } else {
              let toast = this.toastCtrl.create({
                message: 'Please Select Your State',
                position: 'bottom',

                duration: 6000
              });
              toast.present();
            }

          }
          else {
            let toast = this.toastCtrl.create({
              message: 'Enter Valid Email',
              position: 'bottom',

              duration: 6000
            });
            toast.present();

          }

        }

        else {
          let toast = this.toastCtrl.create({
            message: 'Enter Valid Mobile Number',
            position: 'bottom',

            duration: 6000
          });
          toast.present();

        }


      } else {
        let toast = this.toastCtrl.create({
          message: 'LastName Must Contain Alphabets Only',
          position: 'bottom',

          duration: 6000
        });
        toast.present();
      }
    }

    else {
      let toast = this.toastCtrl.create({
        message: 'FirstName Must Contain Alphabets Only',
        position: 'bottom',

        duration: 6000
      });
      toast.present();
    }




  }
  openmodal() {

    let mod = this.modal.create(BranchPage)
    mod.present();
    mod.onDidDismiss(data => {

      console.log(data)
      if (data != undefined) {
        this.registerForm.controls['branchname'].setValue(data['name']);
        this.registerForm.controls['id_branch'].setValue(data['id_branch']);
        // this.branchid = data['id_branch']
      }

    });

    console.log('1111')
  }

  birth() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(date => {

      var ddd = date.getDate();
      var mmm = date.getMonth() + 1;
      var yy = date.getFullYear();
      //var today = new Date(yy+"-"+mmm+"-"+ddd).toISOString().substring(0, 10);
      var today = date.toISOString().substring(0, 10);
      //this.fromdate= today;
      console.log(ddd)
      console.log(mmm)
      console.log(yy)
      this.birthdate = yy + "-" + mmm + "-" + ddd;
      console.log(this.birthdate)
      this.registerForm.controls['date_of_birth'].setValue(this.birthdate);

      console.log(this.date_of_birth)
    });
  }

  openmodalReg(name, details) {
    console.log(name)
    console.log(details)

    let mod = this.modal.create(CountrymodelPage, { data: details, name: name })
    mod.present();
    mod.onDidDismiss((dataa, name) => {

      console.log(dataa)
      if (dataa != undefined) {
        let loader = this.loadingCtrl.create({
          //  content: 'Please Wait',
          spinner: 'crescent',
        });
        loader.present();
        if (name == 'Country') {
          console.log(dataa['id_country']);
          this.comman.getstate(dataa['id_country']).then(data => {
            console.log(data)
            console.log(dataa['name'])
            this.registerForm.controls['countryname'].setValue(dataa['name']);
            this.registerForm.controls['id_country'].setValue(dataa['id_country']);
            this.state = data;
            loader.dismiss();
          })
        }
        if (name == 'State') {
          this.registerForm.controls['cityname'].setValue('');
          this.registerForm.controls['id_city'].setValue('');

          console.log(dataa['id_state']);
          var id_state = '35';
          var city_id = (dataa['id_state'] == undefined && dataa['id_state'] == null) ? id_state : dataa['id_state'];
          console.log(city_id);
          this.comman.getcity(city_id).then(data => {
            this.registerForm.controls['statename'].setValue(dataa['name']);
            this.registerForm.controls['id_state'].setValue(dataa['id_state']);
            this.city = data;
            loader.dismiss();

          })
        }
        if (name == 'City') {
          this.registerForm.controls['cityname'].setValue(dataa['name']);
          this.registerForm.controls['id_city'].setValue(dataa['id_city']);
          //  this.details['cityname'] = dataa['name']
          //  this.details['id_city'] = dataa['id_city']
          loader.dismiss();

        }
      }

    });

  }
  public onKeyUp(event: any) {
    //const NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
    const NUMBER_REGEXP = "^[1-9]+[0-9]*$";

    let newValue = event.target.value;
    let regExp = new RegExp(NUMBER_REGEXP);

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
      console.log(newValue);
      return true;
    } else {
      return false;
    }
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
    if (type == 'adhar') {
      this.aadhaarbase64 = base64Image;
      this.registerForm.controls['adharnofileName'].setValue(this.aadhaarbase64);
      this.registerForm.controls['aadharbaseFileName'].setValue(this.createFileName());


    } else if (type == 'pan') {
      this.panbase64 = base64Image;
      this.registerForm.controls['panfileName'].setValue(this.panbase64);
      this.registerForm.controls['panbaseFileName'].setValue(this.createFileName());


    } else {

      this.dlbase64 = base64Image;
      this.registerForm.controls['dlfileName'].setValue(this.dlbase64);
      this.registerForm.controls['dlbaseFileName'].setValue(this.createFileName());

    }



    /*     let loader = this.loadingCtrl.create({
          content: 'Please Wait',
          spinner: 'dots',
        });
        loader.present();
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        var temp = {
          'id_customer': currentUser['customer']['id_customer'],
          'fileName': base64Image
        }
        console.log(temp)

        this.comman.uploadCusimage(temp).then(data => {
          console.log(data);
          let result = JSON.parse(data.response);
          console.log(result)
          if(result){
            this.presentToast('Image succesfully uploaded.');
            loader.dismiss();
          }
        //  this.details['cus_img'] = targetPath;
        })

        loader.dismiss();
     */

  }

  segmentChanged(e) {

  }


  public keyup(event: any) {
    // const NUMBER_REGEXP = /^[0-9]*$/;
    let newValue = event.target.value;
    //   this.registerForm.controls['pannumber'].setValue(newValue.toUpperCase());

    this.registerForm.controls['pannumber'].setValue(newValue.toUpperCase());
    if (this.registerForm.controls['pannumber'].value.length > 10) {
      let v: any = this.registerForm.controls['pannumber'].value.slice(0, 10);
      this.registerForm.controls['pannumber'].setValue(v.toUpperCase());
    }

    /*     let regExp = new RegExp(NUMBER_REGEXP);
        if (!regExp.test(newValue)) {
          event.target.value = newValue.slice(0, -1);
          return true;
        }else{
          return false;
        } */
  }
  public dlkeyup(event: any) {
    // const NUMBER_REGEXP = /^[0-9]*$/;
    let newValue = event.target.value;
    // this.registerForm.controls['dlcno'].setValue(newValue.toUpperCase());
    this.registerForm.controls['dlcno'].setValue(newValue.toUpperCase());
    if (this.registerForm.controls['dlcno'].value.length > 16) {
      let v: any = this.registerForm.controls['dlcno'].value.slice(0, 16);
      this.registerForm.controls['dlcno'].setValue(v.toUpperCase());
    }
    /*     let regExp = new RegExp(NUMBER_REGEXP);
        if (!regExp.test(newValue)) {
          event.target.value = newValue.slice(0, -1);
          return true;
        }else{
          return false;
        } */
  }

  goBack() {
    console.log('true');
    this.nav.setRoot(HomePage);
  }


}
