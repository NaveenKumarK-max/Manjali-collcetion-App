import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { JoinschemePage } from '../joinscheme/joinscheme';
import { PayduesPage } from '../paydues/paydues';
import { TcPage } from '../tc/tc';
import { MyschemePage } from '../myscheme/myscheme';


@Component({
  selector: 'page-schemedetail',
  templateUrl: 'schemedetail.html',
  providers: [CommonProvider]

})
export class SchemedetailPage {

  // details: any = '';
  // currency: any = '';
  // count: any[] = [];
  // id_branch: any = null;
  // gifts: any[] =[];
  // prices: any[] =[];
  // giftmsg:any;
  // pricemsg:any;

  details:any[] = [];
  currency:any = '';
  count:any[] = [];
  id_branch:any='';
  toggle: any = true;
  schAcData:any[] = [];

  myschemedata : any = this.navParams.get('myschemeData');

  constructor(public load: LoadingController, public comman: CommonProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.schAcData = this.navParams.get('data');
    console.log(this.schAcData)
    console.log(this.myschemedata)
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();


    this.comman.getcurrency(this.id_branch).then(data => {

      this.currency = data;
      console.log(this.currency.currency.currency_symbol)
      this.comman.schemedetail(this.navParams.get('data')['id_scheme_account']).then(data => {

        // this.details = data;
        // console.log(this.details);
        // console.log(this.details['chit'].has_gift);
        // console.log(this.details['chit'].scheme_type);
        // this.gifts = data['gifts']['data'];
        // this.prices = data['prizes']['data'];
        // this.giftmsg = data['gifts'];
        // this.pricemsg = data['prizes'];
        // console.log(this.giftmsg)
        // console.log(this.pricemsg)

        // console.log(this.gifts)
        // console.log(this.prices)

        this.details = data;
        console.log(this.details['payments'])
        for (let index = 0; index < this.details['payments'].length; index++) {
          this.details['payments'][index]['toggle'] = false;
        }
        console.log(this.details['chit'].scheme_type);

      })
      //  loader.dismiss();
    })

    loader.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchemedetailPage');
  }
  paydue() {

    this.navCtrl.push(PayduesPage)
  }
  termscond() {

    this.navCtrl.push(TcPage);
  }
  goBack($event) {
    console.log('true');
    // this.navCtrl.setRoot(MyschemePage);
    this.navCtrl.setRoot(MyschemePage,{'data':this.myschemedata,'page':'schemeDetail'});
  }
  tog(id_payment , i) {
    console.log(id_payment , i);
  //  this.toggle = i;

  this.details['payments'].forEach((value, key) => {
    if(key ==  i && this.details['payments'][key]['toggle'] == false){
      this.details['payments'][key]['toggle'] = true;
    }
    else{
      this.details['payments'][key]['toggle'] = false;

    }
  });

  console.log(this.details)


/*     if (this.toggle == true) {
      this.toggle = false;
    }
    else {
      this.toggle = true;
    } */
  }
  calc(payable,discountval){
    console.log(payable)
    console.log(discountval)
    return parseInt(payable)- parseInt(discountval);

  }
  goToPay(){
		this.navCtrl.setRoot(PayduesPage);
	}

}
