import { GoldratemodelPage } from './../goldratemodel/goldratemodel';
import { Keyboard,Searchbar } from 'ionic-angular';
import { PayduesPage } from './../paydues/paydues';
import { File } from '@ionic-native/file';
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Events,ModalController,AlertController  } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { DatePicker } from '@ionic-native/date-picker';
import { CusPendingMsgPage } from './../cus-pending-msg/cus-pending-msg';


/**
 * Generated class for the TodayscollectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-todayscollection',
  templateUrl: 'todayscollection.html',
})
export class TodayscollectionPage {
  @ViewChild('mySearchbar') searchbar: Searchbar;
  showtime:any='total';
  currentUser = JSON.parse(localStorage.getItem('sssuser'));
  total:any[]=[];
  pending:any[]=[];
  completed:any[]=[];
  ttamt:number=0;
  cashttl:number=0;
  onlinettl:number=0;
  sortedArray:string[]=[];
  id_branch: any = null;
  temp: any = { "mobile": "" }
  currency: any = { 'currency': { 'reg_existing': 0, 'enable_dth ': 0, 'estimation': 0, 'pledge_calculator': 0, 'allow_shareonly': 0, 'allow_referral': 0, 'rate_history': 0, 'searchbyaccno': 0 } };
  // goldrate:any;

  public input: string = '';
  constructor(private keyboard: Keyboard,private alertCtrl: AlertController,public modal: ModalController,private datePicker: DatePicker,public events: Events,public comman:CommonProvider,public navCtrl: NavController, public navParams: NavParams,private load: LoadingController) {
    // console.log( JSON.parse(localStorage.getItem('getcurrency')))
    // this.goldrate = JSON.parse(localStorage.getItem('getcurrency'))['metal_rates']
    this.comman.getcurrency(this.id_branch).then(data => {

      this.currency = data;
  })

    let loader = this.load.create({
      spinner: 'crescent',
    });
    loader.present();
    let postdata ={
      // "id_employee": this.currentUser['employee']['id_employee'],
      "id_employee": this.currentUser['employee']['id_employee'],
      "id_branch ": this.currentUser['employee']['id_branch'],
      "firstname": this.currentUser['employee']['firstname'],
      "lastname": this.currentUser['employee']['lastname'],
      "email": this.currentUser['employee']['email'],
      "mobile": this.currentUser['employee']['mobile'],
      "login_type":this.currentUser['employee']['login_type'],
  }
    this.comman.agentWise_monthly_reports(postdata).then(data=>{
      console.log(data)
      let c = data.hasOwnProperty('completed')?data['completed'].filter(item => item['customer'] != null && item['customer'] != undefined && item['customer'] != ''):'';
      let p = data.hasOwnProperty('pending')?data['pending'].filter(item => item['customer'] != null && item['customer'] != undefined && item['customer'] != ''):'';
      let t = data.hasOwnProperty('total')?data['total'].filter(item => item['customer'] != null && item['customer'] != undefined && item['customer'] != ''):'';
      this.completed = c;
      this.pending = p;
      this.total = t;
      this.sortedArray = data['total'];
      console.log(this.completed)
      console.log(this.pending)
      console.log(this.total)
      if(this.total != undefined){
        for(var i = 0;i<this.total.length;i++){
          console.log(i)
          if(this.total[i]['payment_amount']!=null && this.total[i]['payment_amount']!=undefined){
            this.ttamt = this.ttamt +parseFloat(this.total[i]['payment_amount'])
          }
          if(this.total[i]['cash_total']!=null && this.total[i]['cash_total']!=undefined){
            this.cashttl = this.cashttl +parseFloat(this.total[i]['cash_total'])
          }
          if(this.total[i]['online_total']!=null && this.total[i]['online_total']!=undefined){
            this.onlinettl = this.onlinettl +parseFloat(this.total[i]['online_total'])
          }


        }


      }

      loader.dismiss();

    },(error) => {
      loader.dismiss();

    })
  }
  pay(i){
    console.log(i)
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));
    var postdata = {
      'id_employee': currentUser['employee']['id_employee'],
      'login_type': currentUser['employee']['login_type'],
      'cusmobile': i['mobile'],
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodayscollectionPage');
  }

  switch(sw){
    this.searchbar.clearInput(null);
    console.log(sw)
    let loader = this.load.create({
      spinner: 'crescent',
      duration: 750
    });
    loader.present()
    if(sw != this.showtime){
      this.showtime=sw;
      if(sw == 'total'){
        this.sortedArray = this.total;
      }
      else if(sw == 'pending'){
        this.sortedArray = this.pending;
      }
      else if(sw == 'completed'){
        this.sortedArray = this.completed;
      }
    // loader.dismiss()
    // setTimeout(function() { loader.dismiss()}, 3000);
    }
  }
  payDues(mobile){
    console.log(mobile)
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));
    var postdata = {
        'id_employee': currentUser['employee']['id_employee'],
        'login_type': currentUser['employee']['login_type'],
        'cusmobile': mobile,
        'emp_branch': currentUser['employee']['id_branch'],
        'schemecode': "",
        'year': "",
        'schemeaccno': ""
    }
    console.log(postdata);
    this.navCtrl.push(PayduesPage,{'postdata':postdata,'pageType':'fromCollection'});

  }
  pendingPop(data){
    console.log(data);
    let mod = this.modal.create(CusPendingMsgPage,{'data':data});
    mod.present();

  }
  metal(){
    console.log('test')
    let mod = this.modal.create(GoldratemodelPage);
    mod.present();

  }

  search() {
    console.log(this.total)
    console.log(this.pending)
    console.log(this.completed)
    if(this.showtime == 'total'){
      this.sortedArray = this.total.filter(item => item['customer'].toUpperCase().includes(this.input.toUpperCase()) ||  item['mobile'].toUpperCase().includes(this.input.toUpperCase()));
    }
    else if(this.showtime == 'pending'){
      this.sortedArray = this.pending.filter(item => item['customer'].toUpperCase().includes(this.input.toUpperCase())||  item['mobile'].toUpperCase().includes(this.input.toUpperCase()));

    }
    else if(this.showtime == 'completed'){
      this.sortedArray = this.completed.filter(item => item['customer'].toUpperCase().includes(this.input.toUpperCase())||  item['mobile'].toUpperCase().includes(this.input.toUpperCase()));

    }


  }
  removeFocus() {
    this.keyboard.close();
  };

}
