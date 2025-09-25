import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { OfferdetailPage } from '../offerdetail/offerdetail';
import { TcPage } from '../tc/tc';

/**
 * Generated class for the OfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
  providers: [CommonProvider]

})
export class OfferPage {

  banner:any[] = [];
  currency: any = { 'currency': { 'reg_existing': 0 } };
  id_branch:any=null;
  rates: any = '';
  showSpinner: any = true;
  status: any;

  constructor(public load:LoadingController,public comman:CommonProvider,public navCtrl: NavController, public navParams: NavParams, private commonService: CommonProvider) {
console.log('offer branch :'+this.id_branch)
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.status = JSON.parse(localStorage.getItem('logstatus'));
    console.log("Status" + this.status);
    let remember = JSON.parse(localStorage.getItem('remember'));
    console.log(JSON.parse(localStorage.getItem('remember')))
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));

    if(this.status == true && remember == true && JSON.parse(localStorage.getItem('sssuser')) != null ){
    this.comman.getbanner(currentUser['customer']['id_branch']).then(data=>{

      this.banner = data['offers'];
      console.log(this.banner);
      loader.dismiss();
      
    })
  }else{
    this.comman.getbanner(this.id_branch).then(data=>{

      this.banner = data['offers'];
      console.log(this.banner);
      loader.dismiss();
      
  })
  }
    this.commonService.getcurrency(this.id_branch).then(data => {

        this.currency = data;
        this.rates = data['metal_rates']
        this.showSpinner = false;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
  }
  detail(i){

    this.navCtrl.push(OfferdetailPage,{'data':i})

  }
  termcondi($event){
    this.navCtrl.push(TcPage)
  }

}
