import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,LoadingController,ToastController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { CommonProvider } from '../../providers/common';
import { Chart } from 'chart.js';
import { BranchPage } from '../branch/branch';

/**
 * Generated class for the RatehistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-ratehistory',
  templateUrl: 'ratehistory.html',
})
export class RatehistoryPage {
  @ViewChild('barChart') barChart;
  bars: any;
  colorArray: any;

  type:any ='Gold';
  from:any;
  to:any;
  history:any[] = [];
  showSpinner:any = true;
  chartgrate:any[] = [];
  chartsrate:any[] = [];
  chartprate:any[] = [];
  chartgdate:any[] = [];
  chartsdate:any[] = [];
  chartpdate:any[] = [];
  chartratestatus:any = false;

  branchname: any = '';
  branchid: any = '';
  branch_wiseRate: any='';
  branch_settings: any = 0;
  id_branch:any='';

  
  createBarChart(data,date) {


    console.log(data);
    console.log(date);


      this.bars = new Chart(this.barChart.nativeElement, {
        type: 'line',
        data: {
          labels:date,
          datasets: [{
            label: this.type + ' ' + 'Graphical Rates',
            data: data,
            backgroundColor: 'rgb(235, 157, 161)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(99, 11, 35)',// array should have same number of elements as number of dataset
            borderWidth: 3
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
                stepSize: 500,

              }
            }]
          }
        }
      }); 
  }
  constructor(public toast:ToastController, public comman:CommonProvider, private datePicker: DatePicker,public navCtrl: NavController, public navParams: NavParams,public modal: ModalController,public load: LoadingController) {
    
    var date = new Date();
    var ddd = date.getDate();
    var mmm = date.getMonth() + 1;
    var yy = date.getFullYear();
    // var today = date.toISOString().substring(0, 10);
    this.to = yy+"-"+mmm+"-"+ddd;

    var ddd = date.getDate();
    var mmm = date.getMonth() == 0 ? 12 : date.getMonth();
    var yy =  date.getMonth() == 0 ? date.getFullYear() - 1 : date.getFullYear();
    // var today = date.toISOString().substring(0, 10);
    this.from = yy+"-"+mmm+"-"+ddd;
	
  this.comman.getcurrency(this.id_branch).then(data => {
    this.branch_settings = data['currency']['branch_settings'];
    this.branch_wiseRate = data['currency']['is_branchwise_rate'];
    console.log(this.branch_settings);
    console.log(this.branch_wiseRate);

    var curUser = JSON.parse(localStorage.getItem('sssuser'));
    console.log(curUser);
    if(this.branch_settings == 1 && this.branch_wiseRate == 1  ){
      this.branchid = curUser['customer']['id_branch'];
    }else{
      this.branchid = null;
    }

    this.comman.ratehistory({"branch_settings":this.branch_settings,"id_branch":this.branchid,"from":this.from,"to":this.to}).then(data=>{

      data.forEach(data => {
        
        this.chartgrate.push(data['goldrate_22ct'])
        this.chartgdate.push(data['updatetime'].slice(0,5))

      });
      data.forEach(data => {
        
        this.chartsrate.push(data['silverrate_1gm'])
        this.chartsdate.push(data['updatetime'].slice(0,5))

      });
	  data.forEach(data => {
        
        this.chartprate.push(data['platinum_1g'])
        this.chartpdate.push(data['updatetime'].slice(0,5))

      });
      this.history = data;
      this.showSpinner = false;

      if(this.chartgrate.length>0){
        this.chartratestatus = true;
    this.createBarChart(this.chartgrate,this.chartgdate);
      }
      else{
        this.chartratestatus = false;
      }
    })
  });

  //  this.branch_settings = curUser['currency']['currency']['branch_settings'];
   // this.branch_wiseRate = curUser['currency']['currency']['is_branchwise_rate']
     console.log(this.chartgrate);
    console.log(this.chartgdate);
  }
  openmodal() {

    let mod = this.modal.create(BranchPage)
    mod.present();
    this.chartgrate = [];
    this.chartsrate = [];
    this.chartprate = [];

    this.chartgdate = [];
    this.chartsdate = [];
    this.chartpdate = [];

    mod.onDidDismiss(data => {

      console.log(data);
      if (data != undefined) {
        this.branchname = data['name']
        this.branchid = data['id_branch']

        let loader = this.load.create({
          content: 'Please Wait',
          spinner: 'dots',
        });
        loader.present();


        this.comman.ratehistory({"branch_settings":this.branch_settings,"id_branch":this.branchid,"from":this.from,"to":this.to}).then(data=>{

          data.forEach(data => {
            
            this.chartgrate.push(data['goldrate_22ct'])
            this.chartgdate.push(data['updatetime'].slice(0,5))
    
          });
          data.forEach(data => {
            
            this.chartsrate.push(data['silverrate_1gm'])
            this.chartsdate.push(data['updatetime'].slice(0,5))
    
          });
		  data.forEach(data => {
            
            this.chartprate.push(data['platinum_1g'])
            this.chartpdate.push(data['updatetime'].slice(0,5))
    
          });
          this.history = data;
          this.showSpinner = false;
            if(this.type == 'Gold'){
            if(this.chartgrate.length>0){
              this.chartratestatus = true;

            this.createBarChart(this.chartgrate,this.chartgdate);
            }
            else{
              this.chartratestatus = false;
        
            }
          }
		  else if(this.type == 'Platinum'){
        if(this.chartprate.length>0){
          this.chartratestatus = true;

            this.createBarChart(this.chartprate,this.chartpdate);
        }
        else{
          this.chartratestatus = false;
    
        }
          }
          else{
            if(this.chartsrate.length>0){
              this.chartratestatus = true;

            this.createBarChart(this.chartsrate,this.chartsdate);
            }
            else{
              this.chartratestatus = false;
        
            }
        
          }
        })
        loader.dismiss();

      }

    });

    console.log('1111')
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RatehistoryPage');
  }
  fromdate(){
    this.datePicker.show({
        date: new Date(this.from),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
      }).then(date =>{	

        var ddd = date.getDate();
        var mmm = date.getMonth() + 1;
        var yy = date.getFullYear();
        //var today = new Date(yy+"-"+mmm+"-"+ddd).toISOString().substring(0, 10);
        var today = date.toISOString().substring(0, 10);
        //this.fromdate= today;
        this.from = yy+"-"+mmm+"-"+ddd;

        var fromdate = new Date(this.from);
        var todate = new Date();
    
        var old = new Date(this.from);
        var now = new Date('2014-01-01');

        if(old >= now){
        if(fromdate <= todate){
        // console.log( this.productdet.due_date)
        this.history = [];
        this.showSpinner = true;

        this.comman.ratehistory({"branch_settings":this.branch_settings,"id_branch":this.branchid,"from":this.from,"to":this.to}).then(data=>{

          this.chartgrate = [];
          this.chartsrate = [];
          this.chartprate = [];

          this.chartgdate = [];
          this.chartsdate = [];
          this.chartpdate = [];

          data.forEach(data => {
        
            this.chartgrate.push(data['goldrate_22ct'])
            this.chartgdate.push(data['updatetime'].slice(0,5))

          });
          data.forEach(data => {
            
            this.chartsrate.push(data['silverrate_1gm'])
            this.chartsdate.push(data['updatetime'].slice(0,5))

          });
		  data.forEach(data => {
            
            this.chartprate.push(data['platinum_1g'])
            this.chartpdate.push(data['updatetime'].slice(0,5))

          });
          if(this.type == 'Gold'){
            if(this.chartgrate.length>0){
              this.chartratestatus = true;

            this.createBarChart(this.chartgrate,this.chartgdate);
            }
            else{
              this.chartratestatus = false;
        
            }
          }
		  else if(this.type == 'Platinum'){
        if(this.chartprate.length>0){
          this.chartratestatus = true;

            this.createBarChart(this.chartprate,this.chartpdate);
        }
        else{
          this.chartratestatus = false;
    
        }
          }
          else{
            if(this.chartsrate.length>0){
              this.chartratestatus = true;

            this.createBarChart(this.chartsrate,this.chartsdate);
            }
            else{
              this.chartratestatus = false;
        
            }
        
          }

          this.history = data;
          this.showSpinner = false;
          console.log(this.history);

    
        });
      }
      else{
        let toast = this.toast.create({
          message: 'Rate History Not Available For Future Dates',
          position: 'bottom',

          duration: 6000
        });
        toast.present();
  
      }
    }
    else{
      let toast = this.toast.create({
        message: 'Please Select Date After 2014-01-01',
        position: 'bottom',

        duration: 6000
      });
      toast.present();

    }
     

      });
}
todate(){
  this.datePicker.show({
      date: new Date(this.to),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(date =>{	

      var ddd = date.getDate();
      var mmm = date.getMonth() + 1;
      var yy = date.getFullYear();
      //var today = new Date(yy+"-"+mmm+"-"+ddd).toISOString().substring(0, 10);
      var today = date.toISOString().substring(0, 10);
      //this.fromdate= today;
      this.to = yy+"-"+mmm+"-"+ddd;
      var fromdate = new Date(this.to);
      var todate = new Date();
  

      var old = new Date(this.to);
        var now = new Date('2014-01-01');

        if(old >= now){
      if(fromdate <= todate){
  
        console.log(true);
         // console.log( this.productdet.due_date)
      this.history = [];
      this.showSpinner = true;

      this.comman.ratehistory({"branch_settings":this.branch_settings,"id_branch":this.branchid,"from":this.from,"to":this.to}).then(data=>{

        this.chartgrate = [];
        this.chartsrate = [];
        this.chartprate = [];

        this.chartgdate = [];
        this.chartsdate = [];
        this.chartpdate = [];
        
        data.forEach(data => {
      
          this.chartgrate.push(data['goldrate_22ct'])
          this.chartgdate.push(data['updatetime'].slice(0,5))

        });
        data.forEach(data => {
          
          this.chartsrate.push(data['silverrate_1gm'])
          this.chartsdate.push(data['updatetime'].slice(0,5))

        });
		data.forEach(data => {
          
          this.chartprate.push(data['platinum_1g'])
          this.chartpdate.push(data['updatetime'].slice(0,5))

        });
        if(this.type == 'Gold'){
          if(this.chartgrate.length>0){
            this.chartratestatus = true;

          this.createBarChart(this.chartgrate,this.chartgdate);
          }
          else{
            this.chartratestatus = false;
      
          }
        }
		else if(this.type == 'Platinum'){
      if(this.chartprate.length>0){
        this.chartratestatus = true;

            this.createBarChart(this.chartprate,this.chartpdate);
      }
      else{
        this.chartratestatus = false;
  
      }
        }
        else{
          if(this.chartsrate.length>0){
            this.chartratestatus = true;

          this.createBarChart(this.chartsrate,this.chartsdate);
          }
          else{
            this.chartratestatus = false;
      
          }
      
        }

        this.history = data;
        this.showSpinner = false;

  
      });
      }
      else{
        let toast = this.toast.create({
          message: 'Rate History Not Available For Future Dates',
          position: 'bottom',

          duration: 6000
        });
        toast.present();
  
      }
    }
    else{
      let toast = this.toast.create({
        message: 'Please Select Date After 2014-01-01',
        position: 'bottom',

        duration: 6000
      });
      toast.present();

    }
     
    });
  
}
segmentChanged(e){


  if(this.type == 'Gold'){
    if(this.chartgrate.length>0){
      this.chartratestatus = true;

    this.createBarChart(this.chartgrate,this.chartgdate);
    }
    else{
      this.chartratestatus = false;

    }
  }
  else if(this.type == 'Platinum'){
    if(this.chartprate.length>0){
      this.chartratestatus = true;

  this.createBarChart(this.chartprate,this.chartpdate);
    }
    else{
      this.chartratestatus = false;

    }
  }
  else{
    if(this.chartsrate.length>0){
      this.chartratestatus = true;

    this.createBarChart(this.chartsrate,this.chartsdate);
    }
    else{
      this.chartratestatus = false;

    }

  }
  
}
isOdd(num){

  return num % 2;
}
 // Chart events
 public chartClicked(e:any):void {
  console.log(e);
}

// Chart events
public chartHovered(e:any):void {
  console.log(e);
}


}
