import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { parseDate } from 'ionic-angular/umd/util/datetime-util';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EsticalculatorPage } from '../esticalculator/esticalculator';

/**
 * Generated class for the PledgecalculatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pledgecalculator',
  templateUrl: 'pledgecalculator.html',
})
export class PledgecalculatorPage {
  details: any = { 'fromdate': '', 'todate': '' };
  total_interest:any = 0;
  total_amount:any = 0;
  amount: any = '';
  tenure:any;
  interest_rate: any = '';
  notice: any = '';

  interest_due = 1;
  interesttype = 1;
  tenuretype = 1;
  date: any;
  curMonth_days: any;
  fromdat: any;
  todat: any
  tempfromdat: any;
  temptodat: any
  diffdays:any=1;
  diffmonth :any=1;
  from= new Date();
  to = new Date();
  errmsg ='';
  age:any = {'years':'','months':'','days':''};

  yint:any = 0;
  mint:any = 0;
  dint:any = 0;

  tyint:any = 0;
  tmint:any = 0;
  tdint:any = 0;
  seg:any = 'p';


  constructor(public socialSharing:SocialSharing,public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker,public toast:ToastController,) {

    
    this.fromdat = new Date();
    var dd = this.fromdat.getDate();
    var mmm = this.fromdat.getMonth() + 1;
    var yyyy = this.fromdat.getFullYear();
    var today = this.fromdat.toISOString().substring(0, 10);
    console.log(dd.toString().length)
    console.log(dd.toString().length ==1)

    if(dd.toString().length == 1){

      dd = '0' + dd;

    }
    if(mmm.toString().length == 1){

      mmm = '0' + mmm;

    }
    this.tempfromdat = new Date();
    this.temptodat = new Date();

    this.tempfromdat = mmm + "/" + dd + "/" + yyyy;
    this.fromdat =  dd + "/" + mmm +  "/" + yyyy;

    this.temptodat = mmm + "/" + dd + "/" + yyyy;
    this.todat =  dd + "/" + mmm +  "/" + yyyy;

    console.log(this.fromdat);
    console.log(this.tempfromdat);

    this.getAge(this.tempfromdat);



  }
   compare_dates(date1){
    
  var g1 = new Date(this.temptodat); 
    // (YYYY-MM-DD) 
    var g2 = new Date(date1); 
    if (g1.getTime() < g2.getTime()) {
      let ctrl = this.toast.create({
        message: 'Please Enter Valid From Date',
        duration: 2000,
        position: 'bottom'
      });
      ctrl.present();

    }
    else if (g1.getTime() > g2.getTime()) {
      
    }
    else{

    }
 }
 tocompare_dates(date1){
    
  var g1 = new Date(this.tempfromdat); 
    // (YYYY-MM-DD) 
    var g2 = new Date(date1); 
    if (g1.getTime() > g2.getTime()) {
      let ctrl = this.toast.create({
        message: 'Please Enter Valid to Date',
        duration: 2000,
        position: 'bottom'
      });
      ctrl.present();

    }
    else if (g1.getTime() < g2.getTime()) {
      
    }
    else{

    }
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PledgecalculatorPage');
  }





  Amount(amount) {

    localStorage.setItem('am',JSON.stringify(this.amount))
    // this.calc(this.interest_due);
    var yearstotal:any = '';
    var monthstotal:any = '';
    var daystotal:any = '';
    var fytotal:any = '';
    var fmtotal:any = '';
    var fdtotal:any = '';

    yearstotal = parseFloat(this.amount)  * this.interest_rate / 100 * this.age['years']
    yearstotal = parseFloat(yearstotal).toFixed(); 
    this.yint = yearstotal;
    console.log(yearstotal);

    monthstotal = parseFloat(this.amount)  * this.interest_rate / 100 * this.age['months'] + parseFloat(yearstotal);
    monthstotal = parseFloat(monthstotal).toFixed(); 
    this.mint = monthstotal;
    console.log(monthstotal);

    daystotal = parseFloat(this.amount)  * this.interest_rate / 100 * this.age['days'] / 100 + parseFloat(monthstotal);
    daystotal = parseFloat(daystotal).toFixed(); 
    this.dint = daystotal;

    console.log(daystotal);
    console.log((this.notice !=''? parseFloat(this.notice) : 0))

    fytotal = parseFloat(yearstotal) + parseFloat(this.amount) + (this.notice !=''? parseFloat(this.notice) : 0);
    fytotal = parseFloat(fytotal).toFixed(); 
    this.tyint = fytotal;


    fmtotal = parseFloat(monthstotal) + parseFloat(this.amount) + (this.notice !=''? parseFloat(this.notice) : 0);
    fmtotal = parseFloat(fmtotal).toFixed(); 
    this.tmint = fmtotal;


    fdtotal =  parseFloat(daystotal) + parseFloat(this.amount) + (this.notice !=''? parseFloat(this.notice) : 0);
    fdtotal = parseFloat(fdtotal).toFixed(); 
    this.tdint = fdtotal;


    console.log(fytotal)
    console.log(fmtotal)
    console.log(fdtotal)

  }
  elAmount(amount) {

    localStorage.setItem('am',JSON.stringify(this.amount))

    // this.calc(this.interest_due);
    var yearstotal:any = '';
    var monthstotal:any = '';
    var daystotal:any = '';
    var fytotal:any = '';
    var fmtotal:any = '';
    var fdtotal:any = '';

    yearstotal = parseFloat(this.amount)  * this.interest_rate / 100 * this.age['years'] * 12
    yearstotal = parseFloat(yearstotal).toFixed(); 
    this.yint = yearstotal;
    console.log(yearstotal);

    monthstotal = parseFloat(this.amount)  * this.interest_rate / 100 * this.age['months'] ;
    monthstotal = parseFloat(monthstotal).toFixed(); 
    this.mint = monthstotal;
    console.log(monthstotal);

    daystotal = parseFloat(this.amount)  * this.interest_rate / 100 * this.age['days'] / 30;
    daystotal = parseFloat(daystotal).toFixed(); 
    this.dint = daystotal;

    console.log(daystotal);

    fytotal = parseFloat(yearstotal) + parseFloat(this.amount)+ (this.notice !=''? parseFloat(this.notice) : 0);
    fytotal = parseFloat(fytotal).toFixed(); 
    this.tyint = fytotal;


    fmtotal = parseFloat(monthstotal) + parseFloat(this.amount)+ (this.notice !=''? parseFloat(this.notice) : 0);
    fmtotal = parseFloat(fmtotal).toFixed(); 
    this.tmint = fmtotal;


    fdtotal =  parseFloat(daystotal) + parseFloat(this.amount)+ (this.notice !=''? parseFloat(this.notice) : 0);
    fdtotal = parseFloat(fdtotal).toFixed(); 
    this.tdint = fdtotal;


    console.log(fytotal)
    console.log(fmtotal)
    console.log(fdtotal)

  }
  cmAmount(amount) {


    localStorage.setItem('am',JSON.stringify(this.amount))

    // this.calc(this.interest_due);
    var yearstotal:any = 0;
    var monthstotal:any = 0;
    var daystotal:any = 0;
    var fytotal:any = 0;
    var fmtotal:any = 0;
    var fdtotal:any = 0;
    this.yint = 0;
    this.mint = 0;
    this.dint = 0;
    let am :any=  ((JSON.parse(localStorage.getItem('am')) !='' && JSON.parse(localStorage.getItem('am')) != null)? JSON.parse(localStorage.getItem('am')) : 0);
    let ytempamount:any = parseFloat(am);

    for (let index = 1; index <= this.age['years']; index++) {
      yearstotal = parseFloat(yearstotal) + ytempamount * this.interest_rate / 100  * 12
      ytempamount = parseFloat(yearstotal) + ytempamount ; 
      console.log(ytempamount)

        this.yint = parseFloat(yearstotal).toFixed();
        console.log(this.yint); 
      
     
    }


    let mtempamount:any = parseFloat(am);

      monthstotal =  mtempamount * this.interest_rate / 100  
      mtempamount = parseFloat(monthstotal) * this.age['months'] ; 

        this.mint = parseFloat(mtempamount).toFixed();
        console.log(this.mint);
      
     
  


    let dtempamount:any = parseFloat(am);

      daystotal =  dtempamount * this.interest_rate / 100  
      dtempamount = parseFloat(daystotal) * this.age['days'] / 30; 

        this.dint = parseFloat(dtempamount).toFixed();
        console.log(this.dint); 
      
     
    

    
    fytotal = parseFloat(am) + parseFloat(this.yint) + (this.notice !=''? parseFloat(this.notice) : 0);
    fytotal = parseFloat(fytotal).toFixed(); 
    this.tyint = fytotal;


    fmtotal = parseFloat(am) + parseFloat(this.mint) + (this.notice !=''? parseFloat(this.notice) : 0);
    fmtotal = parseFloat(fmtotal).toFixed(); 
    this.tmint = fmtotal;


    fdtotal = parseFloat(am) + parseFloat(this.dint) + (this.notice !=''? parseFloat(this.notice) : 0);
    fdtotal = parseFloat(fdtotal).toFixed(); 
    this.tdint = fdtotal;

    console.log(this.yint); 
    console.log(this.mint); 
    console.log(this.dint); 

    console.log(fytotal)
    console.log(fmtotal)
    console.log(fdtotal)

  }
  Interest(interest_rate) {
   
    if(this.seg == 'p'){

      this.Amount('');
    }
    if(this.seg == 'e'){

      this.elAmount('');
    } 
    if(this.seg == 'c'){

      this.cmAmount('');
    }  
     // this.calc(this.interest_due);
  }
  noticee(){
    if(this.seg == 'p'){

      this.Amount('');
    }
    if(this.seg == 'e'){

      this.elAmount('');
    }
    if(this.seg == 'c'){

      this.cmAmount('');
    } 
  }
  paisa(){
    if(this.seg == 'p'){

      this.Amount('');
    }
    if(this.seg == 'e'){

      this.elAmount('');
    }
    if(this.seg == 'c'){

      this.cmAmount('');
    } 
  }
 
  
  fromDate() {
    this.datePicker.show({
      date: new Date(this.tempfromdat),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(date => {
      this.from = date;
      var dd:any  = date.getDate();
      var mmm:any  = date.getMonth() + 1;
      var yyyy = date.getFullYear();
      var today = date.toISOString().substring(0, 10);
      if(dd.toString().length == 1){

        dd = '0' + dd;

      }
      if(mmm.toString().length == 1){

        mmm = '0' + mmm;

      }
      this.compare_dates(yyyy+'-'+mmm+'-'+dd);

      this.tempfromdat = new Date();

    this.tempfromdat = mmm + "/" + dd + "/" + yyyy;
    this.fromdat =  dd + "/" + mmm +  "/" + yyyy;

    
    console.log(this.fromdat);
    console.log(this.tempfromdat);

      this.getAge(this.tempfromdat);

    });
  }
  toDate() {
    this.datePicker.show({
      date: new Date(this.temptodat),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(date => {
      this.to = date;
      var dd:any = date.getDate();
      var mmm:any = date.getMonth() + 1;
      var yyyy = date.getFullYear();
      var today = date.toISOString().substring(0, 10);
      if(dd.toString().length == 1){

        dd = '0' + dd;

      }
      if(mmm.toString().length == 1){

        mmm = '0' + mmm;

      }
      this.tocompare_dates(yyyy+'-'+mmm+'-'+dd);

    this.temptodat = new Date();


    this.temptodat = mmm + "/" + dd + "/" + yyyy;
    this.todat =  dd + "/" + mmm +  "/" + yyyy;
    
    console.log(this.todat);
    console.log(this.temptodat);

      this.getAge(this.tempfromdat);

    });
  }
  goto(){
    this.navCtrl.push(EsticalculatorPage);
  }
  segmentChanged(e){

    this.seg = e.value;
    if(this.seg == 'p'){

      this.Amount('');
    }
    if(this.seg == 'e'){

      this.elAmount('');
    }
    if(this.seg == 'c'){

      this.cmAmount('');
    } 
  }

   getAge(dateString) {
    var now:any = new Date(this.temptodat);
    var today = new Date(now.getYear(),now.getMonth(),now.getDate());
  
    var yearNow = now.getYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();
  
    var dob:any = new Date(dateString.substring(6,10),
                       dateString.substring(0,2)-1,                   
                       dateString.substring(3,5)                  
                       );
  
    var yearDob = dob.getYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var age:any = {};
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";
  
  
   var yearAge = yearNow - yearDob;
  
    if (monthNow >= monthDob)
      var monthAge = monthNow - monthDob;
    else {
      yearAge--;
      var monthAge = 12 + monthNow -monthDob;
    }
  
    if (dateNow >= dateDob)
      var dateAge = dateNow - dateDob;
    else {
      monthAge--;
      var dateAge = 31 + dateNow - dateDob;
  
      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }
  
     age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
        };
  
    if ( age.years > 1 ) yearString = " years";
    else yearString = " year";
    if ( age.months> 1 ) monthString = " months";
    else monthString = " month";
    if ( age.days > 1 ) dayString = " days";
    else dayString = " day";
  
  
    if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )
      ageString = age.years + yearString + ", " + age.months + monthString + ", and " + age.days + dayString + " old.";
    else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
      ageString = "Only " + age.days + dayString + " old!";
    else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
      ageString = age.years + yearString + " old. Happy Birthday!!";
    else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
      ageString = age.years + yearString + " and " + age.months + monthString + " old.";
    else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
      ageString = age.months + monthString + " and " + age.days + dayString + " old.";
    else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
      ageString = age.years + yearString + " and " + age.days + dayString + " old.";
    else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
      ageString = age.months + monthString + " old.";
    else ageString = "Oops! Could not calculate age!";
  
    this.age['years'] = age.years;
    this.age['months'] = age.months;
    this.age['days'] = age.days;
    if(this.seg == 'p'){

      this.Amount('');
    }
    if(this.seg == 'e'){

      this.elAmount('');
    }
    if(this.seg == 'c'){

      this.cmAmount('');
    } 
    console.log(age.years)
    console.log(age.months)
    console.log(age.days)

    return ageString;
  }
  whatsapp(){
    // console.log(this.company['whatsapp_no'])
    let message = " From Date : " + this.fromdat + "\n" + " To Date : " + this.todat + "\n" + " Amount : " + '₹'+this.amount + "\n" + " Rate Of Interest % : " + this.interest_rate + "\n" + " No of Years : " + this.age['years'] + "\n" + " No of Months : " + this.age['months'] + "\n" + " No of Days : " + this.age['days'] + "\n" + " Interest Amount(Year) : " + '₹'+this.yint + "\n" + " Interest Amount(Month) : " + '₹'+this.mint + "\n" + " Interest Amount(Day): " + '₹'+this.dint + "\n" + " Total Amount(Year) : " + '₹'+this.tyint + "\n" + " Total Amount(Month) : " + '₹'+this.tmint + "\n" + " Total Amount(Day) : " + '₹'+this.tdint + "\n" ;

    console.log(message)
    // this.socialSharing.shareViaWhatsAppToReceiver(this.company['whatsapp_no'], '','','').then((data) => {
      this.socialSharing.shareViaWhatsApp(message, '','https://www.vimalajewellery.com/').then((data) => {

      console.log(data);

      // Success!
  }).catch((err) => {
      console.log(err);

      // Error!
      alert("Sorry! Sharing via WhatsApp is not possible");
  });
  }
}
