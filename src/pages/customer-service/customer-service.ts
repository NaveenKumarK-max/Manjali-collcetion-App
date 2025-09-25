import { Component, trigger, state, style, transition, animate, keyframes, ElementRef } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { FaqPage } from '../faq/faq';
import { FeedbackPage } from '../feedback/feedback';
import { SocialSharing } from '@ionic-native/social-sharing';

/*
  Generated class for the CustomerService page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component( {
    selector: 'page-customer-service',
    templateUrl: 'customer-service.html',
    providers: [CommonProvider]
,
    animations: [
        trigger( 'flyInTopSlow', [
            state( "0", style( {
                transform: 'translate3d(0,0,0)'
            } ) ),
            transition( '* => 0', [
                animate( '500ms ease-in', keyframes( [
                    style( { transform: 'translate3d(0,-500px,0)', offset: 0 } ),
                    style( { transform: 'translate3d(0,0,0)', offset: 1 } )
                ] ) )
            ] )
        ] )
    ]
} )
export class CustomerServicePage {

    details: any = '';
    company:any;
    company_email:any='';
    branchdetail:any;
    companyName = JSON.parse(localStorage.getItem( 'company'))
    message: any = '';
    constructor( public socialSharing:SocialSharing, public load: LoadingController,public navCtrl: NavController, private commonservice: CommonProvider ) {

        let loader = this.load.create({
            content: 'Please Wait',
            spinner: 'dots',
          });
          loader.present();
      
          this.commonservice.company().then(data=>{
      
            this.company = data;
            console.log(this.company);
            this.company_email = data['email'];
            console.log(this.company_email);
           // loader.dismiss();
            
          })    
          this.commonservice.getAllBranchDetail().then(data=>{

            this.details = data;
            console.log(this.details)
            console.log(this.branchdetail);
            //loader.dismiss();
            
          })
          loader.dismiss();
    }
    gof(){
        this.navCtrl.push(FaqPage)
    }
    gofeed(){

        this.navCtrl.push(FeedbackPage)
    }   

    email(){
        var subject = 'Reg:' + this.companyName;
        console.log(this.details['email']);
      
        this.socialSharing.canShareViaEmail().then(() => {
          this.socialSharing.shareViaEmail(this.message, subject, [this.details['email']]).then(() => {
              // Success!
            }).catch((e) => {
              alert("Sorry! Sharing via email is not possible");
            });
      }).catch(() => {
          alert("Sorry! Sharing via email is not possible");
      });
      }
      whatsapp(){

        var whatsappno =  this.details['call_prefix'] + this.details['whatsapp_no'];

        console.log(this.details['whatsapp_no']);
        console.log(whatsappno);
       
          this.socialSharing.shareViaWhatsAppToReceiver(whatsappno,'Hi,',null /* img */,null /* url */).then(() => {
              // Success!
            }).catch((e) => {
              alert("Sorry! Sharing via WhatsApp is not possible");
            });
      }


/*       viewmap($event) {

		let submiturl = "https://maps.google.com/maps?q=13.345587730407715%2C77.099853515625&z=17&hl=en";
		var locationWindow = window.open(submiturl, '_blank', 'location=no, clearsessioncache=yes' + "&nocache=");

  } */
  viewmap(map_url){
    console.log(map_url);
    let submiturl = map_url;
    var locationWindow = window.open(submiturl);

  }
     
}
