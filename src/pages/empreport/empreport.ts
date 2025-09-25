import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController,LoadingController } from 'ionic-angular';

import { DatePicker } from '@ionic-native/date-picker';
import { CommonProvider } from '../../providers/common';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { BluetoothPage } from '../bluetooth/bluetooth';

/**
 * Generated class for the EmpreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-empreport',
  templateUrl: 'empreport.html',
  providers: [CommonProvider]
})
export class EmpreportPage {
  //  public dateForm: FormGroup;
  //public fromdate: AbstractControl;
  // public todate: AbstractControl;
  fromdate: any = '';
  todate: any = '';
  details: any = { 'ddd': '', 'mmm': '', 'yy': '' };
  details2: any[] = [];
  details3: any[] = [];

  payment_mode = 'all'
  filterdate: any;
  totalAmt: any;
  errmsg: any;
  buttondis:boolean=true;
  partialfilter:any = 'all';
  id_branch: any = null;
  currency:any;
  partial_filter:any=0;

  currentUser = JSON.parse(localStorage.getItem('sssuser'));

  checknet = localStorage.getItem('checknetwork');

  app_version = JSON.parse(localStorage.getItem('appVersion'));

  constructor(private loadingCtrl: LoadingController,private storage: Storage,public events: Events, private builder: FormBuilder, public comman: CommonProvider, public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker, public toast: ToastController,) {
    console.log(this.currentUser);
    console.log(this.app_version);
    var tday = new Date();
    var ddd = tday.getDate();
    var mmm = tday.getMonth() + 1;
    var yy = tday.getFullYear();
    // this.fromdate = yy + "-" + mmm + "-" + ddd;
    // this.todate = yy + "-" + mmm + "-" + ddd;

    this.comman.getcurrency(this.id_branch).then(data => {
      this.currency = data['currency'];
      this.partial_filter = this.currency['partial_filter']
      console.log(this.currency)
    })

    this.events.subscribe('checknetwork', (data) => {
      this.checknet = data;
      console.log(11111111111111111, data)
    });
    console.log('checkNet', this.checknet);

    if (this.checknet == 'offline') {
      // offline

      this.storage.get('paymentHistoryData').then((val) => {
        console.log('paymentHistoryData : ', JSON.parse(val));
        this.details2 = JSON.parse(val);
        this.details3 = JSON.parse(val);
        console.log('paymentHistoryData 1 : ', this.details2);

        if (this.details2.length > 0) {
          console.log(this.details2.length)

          var total = 0;
          for (var i = 0; i < this.details2.length; i++) {
            var schac = this.details2[i];
            console.log(schac);
            total += parseInt(schac.payment_amount)
          }
          this.totalAmt = total.toLocaleString("en-IN")
          console.log(this.totalAmt)

        } else {
          // error msg
          this.errmsg = "No Records !!"
          this.totalAmt = 0;
        }

      });

    }
else{
  let loader = this.loadingCtrl.create({
    // content: 'Please Wait',
     spinner: 'crescent',
 });
 loader.present();


  this.filterdate = {
    'id_employee': this.currentUser['employee']['id_employee'],
    'login_type': this.currentUser['employee']['login_type'],
    'emp_branch': this.currentUser['employee']['id_branch'],
    'branch_settings': this.currentUser['currency']['currency']['branch_settings'],
    'fromdate': this.fromdate != "" ? this.fromdate : null,
    'todate': this.todate != "" ? this.todate : null,
    'payment_mode': this.payment_mode
  }

  console.log(this.filterdate);

  this.comman.pay_collection(this.filterdate).then(data => {
    console.log(data['data'])
    this.details2 = data['data'];
    this.details3 = data['data'];
    if (data['data'].length > 0) {
      console.log(data['data'].length)

      var total = 0;
      for (var i = 0; i < this.details2.length; i++) {
        var schac = this.details2[i];
        console.log(schac);
        total += parseInt(schac.payment_amount)
      }
      this.totalAmt = total.toLocaleString("en-IN")
      console.log(this.totalAmt)

    } else {
      // error msg
      this.errmsg = "No Records !!"
      this.totalAmt = 0;
    }
    loader.dismiss();
  })


}


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpreportPage');
  }

  fromdatefun() {
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
      this.fromdate = yy + "-" + mmm + "-" + ddd;
      // this.details.date_of_birth = ddd + "-" + mmm + "-" + yy;

      console.log(this.fromdate)
      this.checkdatebtn (this.fromdate ,this.todate)
    });
    // if(this.fromdate !=''&& this.todate != ''){
    //   this.buttondis = false
    // }else{
    //   this.buttondis=true
    // }
  }
  todatefun() {
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
      this.todate = yy + "-" + mmm + "-" + ddd;
      // this.details.date_of_wed = ddd + "-" + mmm + "-" + yy;
      this.checkdatebtn (this.fromdate ,this.todate)
      console.log(this.todate)
    });
    // if(this.fromdate !=''&& this.todate != ''){
    //   this.buttondis = false
    // }else{
    //   this.buttondis=true
    // }
  }
  checkdatebtn(fromdate,todate){
       if( fromdate!=''&& todate != ''){
      this.buttondis = false
    }else{
      this.buttondis=true
    }

  }


  onSubmit() {
    var date = new Date();
    var ddd = date.getDate();
    var mmm = date.getMonth() + 1;
    var yy = date.getFullYear();
    var today = yy+"-"+mmm+"-"+ddd;
    console.log(this.fromdate,'formdate')
    console.log(this.todate ,'todate')
    console.log(today ,'today')
    //  console.log(value)
    //    if (value.valid) {
      let loader = this.loadingCtrl.create({
        // content: 'Please Wait',
         spinner: 'crescent',
     });
     loader.present();

    this.filterdate = {
      'id_employee': this.currentUser['employee']['id_employee'],
      'login_type': this.currentUser['employee']['login_type'],
      'emp_branch': this.currentUser['employee']['id_branch'],
      'branch_settings': this.currentUser['currency']['currency']['branch_settings'],
      'fromdate': this.fromdate != "" ? this.fromdate : null,
      'todate': this.todate != "" ? this.todate : null,
      'payment_mode': this.payment_mode
    }

    console.log(this.filterdate);

    if (this.fromdate != '' && this.todate != '') {
      if (this.fromdate <= this.todate && this.todate <= today) {

        this.comman.pay_collection(this.filterdate).then(data => {
          console.log(data['data'])
          this.details2 = data['data'];
          this.details3 = data['data'];
          if (data['data'].length > 0) {
            console.log(data['data'].length)

            var total = 0;
            for (var i = 0; i < this.details2.length; i++) {
              var schac = this.details2[i];
              console.log(schac);
              total += parseInt(schac.payment_amount)
            }
            this.totalAmt = total.toLocaleString("en-IN")

          } else {
            // error msg
            this.errmsg = "No Records !!"
            this.totalAmt = 0;
          }
        })
      } else {
        let toast = this.toast.create({
          message: "Records Not Available For Future Dates",
          position: 'bottom',
          duration: 6000
        });
        toast.present();
      }
    } else {
      let toast = this.toast.create({
        message: "* Fields are Mandatory..",
        position: 'bottom',
        duration: 6000
      });
      toast.present();
    }
    loader.dismiss();
  }

  checkInput(value) {
    let loader = this.loadingCtrl.create({
      // content: 'Please Wait',
       spinner: 'crescent',
   });
   loader.present();
    this.details = ''
    this.filterdate.payment_mode = value;

    this.payment_mode = value;
    console.log(this.payment_mode);
    console.log(this.filterdate)
    this.comman.pay_collection(this.filterdate).then(data => {
      console.log(data['data'])
      this.details2 = data['data'];
      this.details3 = data['data'];
      if (data['data'].length > 0) {
        console.log(data['data'].length)

        var total = 0;
        for (var i = 0; i < this.details2.length; i++) {
          var schac = this.details2[i];
          console.log(schac);
          total += parseInt(schac.payment_amount)
        }
        this.totalAmt = total.toLocaleString("en-IN")

      } else {
        // error msg
        this.errmsg = "No Records !!"
        this.totalAmt = 0;
      }
      loader.dismiss();
    })



  }

  ionViewWillEnter() {
    let user = false;

    this.events.publish('user:created', user);
  }
  ionViewWillLeave() {
    let user = true;

    this.events.publish('user:created', user);
  }


  goBack() {
    console.log('true');
    this.navCtrl.setRoot(HomePage);
  }
  takeprint(pay_printable) {
    this.navCtrl.push(BluetoothPage, { 'printerurl': pay_printable });
  }

  partialchange(s){
    if(this.partialfilter != s && s != 'all'){
      this.partialfilter = s
      this.details2 = this.details3.filter(data=>data['scheme_pay_type'] == s)
    }else if(this.partialfilter != s && s == 'all'){
      this.partialfilter = s
      this.details2 = this.details3
    }
  }
}
