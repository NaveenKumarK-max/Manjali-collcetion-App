import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicPage, NavController, NavParams, LoadingController, Events, AlertController, ToastController, ModalController } from 'ionic-angular';
import { providers } from '../../app/app.module';
import { CommonProvider } from '../../providers/common';
import { CallpopupmodalPage } from '../callpopupmodal/callpopupmodal';
import { EnquiryFormPage } from '../enquiry-form/enquiry-form';
import { WalletmodalPage } from '../walletmodal/walletmodal';

/**
 * Generated class for the ProductdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
  providers: [CommonProvider]
})
export class ProductdetailPage {
  // productitems = this.navParams.get('data');
  productId = this.navParams.get('productId');

  productdetail: any = {};
  details: any = '';
  touchtocalldetails: any;
  companyName: any = '';
  productdata: any;


  constructor(public modal: ModalController, public toast: ToastController, public socialSharing: SocialSharing, private alertCtrl: AlertController, private events: Events, public navCtrl: NavController, public navParams: NavParams, public load: LoadingController, public comman: CommonProvider) {
    // console.log(this.productitems);
    //alert();
    this.companyName = JSON.parse(localStorage.getItem('company'));
    console.log(this.companyName);

    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
    console.log('productID' + this.navParams.get('productId'));

    var id_product = { 'id_product': this.productId }

    this.comman.productDetail(id_product).then(data => {
      if (data) {

        this.productdetail = data;
        console.log(this.productdetail);
      }

      else {
        console.log('elseeee');
      }
    //  loader.dismiss();
    })

    this.comman.company().then(data => {

      this.details = data;
      console.log(this.details);
     // loader.dismiss();

    })

    loader.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailPage');
  }
  ionViewWillEnter() {
    console.log("ionViewWillEnter");

    let user = false;
    this.events.publish('user:created', user);

  }


  call() {
    /*     let calldetails = '<ion-grid>';
        calldetails += '<a href="tel:+91{{details.mobile }} " style="text-decoration:none !important;"><ion-row><ion-col style="text-decoration:none !important;"  [innerHTML]="' + this.details['mobile'] + '  | safeHtml">' + this.details['mobile'] + '</ion-col></ion-row></a> , <a href="tel:+91""><ion-row><ion-col [innerHTML]="' + this.details['mobile'] + '  | safeHtml">' + this.details['mobile'] + '</ion-col></ion-row></a>';
        calldetails += '</ion-grid>';
        const alert = this.alertCtrl.create({
          title: 'Call now',
          subTitle: calldetails,
          buttons: ['Cancel']
        });
        alert.present(); */
    //  this.navCtrl.push(CallpopupmodalPage);
    // this.navCtrl.push(WalletmodalPage);
    let mod = this.modal.create(CallpopupmodalPage, { 'data': this.details });
    mod.present();
  }


  enquiry(product_name) {
    console.log(product_name);
    console.log(this.productdetail);
    this.navCtrl.push(EnquiryFormPage, { 'product_name': product_name, 'data': this.productdetail })

  }

  presentConfirm(product_name, code) {
    console.log(product_name, code);
    this.productdata = 'Product :'+product_name + '-' + code;
    console.log(this.productdata);
    let alert = this.alertCtrl.create({
      title: 'WhatsApp',
      subTitle: 'Chat with via ' + this.companyName + ' Whatsapp',
      message: `${this.details['call_prefix']}${this.details['whatsapp_no']}`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Buy clicked');
            this.socialSharing.shareViaWhatsAppToReceiver(this.details['call_prefix'] + '' + this.details['whatsapp_no'], this.productdata, null /* img */, null /* url */).then(() => {

              //   this.socialSharing.shareViaWhatsApp(this.details['whatsapp_no'], '', '').then((data) => {
              //  console.log(data);

              // Success!
            }).catch((err) => {
              console.log(err);

              // Error!
              //   alert("Sorry! Sharing via WhatsApp is not possible");
              let toast = this.toast.create({
                message: "Sorry! Sharing via WhatsApp is not possible",
                position: 'bottom',
                duration: 6000
              });
              toast.present();
            });

          }
        }
      ]
    });
    alert.present();
  }



  // whatsapp(){

  //   var whatsappno =  this.details['call_prefix'] + this.details['whatsapp_no'];

  //   console.log(this.details['whatsapp_no']);
  //   console.log(whatsappno);

  //     this.socialSharing.shareViaWhatsAppToReceiver(whatsappno,'Hi,',null /* img */,null /* url */).then(() => {
  //         // Success!
  //       }).catch((e) => {
  //         alert("Sorry! Sharing via WhatsApp is not possible");
  //       });

  // }



}
