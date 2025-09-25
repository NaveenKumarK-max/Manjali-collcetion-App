import { Component, ViewChild } from '@angular/core';
import { Events, Platform, Nav, Config, MenuController, ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { NewarrivalsPage } from '../pages/newarrivals/newarrivals';
import { CustomerServicePage } from '../pages/customer-service/customer-service';

import { LoginPage } from '../pages/login/login';
import { CommonProvider } from '../providers/common';
import { RegisterPage } from '../pages/register/register';
/* import { OneSignal } from '@ionic-native/onesignal'; */
import { OneSignal } from '@ionic-native/onesignal';
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';
import { AppVersion } from '@ionic-native/app-version';
import { NavController, App } from "ionic-angular/index";
import { Market } from '@ionic-native/market';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SchemetypePage } from '../pages/schemetype/schemetype';
import { WalletPage } from '../pages/wallet/wallet';
import { SettingsPage } from '../pages/settings/settings';
import { InvitePage } from '../pages/invite/invite';
import { FeedbackPage } from '../pages/feedback/feedback';
import { DthPage } from '../pages/dth/dth';
import { KycPage } from '../pages/kyc/kyc';
import { IntroimgPage } from '../pages/introimg/introimg';
import { MaintenancePage } from '../pages/maintenance/maintenance';
import { MyschemePage } from '../pages/myscheme/myscheme';
import { NotificationPage } from '../pages/notification/notification';
import { PayduesPage } from '../pages/paydues/paydues';
import { FaqPage } from '../pages/faq/faq';
import { AboutPage } from '../pages/about/about';
import { TcPage } from '../pages/tc/tc';
import { PpPage } from '../pages/pp/pp';
import { PolicyPage } from '../pages/policy/policy';
import { StorelocatorPage } from '../pages/storelocator/storelocator';
import { GiftpaymentPage } from '../pages/giftpayment/giftpayment';
import { GiftlistPage } from '../pages/giftlist/giftlist';
import { PaymenthisPage } from '../pages/paymenthis/paymenthis';
import { DatePicker } from '@ionic-native/date-picker';
import { OfferPage } from '../pages/offer/offer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ClosedPage } from '../pages/closed/closed';
import { PledgecalculatorPage } from '../pages/pledgecalculator/pledgecalculator';
import { EsticalculatorPage } from '../pages/esticalculator/esticalculator';
import { RatehistoryPage } from '../pages/ratehistory/ratehistory';
import { CoinBookFormPage } from '../pages/coin-book-form/coin-book-form';
import { SyncPage } from '../pages/sync/sync';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';

@Component({
  templateUrl: 'app.html',
  providers: [CommonProvider]
})
export class MyApp {

  rootPage: any = HomePage;  // fst page goes to home page
  // rootPage: any = OtpPage;  // fst page goes to home page
  home: any;
  deals: any;
  loginstatus = false;
  dispname: any;
  totalcartitems = 0;

  @ViewChild(Nav) nav: Nav;

  pages: any = [];
  overlayHidden: boolean = true;
  lastBack = 0;
  allowClose: boolean = false;
  app_version: any = 0;
  versionData;
  VAL_INTERVAL = 60000 // in ms
  EXP_INTERVAL = 60000 // in ms
  timer: any;
  exptimer: any;
  count: any = 1;
  excount: any = 1;
  popupimage: any = '';
  //	currency: any={};
  foot: any = true;
  id_branch: any = null;
  currency: any = { 'currency': { 'enable_dth ': 0, 'estimation': 0, 'pledge_calculator': 0, 'rate_history': 0, 'allow_shareonly': 0, 'allow_referral': 0, 'allow_wallet': 0, 'useWalletForChit': 0 } };
  dthstatus: any = '';
  branch_settings: any;
  estimation: any;
  pledge_calculator: any;
  rate_history: any;
  currYear: any;
  details: any = '';

  allow_access: any = '';
  uuid: any;
  token: any;
  device_type: any;
  companyName = "Manjali Jewellers";
  app_ver: any = '3.2.1';
  online: any = '';
  localpay: any = '';
  syncDatalen: any = 0;
  newcus: any = 0;
  localcus: any = '';
  page: any = true;


  constructor(private device: Device,public iab: InAppBrowser, private storage: Storage, androidPermissions: AndroidPermissions, public socialSharing: SocialSharing, private market: Market, private _OneSignal: OneSignal, public platform: Platform, public events: Events, public menu: MenuController, statusBar: StatusBar, splashScreen: SplashScreen, private commonservice: CommonProvider, private network: Network, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private toast: Toast, public alertCtrl: AlertController, private appVersion: AppVersion, private app: App, public modalCtrl: ModalController, public comman: CommonProvider, private commonService: CommonProvider) {
    // this.menu.swipeEnable(false);
    // this.menu.enable(false);
    localStorage.setItem('company', JSON.stringify(this.companyName));
    console.log(JSON.parse(localStorage.getItem('company')))
    localStorage.setItem('appVersion', JSON.stringify(this.app_ver))
    events.subscribe('user:created', (user) => {
      // user and time are the same arguments passed in `events.publish(user, time)
      this.foot = user;
      console.log('Welcome', user);
    });

    events.subscribe('page', (p) => {
      console.log('page', p);

      this.page = p;
    });

    events.subscribe('currency', (data) => {
      console.log('Welcome', data, 'at');
      this.dthstatus = data;

      console.log('dthstatus' + this.dthstatus);
    });


    events.subscribe('logout', (data) => {
      let v = data;
      if (v == true) {
        this.logout();
        v = false
      }
    });


    events.subscribe('allow_access', (data) => {
      console.log('Welcome', data, 'at');
      this.allow_access = data;
      console.log('allow_access' + this.allow_access);
    });


    platform.ready().then(() => {


			console.log('Device UUID is: ' + this.device.uuid);
      console.log('Device Model : ' + this.device.model)
			localStorage.setItem('DeviceData', JSON.stringify({ 'uuid': this.device.uuid,'model': this.device.model, 'device_type': (platform.is('android') ? 1 : 2), 'acctype': 1 }));
			console.log('appcomponent : ',localStorage.getItem('DeviceData'));



      androidPermissions.requestPermissions(
        [
          androidPermissions.PERMISSION.CAMERA,
          androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
        ]
      );
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      /* let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.presentAlert('Turn on Wi-Fi or mobile data.', 'You are Offline', '');

      });
      //disconnectSubscription.unsubscribe();
      let connectSubscription = this.network.onConnect().subscribe(() => {
        //this.presentAlert('Turn on Wi-Fi or mobile connection','You are Offline');
      }); */

      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        localStorage.setItem('checknetwork', 'offline');
        localStorage.setItem('one', 'no');
        this.events.publish('checknetwork', 'offline');

        console.log('Get One offline : ', localStorage.getItem('one'));

        this.presentAlert('Turn on Wi-Fi or mobile data.', 'You are Offline', '');

      });
      //disconnectSubscription.unsubscribe();
      let connectSubscription = this.network.onConnect().subscribe(() => {
        localStorage.setItem('checknetwork', 'online');
        localStorage.setItem('one', 'yes');
        this.events.publish('checknetwork', 'online');

        console.log('Get One ONLINE : ', localStorage.getItem('one'));

        //this.presentAlert('Turn on Wi-Fi or mobile connection','You are Offline');
      });


      //	connectSubscription.unsubscribe();
      if (platform.is('cordova')) {
        appVersion.getVersionNumber().then((s) => {
          this.app_version = s;
          console.log('app version : ', this.app_version)
          //localStorage.setItem('appVersion',JSON.stringify(this.app_version))

        })
      }
      // check app version
      this.commonservice.getCusAppVersion().then((data) => {

        this.versionData = data;
        console.log(data);
        localStorage.setItem('versionData', JSON.stringify(this.versionData));
        console.log(this.versionData)

        if (this.versionData.mode == 1) {
          this.nav.setRoot(MaintenancePage, { 'maintainData': this.versionData });
          //this.navCtrl.setRoot(YourPage,{myData:"test data"})
        }

        else {

          console.log(localStorage.getItem('logstatus'));
          console.log(localStorage.getItem('remember'));

          let remember = JSON.parse(localStorage.getItem('remember'));

          if (remember == true) {

            localStorage.setItem('logstatus', JSON.stringify(true))
          }
          else {
            localStorage.setItem('logstatus', JSON.stringify(false))

          }

          if (platform.is('android')) {
            if ((this.versionData.android) != this.app_version) {
              if ((this.versionData.new_android_ver) != this.app_version) {
                this.presentAlert(this.versionData.msg, this.versionData.title, this.versionData.playPackage);
              }
            }
          }
          else if (platform.is('ios')) {
            if ((this.versionData.ios) != this.app_version) {
              if ((this.versionData.newver_ios) != this.app_version) {
                this.presentAlert(this.versionData.iMsg, this.versionData.title, this.versionData.iPackage);
              }
            }
          }
        }
      })
      platform.registerBackButtonAction(() => {

        if (this.nav.getActive()['name'] != 'PaymentPage' || this.nav.getActive()['name'] != 'SyncPage') {
          const overlay = this.app._appRoot._overlayPortal.getActive();
          const nav = this.app.getActiveNav();
          const closeDelay = 2000;
          const spamDelay = 500;

          if (overlay && overlay.dismiss) {
            overlay.dismiss();
          } else if (nav.canGoBack()) {
            nav.pop();
          } else if (Date.now() - this.lastBack > spamDelay && !this.allowClose) {
            this.allowClose = true;
            let toast = this.toastCtrl.create({
              message: "Press back again to exit",
              duration: closeDelay,
              dismissOnPageChange: true
            });
            toast.onDidDismiss(() => {
              this.allowClose = false;
            });
            toast.present();
          } else if (Date.now() - this.lastBack < closeDelay && this.allowClose) {
            platform.exitApp();
          }
          this.lastBack = Date.now();
        }
      });

      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      splashScreen.hide();
      if (platform.is('cordova')) {

        this._OneSignal.startInit("", "");
        this._OneSignal.inFocusDisplaying(this._OneSignal.OSInFocusDisplayOption.Notification);
        this._OneSignal.setSubscription(true);
        this._OneSignal.handleNotificationReceived().subscribe(() => {
          // handle received here how you wish.
        });
        this._OneSignal.handleNotificationOpened().subscribe(() => {
          // handle opened here how you wish.
        });
        this._OneSignal.getIds().then((ids) => {
          //	alert('2222');
          //	alert(JSON.stringify(ids));
          console.log(JSON.stringify(ids))
        //  localStorage.setItem('DeviceData', JSON.stringify({ 'uuid': ids.userId, 'token': ids.pushToken, 'device_type': (platform.is('android') ? 1 : 2), 'acctype': 1 }));
          /* his.commonservice.doUpdateDeviceIds(JSON.stringify({ 'uuid': ids.userId, 'token': ids.pushToken, 'device_type': (platform.is('android') ? 1 : 2), 'acctype': 1 })); */
          //	alert(JSON.stringify(localStorage.getItem('DeviceData')));
       //   console.log(localStorage.getItem('DeviceData'));
          // localStorage.setItem( 'DeviceData', JSON.stringify( { 'userId': ids.userId, 'pushToken': ids.pushToken, 'deviceType': ( platform.is( 'android' ) ? 1 : 2 ), 'acctype': 1 } ) );
        });

        this._OneSignal.endInit();
      }
    });
    let status = JSON.parse(localStorage.getItem('logstatus'));

    console.log("Status" + status);

    if (status == false || status == null) {
      //	localStorage.setItem('versionData', JSON.stringify(this.versionData));

      this.commonservice.getCusAppVersion().then((data) => {

        this.versionData = data;
        if (data.showpopup == 1) {
          console.log(this.versionData);
          let profileModal = this.modalCtrl.create(IntroimgPage, { 'image': this.versionData });
          profileModal.present();
        }

      });

      if (localStorage.getItem('DeviceData') != null) {
				console.log('iffff',localStorage.getItem('DeviceData'))
				this.commonService.storeCollectionDevices({  'uuid':  (JSON.parse(localStorage.getItem('DeviceData'))!=null && JSON.parse(localStorage.getItem('DeviceData'))['uuid'] !=null) ? JSON.parse(localStorage.getItem('DeviceData'))['uuid'] : '1234567890', 'device_type': JSON.parse(localStorage.getItem('DeviceData'))!=null ? JSON.parse(localStorage.getItem('DeviceData'))['device_type'] : '','model':  (JSON.parse(localStorage.getItem('DeviceData'))!=null && JSON.parse(localStorage.getItem('DeviceData'))['model'] !=null) ? JSON.parse(localStorage.getItem('DeviceData'))['model'] : 'browser', }).then(res => {
				console.log(res)
				})
			}

      this.loginstatus = false;
      console.log(this.loginstatus);
      this.loginstatus = false;
      console.log(this.versionData);
      this.rootPage = LoginPage; // fst page login page
      //	this.rootPage = HomePage;

    } else {
      console.log(this.versionData);
      let remember = JSON.parse(localStorage.getItem('remember'));
      this.commonservice.getCusAppVersion().then((data) => {

        this.versionData = data;
        if (data.showpopup == 1) {
          console.log(this.versionData);
          let profileModal = this.modalCtrl.create(IntroimgPage,
            { 'image': this.versionData });
          profileModal.present();
        }

      });

      if (remember == true) {
        this.loginstatus = true; //'uuid': this.deviceid != null ? this.deviceid['uuid'] : null,
        console.log(this.loginstatus)
        console.log(1111111);

        console.log(localStorage.getItem('userdet'));
/*         console.log(localStorage.getItem('DeviceData'));
        if (JSON.parse(localStorage.getItem('DeviceData')) != null && JSON.parse(localStorage.getItem('DeviceData')) != undefined) {
          this.uuid = JSON.parse(localStorage.getItem('DeviceData'))['uuid'] != null ? JSON.parse(localStorage.getItem('DeviceData'))['uuid'] : null
          this.token = JSON.parse(localStorage.getItem('DeviceData'))['token'] != null ? JSON.parse(localStorage.getItem('DeviceData'))['token'] : null
          this.device_type = JSON.parse(localStorage.getItem('DeviceData'))['device_type'] != null ? JSON.parse(localStorage.getItem('DeviceData'))['device_type'] : null
        }
        console.log(this.uuid);
        console.log(this.token);
        console.log(this.device_type); */

        if (localStorage.getItem('userdet') != null) {
					this.commonService.doLogin({ 'username': JSON.parse(localStorage.getItem('userdet'))['username'], 'passwd': JSON.parse(localStorage.getItem('userdet'))['passwd'], 'uuid':  (JSON.parse(localStorage.getItem('DeviceData'))!=null && JSON.parse(localStorage.getItem('DeviceData'))['uuid'] !=null) ? JSON.parse(localStorage.getItem('DeviceData'))['uuid'] : '1234567890', 'token': JSON.parse(localStorage.getItem('DeviceData'))!=null ? JSON.parse(localStorage.getItem('DeviceData'))['token'] : '', 'device_type': JSON.parse(localStorage.getItem('DeviceData'))!=null ? JSON.parse(localStorage.getItem('DeviceData'))['device_type'] : '','model':  (JSON.parse(localStorage.getItem('DeviceData'))!=null && JSON.parse(localStorage.getItem('DeviceData'))['model'] !=null) ? JSON.parse(localStorage.getItem('DeviceData'))['model'] : 'browser', }).then(res => {
            if (res) {
              console.log(res)
              if (res.is_valid) {
                localStorage.setItem('kyc_status', JSON.stringify(res['customer']['kyc_status']));
                localStorage.setItem('sssuser', JSON.stringify(res));
                this.loginstatus = true;
              }
            }

          })
        }

      }

      else {
        //  alert(this.loginstatus );
        console.log(localStorage.getItem('userdet'));
        localStorage.setItem('logstatus', JSON.stringify(false));

        this.loginstatus = false;

        //	this.rootPage = HomePage; // fst page login page
        this.rootPage = LoginPage;

      }


    }

    events.subscribe('username:changed', (status) => {

      console.log("username:changed");
      this.loginstatus = status;
      console.log(this.loginstatus)
      if (status) {

      } else {
        this.loginstatus = false;

      }

    });
    /*   this.commonService.getcurrency(this.id_branch).then(data => {

        this.currency = data;
      }); */

    this.commonService.getcurrency(this.id_branch).then(data => {


      this.currency = data;
      localStorage.setItem('getcurrency', JSON.stringify(this.currency))
      /* 					this.allow_referral = data['currency']['allow_referral'];
                this.allow_shareonly = data['currency']['allow_shareonly']; */
      this.branch_settings = data['currency']['branch_settings'];

      /* 					console.log(this.allow_referral);
                console.log(this.allow_shareonly); */
    });

    var date = new Date();
    var ddd = date.getDate();
    var mmm = date.getMonth() + 1;
    var yy = date.getFullYear();
    this.currYear = yy;
    console.log(this.currYear);

    /* 	this.commonservice.company().then(data=>{

        this.details = data;
        console.log(this.details);

        })    */

  }




  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.commonService.getcurrency(this.id_branch).then(data => {

      this.currency = data;
      localStorage.setItem('getcurrency', JSON.stringify(this.currency))

      /* 			this.allow_referral = data['currency']['allow_referral'];
            this.allow_shareonly = data['currency']['allow_shareonly']; */
      this.branch_settings = data['currency']['branch_settings'];
      /* 			console.log(this.allow_referral);
            console.log(this.allow_shareonly); */
    });

  }


  presentAlert(msg, title, mypackage) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            if (mypackage != '') {
              	this.iab.create(mypackage, '_system', 'location=yes,hardwareback=yes,hidden=yes');  //Hidden For Krisha
              //	this.market.open(mypackage);
            }
            // this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }
  login() {
    this.menu.close();
    this.nav.push(LoginPage);
  }
  logout() {

    this.storage.get('settledPayment').then(data1 => {
      this.storage.get('localnewcus').then(data2 => {
        if (data1 != null || data2 != null) {
          this.presentAlert("You must be sync your collection data's to Online..", "", "");
          this.nav.setRoot(SyncPage);
        } else {
          let confirm = this.alertCtrl.create({
            title: 'Confirm Logout',
            subTitle: 'Are you sure you want to logout!',
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
                  localStorage.setItem('logstatus', JSON.stringify(false));
                  localStorage.setItem('remember', JSON.stringify(false));
                  this.loginstatus = false;

                  this.storage.set('settledPayment', null);
                  this.storage.set('paymentHistoryData', null);
                  this.storage.set('localnewcus', null);

                  this.events.publish('username:changed', false);
                  this.nav.setRoot(LoginPage, { st: false });
                }
              }
            ]
          });
          confirm.present();
        }
      });
    });

    // online Data :

    /* let confirm = this.alertCtrl.create({
      title: 'Confirm Logout',
      subTitle: 'Are you sure you want to logout!',
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
            localStorage.setItem('logstatus', JSON.stringify(false));
            localStorage.setItem('remember', JSON.stringify(false));
            this.loginstatus = false;
            this.events.publish('username:changed', false);
            this.nav.setRoot(LoginPage, { st: false });
          }
        }
      ]
    });
    confirm.present();
     */




  }



  openCart() {
    this.menu.close();
  }
  openHome() {
    this.menu.close();
    this.nav.setRoot(HomePage);
  }
  register() {
    this.menu.close();
    this.nav.push(RegisterPage);
  }
  category() {
    this.menu.close();

  }
  arrive(page) {
    this.menu.close();

    this.nav.push(NewarrivalsPage);
  }
  offer(page) {
    this.menu.close();

    this.nav.push(OfferPage);
  }
  support(page) {
    this.menu.close();

    this.nav.push(CustomerServicePage);
  }
  contactus() {
    this.menu.close();
  }
  Homes() {
    this.menu.close();
    this.nav.setRoot(HomePage);
  }
  scheme() {
    this.menu.close();

    this.nav.push(SchemetypePage);
  }
  wallet() {
    this.menu.close();
    let status = JSON.parse(localStorage.getItem('logstatus'));
    console.log("Status" + status);
    if (status == false || status == null) {
      this.nav.setRoot(LoginPage);

    }
    else {
      this.nav.push(WalletPage);
    }
  }
  pledge() {
    this.menu.close();
    this.nav.push(PledgecalculatorPage);
  }
  estical() {
    this.menu.close();
    this.nav.push(EsticalculatorPage);
  }
  sett() {
    this.menu.close();
    let status = JSON.parse(localStorage.getItem('logstatus'));
    if (status == false || status == null) {
      this.nav.setRoot(LoginPage);

    }
    else {
      this.nav.push(SettingsPage);
    }

    //	this.nav.push(SettingsPage);
  }

  sync() {
    this.menu.close();
    let status = JSON.parse(localStorage.getItem('logstatus'));
    if (status == false || status == null) {
      this.nav.setRoot(LoginPage);

    }
    else {
      this.nav.push(SyncPage, { type: 'menu' });
    }

    //	this.nav.push(SettingsPage);
  }
  invite() {
    this.menu.close();
    let status = JSON.parse(localStorage.getItem('logstatus'));
    if (status == false || status == null) {
      this.nav.setRoot(LoginPage);

    }
    else {
      this.nav.push(InvitePage);
    }
  }
  feedback() {
    this.menu.close();

    let status = JSON.parse(localStorage.getItem('logstatus'));
    if (status == false || status == null) {
      this.nav.setRoot(LoginPage);

    }
    else {
      this.nav.push(FeedbackPage);
    }

    //this.nav.setRoot(FeedbackPage);
  }
  dth() {
    this.menu.close();
    let status = JSON.parse(localStorage.getItem('logstatus'));
    if (status == false || status == null) {
      this.nav.setRoot(LoginPage);

    }
    else {
      this.nav.push(DthPage);
    }

  }
  coinbook() {
    this.menu.close();
    let status = JSON.parse(localStorage.getItem('logstatus'));
    if (status == false || status == null) {
      this.nav.setRoot(LoginPage);

    }
    else {
      this.nav.push(CoinBookFormPage);
    }
  }

  ratehistory() {
    this.menu.close();
    let status = JSON.parse(localStorage.getItem('logstatus'));
    if (status == false || status == null) {
      this.nav.setRoot(LoginPage);

    }
    else {
      this.nav.push(RatehistoryPage);
    }

  }

  kyc() {
    this.menu.close();

    this.nav.setRoot(KycPage);
  }
  passbook() {
    this.menu.close();
    let status = JSON.parse(localStorage.getItem('logstatus'));
    if (status == false || status == null) {
      this.nav.setRoot(LoginPage);

    }
    else {
      this.nav.push(MyschemePage);
    }

  }
  noti() {
    this.menu.close();
    let status = JSON.parse(localStorage.getItem('logstatus'));
    if (status == false || status == null) {
      this.nav.setRoot(LoginPage);

    }
    else {
      this.nav.push(NotificationPage);
    }

  }
  paydues() {
    this.menu.close();
    let status = JSON.parse(localStorage.getItem('logstatus'));
    if (status == false || status == null) {
      this.nav.setRoot(LoginPage);

    }
    else {
      this.nav.push(PayduesPage);
    }

  }
  close() {
    this.menu.close();
    let status = JSON.parse(localStorage.getItem('logstatus'));
    if (status == false || status == null) {
      this.nav.setRoot(LoginPage);

    }
    else {
      this.nav.push(ClosedPage);
    }

  }
  history(sch_type) {
    console.log(localStorage.getItem('dashData'));
    this.menu.close();
    let status = JSON.parse(localStorage.getItem('logstatus'));
    if (status == false || status == null) {
      this.nav.setRoot(LoginPage);

    }
    else {
      this.nav.push(PaymenthisPage, { 'sch_type': sch_type, 'dashdata': JSON.parse(localStorage.getItem('dashData')) });
    }

  }

  share() {
    this.menu.close();
    let status = JSON.parse(localStorage.getItem('logstatus'));

    if (status == false || status == null) {
      this.nav.setRoot(LoginPage);
    }
    else {
      this.nav.push(InvitePage);
    }
  }
  faq() {
    this.menu.close();

    this.nav.push(FaqPage);
  }
  aboutus() {
    this.menu.close();

    this.nav.push(AboutPage);
  }

  termscond() {
    this.menu.close();

    this.nav.push(TcPage);
  }
  policy() {
    this.menu.close();

    this.nav.push(PolicyPage);
  }
  locator() {
    this.menu.close();

    this.nav.push(StorelocatorPage);
  }

  giftpay() {
    this.menu.close();

    this.nav.push(GiftpaymentPage);
  }
  giftlist() {
    this.menu.close();
    this.nav.push(GiftlistPage);
  }


  instagram($event) {

    let submiturl = "https://instagram.com/djmjewels?r=nametag";
    var locationWindow = window.open(submiturl, '_blank', 'location=no, clearsessioncache=yes' + "&nocache=");

  }
  facebook($event) {

    let submiturl = "https://www.facebook.com/dhanlakshmijewellerymart.djm";
    var locationWindow = window.open(submiturl, '_blank', 'location=no, clearsessioncache=yes' + "&nocache=");

  }
  twitter($event) {

    let submiturl = "https://twitter.com/DhanlkashmiM1";
    var locationWindow = window.open(submiturl, '_blank', 'location=no, clearsessioncache=yes' + "&nocache=");

  }
  youtube($event) {

    let submiturl = "https://youtube.com/channel/UCKBKjcJZSZZ5ipA_ogMnJeg";
    var locationWindow = window.open(submiturl, '_blank', 'location=no, clearsessioncache=yes' + "&nocache=");

  }
  whatsapp() {

    var whatsappno = this.details['call_prefix'] + this.details['whatsapp_no'];

    console.log(this.details['whatsapp_no']);
    console.log(whatsappno);

    this.socialSharing.shareViaWhatsAppToReceiver(whatsappno, 'Hi,', null /* img */, null /* url */).then(() => {
      // Success!
    }).catch((e) => {
      alert("Sorry! Sharing via WhatsApp is not possible");
    });

  }
  contact($event) {

    this.nav.push(CustomerServicePage);
  }
  /* 	logimax($event) {

      let submiturl = "http://www.logimaxindia.com/";
      var locationWindow = window.open(submiturl, '_blank', 'location=no, clearsessioncache=yes' + "&nocache=");

    } */

}
