import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController,Events } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { HomePage } from '../home/home';

/**
 * Generated class for the EnquiryFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-enquiry-form',
  templateUrl: 'enquiry-form.html',
  providers: [CommonProvider]
})
export class EnquiryFormPage {
  details: any = '';
  product_name = this.navParams.get('product_name');
  productdetail = this.navParams.get('data');
  temp: any = { "productcode":"","productname":"", "message": "", "email": "", "mobile": '', "firstname": "", "lastname": ""}

  constructor(public toast: ToastController,public navCtrl: NavController,public load: LoadingController, public navParams: NavParams,public comman: CommonProvider,private events: Events) {
    this.details = JSON.parse(localStorage.getItem('sssuser'));
    console.log(this.product_name);
    console.log(this.productdetail);
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    if (this.details != null) {
      this.temp['productcode']= this.productdetail['id_product'];
      this.temp['productname']= this.product_name;
      this.temp['mobile'] = this.details['mobile']
     // this.temp['name'] = this.details['customer']['firstname'] + ' ' + this.details['customer']['lastname'];
      this.temp['firstname'] = this.details['customer']['firstname'];
      this.temp['lastname'] = this.details['customer']['lastname'];
      this.temp['email'] = this.details['customer']['email'];
    }
    console.log(JSON.parse(localStorage.getItem('sssuser')));
    loader.dismiss();

  }

/*   ionViewDidLoad() {
    console.log('ionViewDidLoad EnquiryFormPage');
  } */
  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
    let user = true;
    this.events.publish('user:created', user);
  }

  send() {
    console.log(this.temp);
    var allow_submit = false;
    var regexp = /^[a-zA-Z ]*$/;
    var firstname = this.temp['firstname'];
    var lastname = this.temp['lastname'];
    var txt = firstname.toUpperCase();
    if (!regexp.test(txt)) {
      var ltxt = lastname.toUpperCase();
      if (!regexp.test(ltxt)) {
        let toast = this.toast.create({
          message: "Firstname and lastname must contain alphabets only",
          position: 'bottom',
          duration: 6000
        });
        toast.present();
        allow_submit = false;
      } else {
        let toast = this.toast.create({
          message: "Firstname must contain alphabets only",
          position: 'bottom',
          duration: 6000
        });
        toast.present();
        allow_submit = false;

      }
    } else {
      var txt = lastname.toUpperCase();
      if (!regexp.test(txt)) {
        let toast = this.toast.create({
          message: "Lastname must contain alphabets only",
          position: 'bottom',
          duration: 6000
        });
        toast.present();
        allow_submit = false;
      } else {
        allow_submit = true;
      }
    }

    if (allow_submit) {
      if ( this.temp['message'] != '' && this.temp['mobile'] != '' && this.temp['firstname'] != '' && this.temp['lastname'] != '' && this.temp['email'] != '' && this.temp['productname'] != '') {

        let loader = this.load.create({
          content: 'Please Wait',
          spinner: 'dots',
        });
        loader.present();

      //  delete this.temp['firstname'];
      //  delete this.temp['lastname'];

        this.comman.sendEnquiry(this.temp).then(data => {

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


}
