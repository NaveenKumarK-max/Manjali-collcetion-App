

import { Component, Pipe, PipeTransform, trigger, state, style, transition, animate, keyframes, ElementRef } from '@angular/core';
import { App, NavController, Platform, MenuController, Events, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { CommonProvider } from '../../providers/common';
import { ForgotPassPage } from '../../pages/forgot-pass/forgot-pass';
import { HomePage } from '../home/home';
import { KycPage } from '../kyc/kyc';

// import { DatabaseProvider } from '../../providers/database/database'
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SyncPage } from '../sync/sync';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [CommonProvider /*, DatabaseProvider */],


  animations: [
    trigger('myvisibility', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('* => *', animate('.5s'))
    ])
  ]

})
export class LoginPage {


  visibleState = 'visible';
  private ListUser: any;

  forgt = ForgotPassPage;
  public loginForm: FormGroup;
  public username: AbstractControl;
  public passwd: AbstractControl;
  public uuid: AbstractControl;
  public token: AbstractControl;
  public device_type: AbstractControl;

  public submitted: boolean = false;
  isDisabled: boolean = false;
  getuserLoginURL: string = '';
  errorMessage: string = '';
  public typecheck = 'password';
  public showPass = false;
  remember: any = false;   //  offline default true
  // currency: any = '';
  id_branch: any = null;
  currency: any = { 'currency': { 'is_offline': 0} };

  type: any;
  text: any;
  facebook: any;
  user: any = { username: '' };
  emailChanged: boolean = false;
  //passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  animateClass = { 'zoom-in': true };
 // deviceid = JSON.parse(localStorage.getItem('DeviceData'));

  app_version = JSON.parse(localStorage.getItem('appVersion'));

  // private db:SQLiteObject;
  private isOpen:boolean;

  constructor(private device: Device,private appVersion: AppVersion,private storage: Storage /*,private database: DatabaseProvider */, public appCtrl: App, public viewCtrl: ViewController, public toast: ToastController, private platform: Platform, private builder: FormBuilder, private nav: NavController, private event: Events, private menu: MenuController, private commonService: CommonProvider, private loadingCtrl: LoadingController, public events: Events) {
    this.nav = nav;
    this.menu = menu;
    this.platform = platform;
    this.type = "User";
  //  console.log(this.deviceid);
    console.log('id_branch : ', this.id_branch);
    console.log(this.app_version)

    let status = JSON.parse(localStorage.getItem('logstatus'));
		console.log("Status" + status);
		if (status == false || status == null) {
      if (localStorage.getItem('DeviceData') != null) {
				console.log('iffff',localStorage.getItem('DeviceData'))
				this.commonService.storeCollectionDevices({  'uuid':  (JSON.parse(localStorage.getItem('DeviceData'))!=null && JSON.parse(localStorage.getItem('DeviceData'))['uuid'] !=null) ? JSON.parse(localStorage.getItem('DeviceData'))['uuid'] : '1234567890', 'device_type': JSON.parse(localStorage.getItem('DeviceData'))!=null ? JSON.parse(localStorage.getItem('DeviceData'))['device_type'] : '', 'model':  (JSON.parse(localStorage.getItem('DeviceData'))!=null && JSON.parse(localStorage.getItem('DeviceData'))['model'] !=null) ? JSON.parse(localStorage.getItem('DeviceData'))['model'] : 'browser' }).then(res => {
				console.log('api called : ',res)
				})
			}

		}


    platform.ready().then(() => {

      if (platform.is('cordova')) {
        console.log('login Device UUID is: ' + this.device.uuid);
        localStorage.setItem('DeviceData', JSON.stringify({ 'uuid': this.device.uuid,'model': this.device.model, 'device_type': (platform.is('android') ? 1 : 2), 'acctype': 1 }));
        console.log('login',localStorage.getItem('DeviceData'));

        if (localStorage.getItem('DeviceData') != null) {
          console.log('login if : ',localStorage.getItem('DeviceData'));
          this.commonService.storeCollectionDevices({  'uuid':  (JSON.parse(localStorage.getItem('DeviceData'))!=null && JSON.parse(localStorage.getItem('DeviceData'))['uuid'] !=null) ? JSON.parse(localStorage.getItem('DeviceData'))['uuid'] : '1234567890', 'device_type': JSON.parse(localStorage.getItem('DeviceData'))!=null ? JSON.parse(localStorage.getItem('DeviceData'))['device_type'] : '','model':  (JSON.parse(localStorage.getItem('DeviceData'))!=null && JSON.parse(localStorage.getItem('DeviceData'))['model'] !=null) ? JSON.parse(localStorage.getItem('DeviceData'))['model'] : 'browser' }).then(res => {
            console.log('api called platform : ',res)
            })
        }
			}
    })


/*     if (this.deviceid != null) {
      this.loginForm = builder.group({
        username: ['', Validators.compose([Validators.required])],
        passwd: ['', Validators.compose([Validators.required])],
        'uuid': this.deviceid != null ? this.deviceid['uuid'] : null,
        'token': this.deviceid != null ? this.deviceid['token'] : null,
        'device_type': this.deviceid != null ? this.deviceid['device_type'] : null,

      });
    } else { */
      this.loginForm = builder.group({
        username: ['', Validators.compose([Validators.required])],
        passwd: ['', Validators.compose([Validators.required])],

      });
  //  }
    this.username = this.loginForm.controls['username'];
    this.passwd = this.loginForm.controls['passwd'];
    this.uuid = this.loginForm.controls['uuid'];
    this.token = this.loginForm.controls['token'];
    this.device_type = this.loginForm.controls['device_type'];

    this.commonService.getcurrency(this.id_branch).then(data => {

      this.currency = data;
      console.log(this.currency['currency']['tollfree']);
    })

  }
  public onSubmit(values: Object): void {
    console.log(values)
    values['uuid']= JSON.parse(localStorage.getItem('DeviceData'))!=null ? JSON.parse(localStorage.getItem('DeviceData'))['uuid'] : ''
    values['model']=  (JSON.parse(localStorage.getItem('DeviceData'))!=null && JSON.parse(localStorage.getItem('DeviceData'))['model'] !=null) ? JSON.parse(localStorage.getItem('DeviceData'))['model'] : 'browser',
    // values['token']= JSON.parse(localStorage.getItem('DeviceData'))!=null ? JSON.parse(localStorage.getItem('DeviceData'))['token'] : ''
    values['device_type']= JSON.parse(localStorage.getItem('DeviceData'))!=null ? JSON.parse(localStorage.getItem('DeviceData'))['device_type'] : ''
    this.submitted = true;
    if (this.loginForm.valid) {
      this.errorMessage = 'Logging in...';
      this.isDisabled = true;
      let loader = this.loadingCtrl.create({
       // content: 'Please Wait',
        spinner: 'crescent',
      });
      loader.present();
      this.commonService.doLogin(JSON.stringify(values)).then(res => {

        if (res) {
          if (res.is_valid) {
            console.log(res.employee);

            localStorage.setItem('userdet', JSON.stringify(values));
            localStorage.setItem('sssuser', JSON.stringify(res));  // response data

            localStorage.setItem('logstatus', JSON.stringify(true));
            localStorage.setItem('remember', JSON.stringify(this.remember));
            this.event.publish('username:changed', true);
        //    localStorage.setItem('DeviceData', JSON.stringify(this.deviceid));
            this.commonService.updatestatus(true);
            console.log(this.commonService.status)
            console.log(this.commonService.status)

            if(this.currency['currency']['is_offline']==1){

                    var currentUser = JSON.parse(localStorage.getItem('sssuser'));
                    var postdata = {
                     "id_employee": currentUser['employee']['id_employee'],
                     "id_profile": currentUser['employee']['id_profile'],
                     "login_type": currentUser['employee']['login_type'],
                     "branch_name": currentUser['employee']['branch_name'],
                     "email": currentUser['employee']['email'],
                     "emp_ref_code": currentUser['employee']['emp_ref_code'],
                     "id_branch": currentUser['employee']['id_branch'],
                     "firstname": currentUser['employee']['firstname'],
                     "lastname": currentUser['employee']['lastname'],
                    }

                    this.commonService.getOnlinedata(postdata).then(data => {
                     console.log(data);
                     if (data) {
                      console.log(data)

                      // set a key/value
                      this.storage.set('onlineSetData', JSON.stringify(data));
                      console.log(JSON.parse(localStorage.getItem('onlineSetData')));

                      this.storage.get('onlineSetData').then((val) => {
                       console.log('onlineSetData : ', val);
                       loader.dismiss();
                       localStorage.setItem('checknetwork','online');
                       this.events.publish('checknetwork','online');
                       this.nav.setRoot(HomePage);
                      });

                     } else {
                      let ctrl = this.toast.create({
                       message: data['msg'],
                       duration: 6000,
                       position: 'bottom'
                      });
                      ctrl.present();
                     }

                    });

                   }else{
                    localStorage.setItem('checknetwork','online');
                    this.events.publish('checknetwork','online');
                    this.nav.setRoot(HomePage);
                    loader.dismiss();
                   }



            // var currentUser = JSON.parse(localStorage.getItem('sssuser'));
            // var postdata = {
            //   "id_employee": currentUser['employee']['id_employee'],
            //   "id_profile": currentUser['employee']['id_profile'],
            //   "login_type": currentUser['employee']['login_type'],
            //   "branch_name": currentUser['employee']['branch_name'],
            //   "email": currentUser['employee']['email'],
            //   "emp_ref_code": currentUser['employee']['emp_ref_code'],
            //   "id_branch": currentUser['employee']['id_branch'],
            //   "firstname": currentUser['employee']['firstname'],
            //   "lastname": currentUser['employee']['lastname'],
            // }

            // this.commonService.getOnlinedata(postdata).then(data => {
            //   console.log(data);
            //   if (data) {
            //     console.log(data)

            //     // set a key/value
            //     this.storage.set('onlineSetData', JSON.stringify(data));
            //     console.log(JSON.parse(localStorage.getItem('onlineSetData')));

            //     this.storage.get('onlineSetData').then((val) => {
            //       console.log('onlineSetData : ', val);
            //       loader.dismiss();
            //       localStorage.setItem('checknetwork','online');
            //       this.events.publish('checknetwork','online');
            //       this.nav.setRoot(HomePage);
            //     });

            //   } else {
            //     let ctrl = this.toast.create({
            //       message: data['msg'],
            //       duration: 6000,
            //       position: 'bottom'
            //     });
            //     ctrl.present();
            //   }

            // });
            /*             if (res.customer.is_kyc_required == 1) {
                          console.log(res.customer.is_kyc_required);
                          if (res.customer.kyc_status == 0) {
                            console.log(res.customer.kyc_status);
                            this.nav.setRoot(KycPage);
                          } else {
                            console.log('else');
                            this.nav.setRoot(HomePage);
                          }
                        } else {
                          console.log('else');
                          this.nav.setRoot(HomePage);
                        } */
          } else {
            loader.dismiss();
            this.errorMessage = res.message;
            console.log(this.errorMessage)
            let ctrl = this.toast.create({
              message: 'Invalid username or password',
              duration: 6000,
              position: 'bottom'
            });
            ctrl.present();
            this.isDisabled = false;
          }
        }
      }, error => {
        this.isDisabled = false;
        loader.dismiss();
      });
    }
    else {
      let ctrl = this.toast.create({
        message: 'Enter Valid Credentials',
        duration: 6000,
        position: 'bottom'
      });
      ctrl.present();
    }
  }
  updateremember(value) {

    this.remember = value;
    console.log(this.remember);
  }
  register() {
    this.nav.push(RegisterPage) //navigate to RegisterPage;
  }

  /*  forgotpass() {
       this.nav.push( ForgotPassPage ) //navigate to ForgetPassPage
   } */

  login() {
    this.nav.setRoot(LoginPage) //navigate to HomePage
  }
  skip() {

    //  this.viewCtrl.dismiss();
    //  this.appCtrl.getRootNav().setRoot(HomePage);

    this.nav.setRoot(HomePage) //navigate to HomePage

  }
  showPassword() {

    this.showPass = !this.showPass;

    if (this.showPass) {
      this.typecheck = 'text';
    } else {
      this.typecheck = 'password';
    }
  }
  forgot() {
    this.nav.push(ForgotPassPage);
  }

  /* for footer as hide in default. it's assigned in app.components.ts */
  ionViewWillEnter() {
    let user = false;
    this.events.publish('user:created', user);
    this.events.publish('page', false);
  }

  toggleVisible() {
    this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
  }
  ionViewWillLeave(){
    this.events.publish('page', true);

  }

  // CreateUser() {
  //   console.log(this.loginForm);

  //   this.database.CreateUser(this.loginForm.value.identification, this.loginForm.value.name, this.loginForm.value.lastname).then((data) => {
  //     console.log(data);
  //     this.GetAllUser();
  //   }, (error) => {
  //     console.log(error);
  //   })
  // }

  // GetAllUser() {
  //   this.database.GetAllUsers().then((data: any) => {
  //     console.log(data);
  //     this.ListUser = data;
  //   }, (error) => {
  //     console.log(error);
  //   })
  // }

  createtable(){
    // this.storage = new SQLite();
    // this.storage.create({ name: "createCus.db", location: "default" }).then((db: SQLiteObject) => {
    //   this.db = db;
    //   console.log('DB :',this.db)
    //   db.executeSql("CREATE TABLE IF NOT EXISTS customer (id_customer int UNSIGNED NOT NULL, reference_no varchar(100) DEFAULT NULL, id_company int DEFAULT NULL,id_branch int DEFAULT NULL,id_village int DEFAULT NULL,title varchar(5) DEFAULT NULL,initials varchar(10) DEFAULT NULL,lastname varchar(32) DEFAULT NULL,firstname varchar(32) DEFAULT NULL,date_of_birth date DEFAULT NULL,date_of_wed date DEFAULT NULL,gender tinyint(1) DEFAULT NULL,id_address int UNSIGNED DEFAULT '0',id_employee int UNSIGNED DEFAULT '0',email varchar(128) DEFAULT NULL,mobile varchar(20) DEFAULT NULL,phone varchar(30) DEFAULT NULL,nominee_name varchar(50) DEFAULT NULL,nominee_relationship varchar(32) DEFAULT NULL,nominee_mobile varchar(20) DEFAULT NULL,cus_img varchar(50) DEFAULT NULL,pan varchar(15) DEFAULT NULL,pan_proof varchar(50) DEFAULT NULL,ispan_req tinyint UNSIGNED NOT NULL DEFAULT '0',voterid varchar(15) DEFAULT NULL,voterid_proof varchar(50) DEFAULT NULL,rationcard varchar(15) DEFAULT NULL,rationcard_proof varchar(50) DEFAULT NULL,comments varchar(200) DEFAULT NULL,username varchar(30) DEFAULT NULL,passwd varchar(32) DEFAULT NULL,profile_complete tinyint(1) DEFAULT '0',active tinyint UNSIGNED NOT NULL DEFAULT '1',is_new varchar(1) NOT NULL DEFAULT 'Y',date_add datetime DEFAULT CURRENT_TIMESTAMP,custom_entry_date date DEFAULT NULL,date_upd datetime DEFAULT NULL,added_by tinyint UNSIGNED NOT NULL DEFAULT '1',notification tinyint UNSIGNED NOT NULL DEFAULT '0',gst_number varchar(50) DEFAULT NULL,cus_ref_code varchar(45) DEFAULT NULL,is_refbenefit_crt_cus tinyint UNSIGNED NOT NULL DEFAULT '1',emp_ref_code varchar(45) DEFAULT NULL,is_refbenefit_crt_emp tinyint UNSIGNED NOT NULL DEFAULT '1',religion int DEFAULT NULL,kyc_status tinyint(1) NOT NULL DEFAULT '0',is_cus_synced tinyint(1) NOT NULL DEFAULT '0',last_sync_time datetime DEFAULT NULL,last_payment_on datetime DEFAULT NULL,is_vip tinyint(1) NOT NULL DEFAULT '0',cus_type tinyint(1) NOT NULL DEFAULT '1',send_promo_sms int NOT NULL DEFAULT '0',aadharid varchar(20) DEFAULT NULL,driving_license_no varchar(20) DEFAULT NULL,nominee_address1 varchar(150) DEFAULT NULL,nominee_address2 varchar(150) DEFAULT NULL)", []);
    //   this.isOpen = true;
    //   console.log('open : ',this.isOpen)
    // }).catch((error) => {
    //   console.log('error :',error);
    // })
  }
  fgtpass(){
    this.nav.push(ForgotPassPage);
  }


}
