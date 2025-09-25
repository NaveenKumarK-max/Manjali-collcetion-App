import { GoldratemodelPage } from './../goldratemodel/goldratemodel';
import { CustomerProfilePage } from './../customer-profile/customer-profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events,LoadingController,ModalController } from 'ionic-angular';
import { SchemetypePage } from '../schemetype/schemetype';
import { CommonProvider } from '../../providers/common';
import { Keyboard,Searchbar } from 'ionic-angular';

/**
 * Generated class for the CustomerledgerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customerledger',
  templateUrl: 'customerledger.html',
})
export class CustomerledgerPage {
  currentUser = JSON.parse(localStorage.getItem('sssuser'));
  ledger:any[]=[];
  searchdata:any[]=[];
  public input: string = '';

  constructor(private keyboard: Keyboard,public mod:ModalController,public comman:CommonProvider,public navCtrl: NavController, public navParams: NavParams,public events: Events,private load: LoadingController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerledgerPage');
  }
  newscheme(){
    this.navCtrl.push(SchemetypePage);
  }
  ionViewWillEnter() {
    let user = true;
    this.events.publish('user:created', user);

    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
    console.log(this.currentUser);
    let postdata ={
        "id_employee": this.currentUser['employee']['id_employee'],
        "agent_code": this.currentUser['employee']['agent_code'],
        "id_branch ": this.currentUser['employee']['id_branch'],
        "firstname": this.currentUser['employee']['firstname'],
        "lastname": this.currentUser['employee']['lastname'],
        "email": this.currentUser['employee']['email'],
        "mobile": this.currentUser['employee']['mobile'],
        "login_type":this.currentUser['employee']['login_type'],
    }

    this.comman.customer_ledger(postdata).then(data=>{

      this.ledger = data['data'];
      this.searchdata = data['data'];
      console.log(this.ledger);
      loader.dismiss();
    })

  }
  cusprofile(data,index){
    this.navCtrl.push(CustomerProfilePage,{'data':data});
  }

  metal(){
    console.log('test')
    let mod = this.mod.create(GoldratemodelPage);
    mod.present();

  }
  search() {
    console.log(this.ledger)
     this.searchdata =this.ledger.filter(item => item['firstname'].toUpperCase().includes(this.input.toUpperCase())||  item['mobile'].toUpperCase().includes(this.input.toUpperCase()))
    // let b =this.ledger.filter(item => item['firstname'].includes(this.input))
    // this.searchdata.push(c)
    // this.searchdata.push(b)
    console.log(this.searchdata)

  }
  removeFocus() {
    this.keyboard.close();
  };

}
