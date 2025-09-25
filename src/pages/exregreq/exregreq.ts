import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,App } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { JoinschemePage } from '../joinscheme/joinscheme';
import { SchemedetailPage } from '../schemedetail/schemedetail';
import { HomePage } from '../home/home';
/**
 * Generated class for the historyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-exregreq',
  templateUrl: 'exregreq.html',
  providers: [CommonProvider]

})
export class ExregreqPage {

  history:any[] = [];
  tran:any[] = [];

  searchData:any[] = [];
  public input: string = '';
  pending:any[] = [];
  currency:any = '';
  id_branch:any=null;

  constructor(public appCtrl: App,public load:LoadingController, public comman:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
    this.comman.getcurrency(this.id_branch).then(data =>{

      this.currency = data;
    this.comman.exregreq().then(data=>{

      this.history = data;
      this.tran = data;

      this.searchData = data;
    
      console.log(this.history);
      loader.dismiss();
      
    })
  })

  
  }
  search() {

    
    
    this.history = this.searchData.filter(item => item['scheme_acc_number'].toUpperCase().includes(this.input.toUpperCase()));
  }
  goBack($event) {
    console.log('true');
    //  ctrl.present();
    //this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().setRoot(HomePage);

    //  this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad historyPage');
  }

}
