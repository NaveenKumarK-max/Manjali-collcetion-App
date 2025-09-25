import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RegexistschemePage } from '../regexistscheme/regexistscheme';
import { JoinschemePage } from '../joinscheme/joinscheme';
import { ConfirmschemePage } from '../confirmscheme/confirmscheme';
import { CommonProvider } from '../../providers/common';

/**
 * Generated class for the CheckschemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-checkscheme',
  templateUrl: 'checkscheme.html',
  providers: [CommonProvider]

})
export class CheckschemePage {

  details:any = '';
  currency:any = '';
  total:any = 0;
  wt:any[] = [];
  id_branch:any=null;
  classimage = this.navParams.get('classimage');

  constructor(public comman:CommonProvider,public load:LoadingController, public navCtrl: NavController, public navParams: NavParams) {

    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
    this.comman.getwt().then(data=>{

      this.wt = data['weights']
    })

    this.comman.getcurrency(this.id_branch).then(data=>{

      this.currency = data['currency']
      loader.dismiss();
    })

    this.details = this.navParams.get('data')
    if( this.details['scheme_type'] == 0){
      this.total = this.details['total_installments'] * this.details['amount'] 

    }
    else if( this.details['scheme_type'] == 2){
      this.total = this.details['total_installments'] * this.details['amount'] 

    }
    else if( this.details['scheme_type'] == 1){
      this.total = this.details['total_installments'] * this.details['max_weight'] 

    }
    console.log(this.details)
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckschemePage');
  }
join(){

  this.navCtrl.push(ConfirmschemePage,{data:this.navParams.get('data'),'classimage': this.classimage})
}
register(){
  console.log('exist :'+this.navParams.get('data'));

  this.navCtrl.push(RegexistschemePage ,{data:this.navParams.get('data'),'classimage': this.classimage})
}
}
