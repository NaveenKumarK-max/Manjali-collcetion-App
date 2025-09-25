import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { HomePage } from '../home/home';
import { DthdetailPage } from '../dthdetail/dthdetail';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-dth',
  templateUrl: 'dth.html',
  providers: [CommonProvider]

})
export class DthPage {

  details: any = '';
  temp: any = {
   /*  "type": 5, */
    "id_customer": "",
    "address": "",
    "message": "",
    "email": "",
    "mobile": '',
    "firstname": "",
    "lastname": "",
    "name": "",
    "pincode":"",
    "dthenq": false,
    "expenq": false,
/*     dthexpenenqu: [], */
    type:[]

  }


  constructor(public toast: ToastController, private commonService: CommonProvider, private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {

    this.details = JSON.parse(localStorage.getItem('sssuser'));

    if (this.details != null) {

      this.temp['id_customer'] = this.details['customer']['id_customer']
      this.temp['mobile'] = this.details['mobile']
      this.temp['name'] = this.details['customer']['firstname'] + ' ' + this.details['customer']['lastname'];
      this.temp['firstname'] = this.details['customer']['firstname'];
      this.temp['lastname'] = this.details['customer']['lastname'];
      this.temp['email']= this.details['customer']['email'];

    }
    console.log(JSON.parse(localStorage.getItem('sssuser')));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }
  status() {

    this.navCtrl.push(DthdetailPage)
  }
  send() {
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
    if (this.temp['address'] != '' && this.temp['message'] != '' && this.temp['mobile'] != '' && this.temp['name'] != '' && this.temp['email'] != '' && this.temp['pincode'] != '') {

      let loader = this.loadingCtrl.create({
        content: 'Please Wait',
        spinner: 'dots',
      });
      // loader.present();

      delete this.temp['firstname'];
      delete this.temp['lastname'];

          this.commonService.feedback(this.temp).then(data=>{
      
            if(data['status']){
      
      
              loader.dismiss();
              let toast = this.toast.create( {
                message: data['msg'],
                    position: 'bottom',
      
                duration: 6000
            } );
            toast.present();
            this.navCtrl.setRoot(HomePage)
      
            }
            else{
      
              loader.dismiss();
              let toast = this.toast.create( {
                message: data['msg'],
                    position: 'bottom',
      
                duration: 6000
            } );
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

  dth(){

    console.log(this.temp['dthenq']);
    if (this.temp['dthenq']) {
     
      this.temp['type'].push(5);
      console.log(this.temp['type']);
   
    }
    else {
      let index = this.temp['type'].indexOf(5);
      this.temp['type'].splice(index);
      console.log(this.temp['type']);
    }

  }
  experencectr(){
    if (this.temp['expenq']) {
     
      this.temp['type'].push(6);
      console.log(this.temp['type']);
   
    }
    else {
      let index = this.temp['type'].indexOf(6);
      this.temp['type'].splice(index);
      console.log(this.temp['type']);
    }

  }


}
