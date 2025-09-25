import { PayduesPage } from './../paydues/paydues';
import { File } from '@ionic-native/file';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { DatePicker } from '@ionic-native/date-picker';

/**
 * Generated class for the CustomerProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-customer-profile',
  templateUrl: 'customer-profile.html',
})

export class CustomerProfilePage {
  showtime: any = '';
  datacustomerledger: any = this.navParams.get('data');
  currentUser = JSON.parse(localStorage.getItem('sssuser'));
  ledger: any;
  filter: any = false;
  chit: any[] = [];
  id_scheme_acc: any;
  payments: any[] = [];
  paymentsfilter: any[] = []
  valuesize: any = 0;
  pge: any = 'ledger';
  fromdate: any = '';
  todate: any = '';
  filterdata: any;
  ttwgt: any = 0;
  ttamt: number = 0;
  isdata: any = false;
  datamess: any;
  currency: any = { 'currency': { 'reg_existing': 0, 'enable_dth ': 0, 'estimation': 0, 'pledge_calculator': 0, 'allow_shareonly': 0, 'allow_referral': 0, 'rate_history': 0, 'searchbyaccno': 0 } };
  status: any = JSON.parse(localStorage.getItem('logstatus'));
  id_branch: any = null;
  temp: any = { "mobile": "" }
  err:any;

  constructor(private datePicker: DatePicker, public events: Events, public comman: CommonProvider, public navCtrl: NavController, public navParams: NavParams, private load: LoadingController) {
    console.log(this.datacustomerledger)
    this.status = JSON.parse(localStorage.getItem('logstatus'));
    console.log("Status" + this.status);
    console.log(JSON.parse(localStorage.getItem('remember')))

    console.log(JSON.parse(localStorage.getItem('sssuser')))
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));

    if (JSON.parse(localStorage.getItem('sssuser')) != null && JSON.parse(localStorage.getItem('sssuser')) != undefined && this.status == true) {
      this.comman.getcurrency(currentUser['employee']['id_branch']).then(data => {
        this.currency = data;
        console.log('if', this.currency)
      })
    } else {
      this.comman.getcurrency(this.id_branch).then(data => {
        this.currency = data;
        console.log('else', this.currency)
      })
    }
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
    console.log(this.currentUser);
    let postdata = {
      "id_customer": this.datacustomerledger['id_customer'],
      "id_scheme_account": this.datacustomerledger['id_scheme_account'],
      "id_employee": this.currentUser['employee']['id_employee'],
      "id_branch ": this.currentUser['employee']['id_branch'],
      "firstname": this.currentUser['employee']['firstname'],
      "lastname": this.currentUser['employee']['lastname'],
      "email": this.currentUser['employee']['email'],
      "mobile": this.currentUser['employee']['mobile'],
      "login_type": this.currentUser['employee']['login_type'],
    }

    this.comman.customer_ledger_details(postdata).then(data => {
      console.log(data)
      if (data.status) {
        this.isdata = true;
        console.log(data);
        this.ledger = data;
        console.log(this.ledger['daily']);

        this.chit = this.ledger['account_info'];
        this.showtime = this.chit['account_type']
        console.log(this.chit)

        if ((this.showtime == 'Daily' || this.showtime == 'daily') && this.ledger['daily'] != '' && this.ledger['daily'] != null) {
          this.payments = this.ledger['daily'];
        } else if ((this.showtime == 'Monthly' || this.showtime == 'monthly') && this.ledger['monthly'] != '' && this.ledger['monthly'] != null) {
          this.payments = this.ledger['monthly'];
        }else if(this.showtime =='Both'|| this.showtime == 'both'){
          let dly =this.ledger['daily']
          let mly =this.ledger['monthly']
          console.log(dly)
          console.log(mly)
          if(dly.length >0){
            for(let i = 0 ;i < dly.length ; i++){
              this.payments.push(dly[i]);
            }
          }
          if(mly.length >0){
            for(let i = 0 ;i < mly.length ; i++){
              this.payments.push(mly[i]);
            }
          }
        }

        let c: any[] = this.payments
        // .filter(data => data['account_type']==this.showtime);
        console.log(c)
        let tempttwgt: number = 0;
        let tempttamt: number = 0;
        for (var i = 0; i < c.length; i++) {
          console.log(i)
          console.log(c[i])
          tempttwgt = tempttwgt + parseFloat(c[i]['weight'])
          tempttamt = tempttamt + parseFloat(c[i]['amount'])
          // this.ttwgt = this.ttwgt +parseFloat(c[i]['weight'])
          // this.ttamt = this.ttamt +parseFloat(c[i]['amount'])
        }
        console.log(tempttwgt)
        console.log((Math.round(tempttwgt * 100) / 100).toFixed(2));
        this.ttwgt = (Math.round(tempttwgt * 1000) / 1000).toFixed(3);
        this.ttamt = tempttamt;
        this.valuesize = this.payments
        // .filter(data=>data['account_type']==this.showtime);
        console.log(this.valuesize.length)
        console.log(this.payments)
        loader.dismiss();
      }
      else {
        this.isdata = false;
        this.err = data.message
        loader.dismiss();
      }

    }, (error) => {
      this.isdata = false;
      console.log(error)
      console.log(error.message);
      loader.dismiss();
    })




  }
  ionViewWillEnter() {
    let user = true;
    this.events.publish('user:created', user);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerProfilePage');
  }

  showtimeswitch(data) {
    console.log(data)
    this.showtime = data;
    if (this.showtime == "Monthly") {
      console.log(this.ledger['monthly']);

      this.chit = this.ledger['account_info'];
      this.showtime = data;
      console.log(this.chit)
      this.payments = this.ledger['monthly'];
      let c: any[] = this.payments
      // .filter(data => data['account_type']==this.showtime);
      console.log(c)
      let tempttwgt: number = 0;
      let tempttamt: number = 0;
      for (var i = 0; i < c.length; i++) {
        console.log(i)
        console.log(c[i])
        tempttwgt = tempttwgt + parseFloat(c[i]['weight'])
        tempttamt = tempttamt + parseFloat(c[i]['amount'])
        // this.ttwgt = this.ttwgt +parseFloat(c[i]['weight'])
        this.ttwgt = (Math.round(tempttwgt * 1000) / 1000).toFixed(3);
        this.ttamt = tempttamt;
      }
      console.log(tempttwgt)
      console.log((Math.round(tempttwgt * 100) / 100).toFixed(2));
      this.ttwgt = (Math.round(tempttwgt * 1000) / 1000).toFixed(3);
      this.valuesize = this.payments
      // .filter(data=>data['account_type']==this.showtime);
      console.log(this.valuesize.length)
      console.log(this.payments)
    }
    else if (this.showtime == "Daily") {
      console.log(this.ledger);

      this.chit = this.ledger['account_info'];
      this.showtime = data;
      console.log(this.chit)
      this.payments = this.ledger['daily'];
      let c: any[] = this.payments
      // .filter(data => data['account_type']==this.showtime);
      console.log(c)
      let tempttwgt: number = 0;
      let tempttamt: number = 0;
      for (var i = 0; i < c.length; i++) {
        console.log(i)
        console.log(c[i])
        tempttwgt = tempttwgt + parseFloat(c[i]['weight'])
        tempttamt = tempttamt + parseFloat(c[i]['amount'])
        // this.ttwgt = this.ttwgt +parseFloat(c[i]['weight'])
        this.ttwgt = (Math.round(tempttwgt * 1000) / 1000).toFixed(3);
        this.ttamt = this.ttamt + parseFloat(c[i]['amount'])
        this.ttamt = tempttamt;
      }
      console.log(tempttwgt)
      console.log((Math.round(tempttwgt * 100) / 100).toFixed(2));
      // this.ttwgt = (Math.round(tempttwgt * 1000) / 1000).toFixed(3);
      this.valuesize = this.payments
      // .filter(data=>data['account_type']==this.showtime);
      console.log(this.valuesize.length)
      console.log(this.payments)
    }


    // this.valuesize = this.payments.filter(data=>data['account_type']==this.showtime);
  }


  fromdatefun() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(date => {

      var ddd = ("0" + date.getDate()).slice(-2);
      var mmm = date.getMonth() + 1;
      var yy = date.getFullYear();
      //var today = new Date(yy+"-"+mmm+"-"+ddd).toISOString().substring(0, 10);
      var today = date.toISOString().substring(0, 10);
      //this.fromdate= today;
      console.log(ddd)
      console.log(mmm)
      console.log(yy)
      // this.fromdate = yy + "-" + mmm + "-" + ddd;
      this.fromdate = ddd + "-" + mmm + "-" + yy;
      // this.details.date_of_birth = ddd + "-" + mmm + "-" + yy;

      console.log(this.fromdate)
    });
  }
  todatefun() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(date => {


      // date.getDate()
      var ddd = ("0" + date.getDate()).slice(-2);
      var mmm = date.getMonth() + 1;
      var yy = date.getFullYear();
      //var today = new Date(yy+"-"+mmm+"-"+ddd).toISOString().substring(0, 10);
      var today = date.toISOString().substring(0, 10);
      //this.fromdate= today;
      console.log(ddd)
      console.log(mmm)
      console.log(yy)
      // this.todate = yy + "-" + mmm + "-" + ddd;
      this.todate = ddd + "-" + mmm + "-" + yy;
      // this.details.date_of_wed = ddd + "-" + mmm + "-" + yy;
      console.log(this.todate)
    });
  }

  confirm() {
    // let startdate = '01-11-2022'
    // let enddate   = '04-12-2022'
    console.log(this.todate, 'todate')
    console.log(this.fromdate, 'fromdate')
    this.paymentsfilter = this.payments.filter(data => data['trans_date'] <= this.todate && data['trans_date'] >= this.fromdate && data['account_type'] == this.showtime);
    for (var i = 0; i < this.paymentsfilter.length; i++) {
      this.ttwgt = this.ttwgt + parseFloat(this.paymentsfilter[i]['weight'])
      this.ttamt = this.ttamt + parseFloat(this.paymentsfilter[i]['amount'])
    }
    console.log(this.ttamt)
    console.log(this.ttwgt)
    console.log(this.paymentsfilter)
    this.pge = 'ledger';
    this.filter = true

  }
  filtersearch() {
    this.pge = 'search';
  }
  back(d) {
    console.log(d)
    if (d == 'search') {
      this.pge = 'ledger';
      this.filter = false
    }
    else if (d == 'ledger') {
      this.pge = 'search';
      this.filter = false
    }
  }
  paydue() {
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));
    console.log(currentUser)
    this.temp['mobile'] = this.chit['mobile'];
    console.log(currentUser)
    var postdata = {
      'id_employee': currentUser['employee']['id_employee'],
      'login_type': currentUser['employee']['login_type'],
      'cusmobile': this.datacustomerledger['mobile'],
      'emp_branch': currentUser['employee']['id_branch'],
      'branch_settings': this.currency['currency']['branch_settings'],
      'schemecode': "",
      'year': "",
      'schemeaccno': ""
    }
    console.log(postdata);
    localStorage.setItem('postdata', JSON.stringify(postdata));

    this.navCtrl.push(PayduesPage)
  }
}
