import { Component } from '@angular/core';
import { IonicPage,App, NavController, NavParams,ModalController,ToastController,LoadingController,Events ,AlertController} from 'ionic-angular';
import { PaydetailmodalPage } from '../paydetailmodal/paydetailmodal';
import { PaymentPage } from '../payment/payment';
import { WalletmodalPage } from '../walletmodal/walletmodal';
import { CommonProvider,BaseAPIURL } from '../../providers/common';
import { HomePage } from '../home/home';
import { PayduesPage } from '../paydues/paydues';

/**
 * Generated class for the NetbankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-netbank',
  templateUrl: 'netbank.html',
  providers: [CommonProvider]

})
export class NetbankPage {

  details:any[] = [];
  temp:any[] = [];

  total:any = 0;
  collect:any = '';
  currency:any = '';
  detail:any = this.navParams.get('detail');
  id_branch:any=null;


  constructor(public appCtrl:App, public alertCtrl:AlertController, public events:Events, public load:LoadingController,public comman:CommonProvider, public toast:ToastController,public modal:ModalController, public navCtrl: NavController, public navParams: NavParams) {

    this.details = this.navParams.get('banks')
    this.total = this.navParams.get('total');
    console.log(this.details);

    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
    const values = Object.keys(this.details ).map(key => this.details [key]);

    this.details = values
    console.log(values)

    this.detail.forEach((element,i) => {
      
      var index = 1;

      while(index <= element['sel_due'] ){
        var test:any = Object.assign({}, element);
        test['sel_due'] = 1;
        this.temp.push(test)
        index ++;
      }
    });
   
    this.comman.getcurrency(this.id_branch).then(data =>{

      this.currency = data;
      loader.dismiss();
    });
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetbankPage');
  }
  ionViewWillEnter() {
    let user = false;

    this.events.publish('user:created', user);
  }
  ionViewWillLeave() {
    let user = true;

    this.events.publish('user:created', user);
  }
  pay(){

    let mod =   this.modal.create(PaydetailmodalPage,{data:this.navParams.get('data'),total:this.navParams.get('total')})
    mod.present();
  
  }
  choose(data){

    this.collect = data['ibibo_code']
    console.log(this.collect)
  }
  check(){

    if(this.collect != ''){
      this.continuetech(1);
    }
    else{
      let ctrl = this.toast.create({
        message:  'Select Banks(s) to Proceed',
        duration: 6000,
        position: 'middle'
      }); 
      ctrl.present();
    }
    

   
  }
  continuetech(data){
    var d = new Date(),
    n = d.getTime();
    var pay:any = {};
    var currentUser = JSON.parse(localStorage.getItem('sssuser')) ;
    var test:any[] = [];
  
    console.log(this.temp)
    this.temp.forEach(element => {
      
      var acc_no = element.chit_number != null ? element.chit_number : "Not Allocated";

      if(element['gst_type'] == 0 && element['scheme_type'] == 0 || element['gst_type'] == 0 && element['scheme_type'] == 2 || element['gst_type'] == 0 && element['scheme_type'] == 3){
        	 pay = {
					'scheme_type': element.scheme_type,
					'chit_number': element.code + "-" + acc_no,
					'amount': element.payable,
					'pay_amt': element.payable,
					'max_amt': element.max_amount,
					'min_amt': element.min_amount,
					'udf1': element.id_scheme_account,
					'udf2': "",
					'udf3': this.currency['metal_rates']['goldrate_22ct'],
					'udf4': element.payable,
					'udf5': element.sel_due,
					'charge': element.charge,
					'charge_head': element.charge_head,
          'due_type':  element.due_type,
					'discount': element.disamt,
          'gst_amt': element.gstcalc,
          'allowed_dues': element.allowed_dues,
          'id_branch': element.id_branch
        };
        test.push(pay);
      }
      else if(element['gst_type'] == 1 && element['scheme_type'] == 0 || element['gst_type'] == 1 && element['scheme_type'] == 2 || element['gst_type'] == 1 && element['scheme_type'] == 3){
         pay = {
        'scheme_type': element.scheme_type,
        'chit_number': element.code + "-" + acc_no,
        'amount': parseInt(element.gstper) - parseInt(element.gstcalc),
        'pay_amt': element.gstper,
        'max_amt': element.max_amount,
        'min_amt': element.min_amount,
        'udf1': element.id_scheme_account,
        'udf2': "",
        'udf3': this.currency['metal_rates']['goldrate_22ct'],
        'udf4': parseInt(element.gstper) - parseInt(element.gstcalc),
        'udf5': element.sel_due,
        'charge': element.charge,
        'charge_head': element.charge_head,
        'due_type':  element.due_type,
        'discount': element.disamt,
        'gst_amt': element.gstcalc,
        'allowed_dues': element.allowed_dues,
        'id_branch': element.id_branch
      };
      test.push(pay);

    }
    
   else if(element['gst_type'] == 0 && element['scheme_type'] == 1 ){
       pay = {
      'scheme_type': element.scheme_type,
      'chit_number': element.code + "-" + acc_no,
      'amount': element.max_wgt_rate,
      'pay_amt': element.max_wgt_rate,
      'udf1': element.id_scheme_account,
      'udf2': element.eligible_weight,
      'udf3': this.currency['metal_rates']['goldrate_22ct'],
      'udf4': element.max_wgt_rate,
      'udf5': element.sel_due,
      'charge': element.charge,
      'charge_head': element.charge_head,
      'due_type':  element.due_type,
      'discount': element.disamt,
      'gst_amt': element.gstcalc,
      'allowed_dues': element.allowed_dues,
      'id_branch': element.id_branch
    };
    test.push(pay);

  }
  else if(element['gst_type'] == 1 && element['scheme_type'] == 1 ){
     pay = {
    'scheme_type': element.scheme_type,
    'chit_number': element.code + "-" + acc_no,
    'amount': parseInt(element.gstper) - parseInt(element.gstcalc) ,
    'pay_amt': element.gstper,
    'udf1': element.id_scheme_account,
    'udf2': element.eligible_weight,
    'udf3': this.currency['metal_rates']['goldrate_22ct'],
    'udf4': parseInt(element.gstper) - parseInt(element.gstcalc),
    'udf5': element.sel_due,
    'charge': element.charge,
    'charge_head': element.charge_head,
    'due_type':  element.due_type,
    'discount': element.disamt,
    'gst_amt': element.gstcalc,
    'allowed_dues': element.allowed_dues,
    'id_branch': element.id_branch
  };
  test.push(pay);

}
    });

    console.log(test)
        
      let submiturl = BaseAPIURL + "paymt/mobile_payment?firstname=" +currentUser['customer'].firstname + "&lastname=" + currentUser['customer'].lastname + "&phone=" + currentUser.mobile +"&id_branch=" + currentUser['customer'].id_branch + "&amount=" + this.total + "&redeemed_amount=" + this.navParams.get('redm') + "&productinfo=" + '' + "&email=" + currentUser['customer'].email + "&pg=" + 'NB' + "&bankcode=" + this.collect + "&gateway=" + data + "&pay_arr=" + encodeURIComponent(JSON.stringify(test)) + "&nocache=" + n;

    var paymentWindow = window.open(submiturl, '_blank', 'location=no, clearsessioncache=yes');



    paymentWindow.addEventListener('loadstart', (event)=>{

      console.log(event)
      if (event['url'] == BaseAPIURL + "paymt/failureMURL") {
        paymentWindow.close();


        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: 'Your transaction has been failed, Please try again',
          buttons: ['Dismiss']

        });
        alert.present();
                    this.appCtrl.getRootNav().setRoot(HomePage);

      }

      if (event['url'] == BaseAPIURL + "paymt/cancelMURL") {
        paymentWindow.close();


        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: 'Your transaction has been cancelled, Please try again',
          buttons: ['Dismiss']

        });
        alert.present();
                    this.appCtrl.getRootNav().setRoot(HomePage);

      }
    });
    paymentWindow.addEventListener('loadstop', (event)=>{
      
      if (event['url'] == BaseAPIURL + "paymt/successMURL") {
        paymentWindow.close();

        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Thanks for your payment with us.Your payment (sub. to realisation) is processed successfully.',
          buttons: ['Dismiss']

        });
        alert.present();
                    this.appCtrl.getRootNav().setRoot(HomePage);

      }
      
      if (event['url'] == BaseAPIURL + "paymt/payment_rejected") {
        paymentWindow.close();


        let alert = this.alertCtrl.create({
          title: 'Payment Rejected',
          subTitle: 'Your payment has beeen rejected, please try again later ...',
          buttons: ['Dismiss']

        });
        alert.present();
                    this.appCtrl.getRootNav().setRoot(HomePage);

      }
    });
    paymentWindow.addEventListener('loaderror', (event)=>{
      
      paymentWindow.close();

      let alert = this.alertCtrl.create({
        title: 'Payment Under Process',
        buttons: ['Dismiss']

      });
      alert.present();
                  this.appCtrl.getRootNav().setRoot(HomePage);
    });
    paymentWindow.addEventListener('exit', (event)=>{
    });


  console.log(this.details)
   
  }

}
