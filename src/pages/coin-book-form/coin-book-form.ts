import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { CoinBookListPage } from '../coin-book-list/coin-book-list';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
/**
 * Generated class for the CoinBookFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-coin-book-form',
  templateUrl: 'coin-book-form.html',
  providers: [CommonProvider]
})
export class CoinBookFormPage {

  details: any = '';
  temp: any = { "type": "7", "message": "", "email": "", "mobile": '', "name": "", "product_name": "Coin", "gram": "", "coin_type": "", "qty": "" }
  coins: any[];
  public myIndex: number = 0;
  key: any[];
  status: any;


  constructor(public load: LoadingController, public toast: ToastController, private commonService: CommonProvider, private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private events: Events) {

    this.details = JSON.parse(localStorage.getItem('sssuser'));
    this.status = JSON.parse(localStorage.getItem('logstatus'));
    console.log(this.status);
    if (this.status == true) {
      this.temp['mobile'] = this.details['mobile']
      this.temp['email'] = this.details['customer']['email']
      this.temp['name'] = this.details['customer']['firstname'] + ' ' + this.details['customer']['lastname'];
    } else {
    /*  this.details['mobile'] = ''
      this.details['customer']['email'] = ''
      this.temp['name'] = '' */

      this.details != null ? this.details['mobile'] : ''
      this.details != null ? this.details['customer']['email'] : ''
      this.details != null ? this.temp['name'] : ''
    }
    console.log(JSON.parse(localStorage.getItem('sssuser')));

    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.commonService.getEnqProductGrms().then(data => {
      this.coins = Object.keys(data);
      this.key = Object.keys(data);
      var val = Object.keys(data);
      console.log(this.key);
      console.log(val);
      console.log(this.coins);
      loader.dismiss();
    })
  }

  onSelectChange(selectedValue: any) {
    let index = this.myIndex;
    console.log(this.myIndex)
    console.log(this.key[index]);
    this.temp['gram'] = this.key[index];
    console.log(this.temp['gram']);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
    let user = true;
    this.events.publish('user:created', user);
  }
  ionViewWillEnter() {
    let user = false;
    this.events.publish('user:created', user);
  }

/*   goBack($event) {
    console.log('true');
    this.navCtrl.setRoot(HomePage);
  } */

  viewenquiry() {
    if (this.status == true) {
        this.navCtrl.push(CoinBookListPage)
    } else {
        this.navCtrl.setRoot(LoginPage)
    }
}
  send() {
    console.log(this.temp);
    console.log(this.temp['gram']);

    if ( this.temp['mobile'] != '' && this.temp['name'] !='' && this.temp['gram'] !='' && this.temp['coin_type'] !='' && this.temp['qty'] !='' ) {

      let loader = this.loadingCtrl.create({
        content: 'Please Wait',
        spinner: 'dots',
      });
      loader.present();

/*       delete this.temp['firstname'];
      delete this.temp['lastname']; */
      console.log(this.temp);

      this.commonService.feedback(this.temp).then(data => {

        if (data['status']) {

          loader.dismiss();
          let toast = this.toast.create({
            message: data['msg'],
            position: 'bottom',

            duration: 6000
          });
          toast.present();
          this.navCtrl.setRoot(HomePage)

        }
        else {

          loader.dismiss();
          let toast = this.toast.create({
            message: data['msg'],
            position: 'bottom',

            duration: 6000
          });
          toast.present();
        }
      })
    }
    else {
      let toast = this.toast.create({
        message: " * Fields Are Mandatory",
        position: 'bottom',

        duration: 6000
      });
      toast.present();
    }

  }
}
