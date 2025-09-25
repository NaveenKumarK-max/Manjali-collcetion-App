import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController ,LoadingController} from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { HomePage } from '../home/home';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-enquiry',
  templateUrl: 'enquiry.html',
  providers: [CommonProvider]

})
export class EnquiryPage {

  details:any = '';
  temp: any = {"id_customer":"","message":"","email":"","mobile":'',"firstname":"","lastname":"","name":""}

  constructor(public toast:ToastController, private commonService: CommonProvider, private loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams) {

    this.details = JSON.parse(localStorage.getItem('sssuser')); 
    console.log(this.navParams.get('data')	)

    if(this.details != null){

      this.temp['id_customer'] = this.details['customer']['id_customer']
      this.temp['mobile'] = this.details['mobile']
      this.temp['name'] = this.details['customer']['firstname'] + ' ' + this.details['customer']['lastname']; 
      this.temp['firstname'] = this.details['customer']['firstname']; 
      this.temp['lastname'] =  this.details['customer']['lastname']; 
      this.temp['email'] =  this.details['customer']['email']; 



    }
    console.log(JSON.parse(localStorage.getItem('sssuser')));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }
  send(){

    let loader = this.loadingCtrl.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
  let postData = {
    "resource":"productcontact",
    "data": {

                "fname" : this.temp['firstname'],
                "lname" : this.temp['lastname'],
                "email" : this.temp['email'],
                "phone" : this.temp['mobile'],
                "comment" : this.temp['message'],
                "id_product" : this.navParams.get('data')['id'],
                'id_customer':this.temp['id_customer']	 		
            
    }
        }

    this.commonService.enquiry(postData).then(data=>{

      // if(data['status']){


      //   loader.dismiss();
      //   let toast = this.toast.create( {
      //     message: data['msg'],
      //         position: 'bottom',

      //     duration: 3000
      // } );
      // toast.present();
      // this.navCtrl.setRoot(HomePage)

      // }
      // else{

      //   loader.dismiss();
      //   let toast = this.toast.create( {
      //     message: data['msg'],
      //         position: 'bottom',

      //     duration: 3000
      // } );
      // toast.present();
      // }
      if(data.hasOwnProperty('contact_product')){


        loader.dismiss();
        let toast = this.toast.create( {
          message: 'Product Enquiry Submitted Successfully',
              position: 'bottom',

          duration: 3000
      } );
      toast.present();
      this.navCtrl.setRoot(HomePage)

      }
      else{

        loader.dismiss();
        let toast = this.toast.create( {
          message: 'Please try again later',
              position: 'bottom',

          duration: 3000
      } );
      toast.present();
      }
    },err=>{
      loader.dismiss();

    })
  }

}
