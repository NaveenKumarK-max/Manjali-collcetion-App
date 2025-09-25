
import { Component,Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { Events,  ViewController,ToastController ,LoadingController} from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { PaymenthisPage } from '../paymenthis/paymenthis';
import { HomePage } from '../home/home';
import { CommonProvider } from '../../providers/common';

/**
 * Generated class for the CustomPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-walletmodal',
  templateUrl: 'walletmodal.html',
  providers: [CommonProvider]

})
export class WalletmodalPage {


  details:any = this.navParams.get('detail');
  eligble:any = 0;
  redeem:any = 0;
  currency:any = '';
  temp:any[] =[];
  id_branch:any=null;
  payable = this.navParams.get('payable');
  
  constructor(public appCtrl: App,public load:LoadingController, public toast:ToastController,public comman:CommonProvider, public event:Events,public navCtrl: NavController,public renderer: Renderer,public viewCtrl: ViewController, public navParams: NavParams) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'walletmodal', true);
 
    this.eligble = this.navParams.get('data');
    this.redeem = this.navParams.get('payable');
    console.log(this.eligble);
    console.log(this.redeem);
   console.log(this.navParams.get('data'))
   this.comman.getcurrency(this.id_branch).then(data=>{

    this.currency = data;

  })
  if(this.eligble<this.redeem){

    this.redeem = this.eligble;
  }
  this.details.forEach((element,i) => {
      
    var index = 1;

    while(index <= element['sel_due'] ){
      var test:any = Object.assign({}, element);
      test['sel_due'] = 1;
      this.temp.push(test)
      index ++;
    }
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomPopupPage');
  }
  ionViewWillEnter() {
    let user = false;

    this.event.publish('user:created', user);
  }


/*   mobie_numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  } */

  public onKeyUp(event: any) {
    //const NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
   const NUMBER_REGEXP = /^[0-9]*$/;
    let newValue = event.target.value;
    let regExp = new RegExp(NUMBER_REGEXP);

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
      return true;
    }else{
      return false;
    }
  }
  
  close(){

    this.viewCtrl.dismiss();
  }
  paypage(){
     this.viewCtrl.dismiss();
    this.navCtrl.push(PaymentPage,{redm:0,data:this.navParams.get('payable'),detail:this.navParams.get('detail')})
  }
  


  checkpay(){

    console.log(this.eligble);
    console.log(this.redeem);
    if(parseFloat(this.eligble) >= parseFloat(this.redeem)){
      if(this.navParams.get('payable') >= this.redeem ){
      var amount = this.navParams.get('payable') - this.redeem;
      if(amount == 0 ){
        var loader = this.load.create({
          content: 'Please Wait',
          spinner: 'dots',
        });
        loader.present();
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

        this.comman.fullpay({"pay_arr":test,"redeemed_amount":this.redeem,"phone":currentUser.mobile}).then(data=>{

          if(data['status'] == true){

            this.viewCtrl.dismiss();
            loader.dismiss();

            let ctrl = this.toast.create({
              message:  data['msg'],
              duration: 1000,
              position: 'bottom'
            }); 
            ctrl.present();
            this.appCtrl.getRootNav().setRoot(HomePage);

          }
          else{
            this.viewCtrl.dismiss();

            loader.dismiss();

            let ctrl = this.toast.create({
              message:  data['msg'],
              duration: 1000,
              position: 'bottom'
            }); 
            ctrl.present();
          }
        })


      }
      else{
        this.viewCtrl.dismiss();
        this.navCtrl.push(PaymentPage,{data:amount,redm:this.redeem,detail:this.navParams.get('detail')})
        console.log(this.redeem);
        console.log(this.navParams.get('detail'));

      }
    }
      else{

        let ctrl = this.toast.create({
          message:  "Please Enter Correct Redeem amount",
          duration: 1000,
          position: 'bottom'
        }); 
        ctrl.present();
      }
  }
  else{
    console.log(this.eligble);
    console.log(this.redeem);
    let ctrl = this.toast.create({
      message:  "Insufficient Wallet Balance",
      duration: 1000,
      position: 'bottom'
    }); 
    ctrl.present();
  }
}

}
