import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events ,ToastController,Content} from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { EsticalculatorPage } from '../esticalculator/esticalculator';
import { PurchaseitemPage } from '../purchaseitem/purchaseitem';

/**
 * Generated class for the sellitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sellitem',
  templateUrl: 'sellitem.html',
  providers: [CommonProvider]
})
export class SellitemPage {
  @ViewChild(Content) content: Content;

  purchase_category: any=1 ;
  sell_weight: any;
  sell_wastage: any;
  making_charge: any;
  stone_charge: any;
  purchase_total = 0;
  rates: any = '';
  currency: any = { 'currency': { 'currency_symbol': '' } };
  id_branch: any = null;
  sellitem:any[]=[{ 'sell_total': '', 'sell_category': '1', 'sell_weight': '', 'sell_wastage': '0', 'sell_purerate': ''}];
  idx:any = '';
  whole:any[]= [];
  edit:any = false;
  show = 'err';


  constructor(public toast:ToastController, public events: Events, public navCtrl: NavController, public navParams: NavParams, public load: LoadingController, public comman: CommonProvider) {
   console.log(this.navParams.get('sellitem'));
   console.log(JSON.parse(localStorage.getItem('sel')))
    if(this.navParams.get('sellitem') !=undefined ){
      this.sellitem = [JSON.parse(localStorage.getItem('sel'))];
      this.idx = this.navParams.get('idx');
      this.whole = this.navParams.get('full');
      this.edit = this.navParams.get('edit');

      console.log(this.sellitem);
      console.log(this.idx);
      console.log(this.edit);


    }
    console.log(this.sellitem);

    console.log(JSON.parse(localStorage.getItem('sDetails')))
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
    this.sellitem.push({ 'sell_total': '', 'sell_category': '1', 'sell_weight': '', 'sell_wastage': '0', 'sell_purerate': ''});

    var y:any = Object.assign({}, this.sellitem);
     console.log(y);

    this.sellitem.reverse();
    console.log(this.sellitem);
    this.content.scrollToTop();
  }
  remove(i){

    this.sellitem.splice(i,1);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad sellitemPage');
  }
  PurchaseCate(purchase_category,i) {
    
    this.FinalWei('',i);

  }
  PurchaseWei(sell_weight,i) {
    console.log(sell_weight);
    this.sellitem[i].sell_weight = sell_weight;
    console.log(this.sell_weight)
    this.FinalWei(sell_weight,i);
  }
  PurchaseWast(sell_wastage,i) {
    console.log(sell_wastage);
    this.sellitem[i].sell_wastage = sell_wastage;
    console.log(this.sell_wastage)
    this.FinalWei(sell_wastage,i);
  }
  FinalWei(sell_weight,i) {

    this.sellitem[i].sell_total = this.sellitem[i].sell_weight * this.sellitem[i].sell_purerate * this.sellitem[i].sell_wastage / 100
    this.sellitem[i].sell_total = parseFloat(this.sellitem[i].sell_total).toFixed(2);
   
  }
  goto(){
    this.navCtrl.push(PurchaseitemPage);
  }



  pure(stone_charge,i) {

    this.sellitem[i].sell_total = this.sellitem[i].sell_weight * this.sellitem[i].sell_purerate * this.sellitem[i].sell_wastage / 100
    this.sellitem[i].sell_total = parseFloat(this.sellitem[i].sell_total).toFixed(2);
    }

    check(){
      console.log(this.sellitem)
      for (let i = 0; i < this.sellitem.length; i++) {
      
        if((this.sellitem[i]['sell_weight'] != '' && this.sellitem[i]['sell_wastage'] != '' &&this.sellitem[i]['sell_purerate'] != '')){
  
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

  send() {

    if(this.edit == false && JSON.parse(localStorage.getItem('sDetails')) == null){
    localStorage.setItem('sDetails', JSON.stringify(this.sellitem));

    this.navCtrl.pop();
    }
    else{

      if(this.edit == true && JSON.parse(localStorage.getItem('sDetails')) != null){

      let temp :any[] = JSON.parse(localStorage.getItem('sDetails'));

      temp[this.idx] = this.sellitem[0];

      localStorage.setItem('sDetails', JSON.stringify(temp));

      this.navCtrl.pop();
      }
      else{
        let temp :any[] = JSON.parse(localStorage.getItem('sDetails'));
       var arr3 = [...this.sellitem,...temp];

       console.log(arr3)
       localStorage.setItem('sDetails', JSON.stringify(arr3));

            this.navCtrl.pop();

      }
      }
   

    }


}
