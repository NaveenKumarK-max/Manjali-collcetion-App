import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events,ToastController,Content } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { EsticalculatorPage } from '../esticalculator/esticalculator';
import { SellitemPage } from '../sellitem/sellitem';

/**
 * Generated class for the PurchaseitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-purchaseitem',
  templateUrl: 'purchaseitem.html',
  providers: [CommonProvider]
})
export class PurchaseitemPage {
  @ViewChild(Content) content: Content;

  purchase_category: any=1 ;
  purchase_weight: any;
  purchase_wastage: any;
  final_wei: any;
  making_charge: any;
  stone_charge: any;
  purchase_total = 0;
  rates: any = '';
  currency: any = { 'currency': { 'currency_symbol': '' } };
  id_branch: any = null;
  purchaseitem:any[]=[{ 'purchase_total': '', 'purchase_category': 1, 'purchase_weight': '', 'purchase_wastage': '0', 'final_wei': '', 'making_charge': '', 'stone_charge': '','mcper':'' }];
  idx:any = '';
  whole:any[]= [];
  edit:any = false;
  show = 'err';



  constructor(public toast:ToastController ,public events: Events, public navCtrl: NavController, public navParams: NavParams, public load: LoadingController, public comman: CommonProvider) {
   console.log(this.navParams.get('purchaseitem'));
   console.log(JSON.parse(localStorage.getItem('pur')))
    if(this.navParams.get('purchaseitem') !=undefined ){
      this.purchaseitem = [JSON.parse(localStorage.getItem('pur'))];
      this.idx = this.navParams.get('idx');
      this.whole = this.navParams.get('full');
      this.edit = this.navParams.get('edit');

      console.log(this.purchaseitem);
      console.log(this.idx);
      console.log(this.edit);


    }
    console.log(this.purchaseitem);

    console.log(JSON.parse(localStorage.getItem('pDetails')))
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
    this.comman.getcurrency(this.id_branch).then(data => {
      this.currency = data;
      this.rates = data['metal_rates']
      console.log(this.rates);
    })
    loader.dismiss();
  }

  add(){
    this.purchaseitem.push({ 'purchase_total': '', 'purchase_category': 1, 'purchase_weight': '', 'purchase_wastage': '0', 'final_wei': '', 'making_charge': '', 'stone_charge': '','mcper':'' });

    var y:any = Object.assign({}, this.purchaseitem);
     console.log(y);

    this.purchaseitem.reverse();
    console.log(this.purchaseitem);
    this.content.scrollToTop();
  }
  remove(i){

    this.purchaseitem.splice(i,1);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseitemPage');
  }
  PurchaseCate(purchase_category,i) {
    if(purchase_category == '1'){
      this.purchaseitem[i].stone_charge = '';
      this.FinalWei('',i);

    }
    if(purchase_category == '2'){
      this.FinalWei('',i);

    }
    if(purchase_category == '3'){
      this.purchaseitem[i].stone_charge = '';
      // this.purchaseitem[i].purchase_wastage = '0';

      this.FinalWei('',i);

    }
  }
  PurchaseWei(purchase_weight,i) {
    console.log(purchase_weight);
    this.purchaseitem[i].purchase_weight = purchase_weight;
    console.log(this.purchase_weight)
    this.FinalWei(purchase_weight,i);
  }
  PurchaseWast(purchase_wastage,i) {
    console.log(purchase_wastage);
    this.purchaseitem[i].purchase_wastage = purchase_wastage;
    console.log(this.purchase_wastage)
    this.FinalWei(purchase_wastage,i);
  }
  FinalWei(final_wei,i) {
    if(this.purchaseitem[i].purchase_category != '3'){

    this.purchaseitem[i].final_wei = ((parseFloat(this.purchaseitem[i].purchase_wastage) / 100) * parseFloat(this.purchaseitem[i].purchase_weight)) + parseFloat(this.purchaseitem[i].purchase_weight)
    this.purchaseitem[i].final_wei = parseFloat(this.purchaseitem[i].final_wei).toFixed(3);
    console.log('final' + this.purchaseitem[i].final_wei);

    
    if (this.purchaseitem[i].stone_charge != '' && this.purchaseitem[i].making_charge != '') {

      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].making_charge) + parseFloat(this.purchaseitem[i].stone_charge) + this.purchaseitem[i].final_wei * this.rates['mjdmagoldrate_22ct'];
  
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
      }
      else if (this.purchaseitem[i].stone_charge != '' && this.purchaseitem[i].making_charge == '') {
  
        this.purchaseitem[i].purchase_total =  parseFloat(this.purchaseitem[i].stone_charge) + this.purchaseitem[i].final_wei * this.rates['mjdmagoldrate_22ct'];
        this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
        }
        else if (this.purchaseitem[i].stone_charge == '' && this.purchaseitem[i].making_charge != '') {
  
          this.purchaseitem[i].purchase_total =  parseFloat(this.purchaseitem[i].making_charge) + this.purchaseitem[i].final_wei * this.rates['mjdmagoldrate_22ct'];
          this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
          }
        else if (this.purchaseitem[i].stone_charge == '' && this.purchaseitem[i].making_charge == '') {
      
        this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].final_wei) * this.rates['mjdmagoldrate_22ct'];
        this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
  
      }
    }
    if(this.purchaseitem[i].purchase_category == '3'){

      // if (this.purchaseitem[i].purchase_weight != '' && this.purchaseitem[i].making_charge != '') {
  
      //   console.log(1)
      //   this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].making_charge)  + this.purchaseitem[i].purchase_weight * this.rates['mjdmasilverrate_1gm'];
      //   this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
      //   }
      //     else if (this.purchaseitem[i].purchase_weight != '' && this.purchaseitem[i].making_charge == '') {
        
      //       console.log(2)
      //     this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_weight) * this.rates['mjdmasilverrate_1gm'];
      //     this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
    
      //   }
      //   else if (this.purchaseitem[i].purchase_weight == '' && this.purchaseitem[i].making_charge != '') {
        
      //     console.log(3)
      //     this.purchaseitem[i].purchase_total = '';
    
    
      //   }
      this.purchaseitem[i].final_wei = ((parseFloat(this.purchaseitem[i].purchase_wastage) / 100) * parseFloat(this.purchaseitem[i].purchase_weight)) + parseFloat(this.purchaseitem[i].purchase_weight)
      this.purchaseitem[i].final_wei = parseFloat(this.purchaseitem[i].final_wei).toFixed(3);
      console.log('final' + this.purchaseitem[i].final_wei);
  
      
      if (this.purchaseitem[i].mcper != '' && this.purchaseitem[i].making_charge != '') {
  
        this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].making_charge) + parseFloat(this.purchaseitem[i].mcper) + this.purchaseitem[i].final_wei * this.rates['mjdmasilverrate_1gm'];
    
        this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
        }
        else if (this.purchaseitem[i].mcper != '' && this.purchaseitem[i].making_charge == '') {
    
          this.purchaseitem[i].purchase_total =  parseFloat(this.purchaseitem[i].mcper) + this.purchaseitem[i].final_wei * this.rates['mjdmasilverrate_1gm'];
          this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
          }
          else if (this.purchaseitem[i].mcper == '' && this.purchaseitem[i].making_charge != '') {
    
            this.purchaseitem[i].purchase_total =  parseFloat(this.purchaseitem[i].making_charge) + this.purchaseitem[i].final_wei * this.rates['mjdmasilverrate_1gm'];
            this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
            }
          else if (this.purchaseitem[i].mcper == '' && this.purchaseitem[i].making_charge == '') {
        
          this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].final_wei) * this.rates['mjdmasilverrate_1gm'];
          this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
    
        }
      }
  }
  MakingCharge(making_charge,i) {

    if(this.purchaseitem[i].purchase_category != '3'){

    if (this.purchaseitem[i].stone_charge == '' && this.purchaseitem[i].making_charge != '') {
    
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].making_charge) + parseFloat(this.purchaseitem[i].final_wei) * this.rates['mjdmagoldrate_22ct'];
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);

    }
    else if (this.purchaseitem[i].stone_charge != '' && this.purchaseitem[i].making_charge == '') {
    
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].stone_charge) + parseFloat(this.purchaseitem[i].final_wei) * this.rates['mjdmagoldrate_22ct'];
     
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
    }
    else if (this.purchaseitem[i].stone_charge != '' && this.purchaseitem[i].making_charge != '') {

      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].making_charge) + parseFloat(this.purchaseitem[i].stone_charge) + this.purchaseitem[i].final_wei * this.rates['mjdmagoldrate_22ct'];
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
      }
      else if (this.purchaseitem[i].stone_charge == '' && this.purchaseitem[i].making_charge == '') {
    
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].final_wei) * this.rates['mjdmagoldrate_22ct'];
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
    }
  }
  if(this.purchaseitem[i].purchase_category == '3'){

    if (this.purchaseitem[i].purchase_weight != '' && this.purchaseitem[i].making_charge != '') {

      console.log(1)
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].making_charge)  + this.purchaseitem[i].purchase_weight * this.rates['mjdmasilverrate_1gm'];
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
      }
        else if (this.purchaseitem[i].purchase_weight != '' && this.purchaseitem[i].making_charge == '') {
      
          console.log(2)
        this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_weight) * this.rates['mjdmasilverrate_1gm'];
        this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
  
      }
      else if (this.purchaseitem[i].purchase_weight == '' && this.purchaseitem[i].making_charge != '') {
      
        console.log(3)
        this.purchaseitem[i].purchase_total = '';
  
  
      }
    }
  }


  StoneCharge(stone_charge,i) {

    if (stone_charge != '' && this.purchaseitem[i].making_charge != '') {

    this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].making_charge) + parseFloat(this.purchaseitem[i].stone_charge) + this.purchaseitem[i].final_wei * this.rates['mjdmagoldrate_22ct'];
    this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
    }
    else if (this.purchaseitem[i].stone_charge != '' && this.purchaseitem[i].making_charge == '') {

      this.purchaseitem[i].purchase_total =  parseFloat(this.purchaseitem[i].stone_charge) + this.purchaseitem[i].final_wei * this.rates['mjdmagoldrate_22ct'];
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
      }
      else if (this.purchaseitem[i].stone_charge == '' && this.purchaseitem[i].making_charge != '') {

        this.purchaseitem[i].purchase_total =  parseFloat(this.purchaseitem[i].making_charge) + this.purchaseitem[i].final_wei * this.rates['mjdmagoldrate_22ct'];
        this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
        }
      else if (this.purchaseitem[i].stone_charge == '' && this.purchaseitem[i].making_charge == '') {
    
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].final_wei) * this.rates['mjdmagoldrate_22ct'];
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);

    }
    }
    mcperCharge(mcper,i) {

      if (mcper != '' && this.purchaseitem[i].making_charge != '') {
  
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].making_charge) + parseFloat(this.purchaseitem[i].mcper) + this.purchaseitem[i].final_wei * this.rates['mjdmasilverrate_1gm'];
      this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
      }
      else if (this.purchaseitem[i].mcper != '' && this.purchaseitem[i].making_charge == '') {
  
        this.purchaseitem[i].purchase_total =  parseFloat(this.purchaseitem[i].mcper) + this.purchaseitem[i].final_wei * this.rates['mjdmasilverrate_1gm'];
        this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
        }
        else if (this.purchaseitem[i].mcper == '' && this.purchaseitem[i].making_charge != '') {
  
          this.purchaseitem[i].purchase_total =  parseFloat(this.purchaseitem[i].making_charge) + this.purchaseitem[i].final_wei * this.rates['mjdmasilverrate_1gm'];
          this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
          }
        else if (this.purchaseitem[i].mcper == '' && this.purchaseitem[i].making_charge == '') {
      
        this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].final_wei) * this.rates['mjdmasilverrate_1gm'];
        this.purchaseitem[i].purchase_total = parseFloat(this.purchaseitem[i].purchase_total).toFixed(2);
  
      }
      }



  currentData: any = [];
  send() {

    if(this.edit == false && JSON.parse(localStorage.getItem('pDetails')) == null){
    localStorage.setItem('pDetails', JSON.stringify(this.purchaseitem));
    this.navCtrl.pop();
    }
    else{

      if(this.edit == true && JSON.parse(localStorage.getItem('pDetails')) != null){

      let temp :any[] = JSON.parse(localStorage.getItem('pDetails'));

      temp[this.idx] = this.purchaseitem[0];

      localStorage.setItem('pDetails', JSON.stringify(temp));
      this.navCtrl.pop();
      }
      else{
        let temp :any[] = JSON.parse(localStorage.getItem('pDetails'));
       var arr3 = [...this.purchaseitem,...temp];

       localStorage.setItem('pDetails', JSON.stringify(arr3));

            this.navCtrl.pop();

      }
      }
   

    }
    goto(){
      this.navCtrl.push(SellitemPage)
    }
    check(){

      for (let i = 0; i < this.purchaseitem.length; i++) {
      
        if((this.purchaseitem[i]['purchase_weight'] != '' &&  (this.purchaseitem[i].purchase_category != '3' ?  this.purchaseitem[i]['purchase_wastage'] != '' : true ))){
  
          this.show = 'noerr';
    
        }
        else{
          this.show = 'err';
          break;
        }
      }
      if(this.show != 'err'){

        this.send();
      }
      else{
        let toast = this.toast.create({
          message: 'Please Enter Valid details',
          duration: 3000
        });
        toast.present();
      }
    }


}
