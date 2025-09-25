import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the InvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html',
  providers: [CommonProvider]

})
export class InvitePage {

  companyName = JSON.parse(localStorage.getItem( 'company'))
  message: any = '';
  allow: any = '';
  id_branch: any = null;
  currentUser = JSON.parse(localStorage.getItem('sssuser'));
  status = JSON.parse(localStorage.getItem('logstatus'));
  details: any = '';

  constructor(public socialSharing: SocialSharing, public load: LoadingController, public comman: CommonProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log("Status" + this.status);
    if (this.status == false || this.status == null) {

    }
    else {
      let loader = this.load.create({
        content: 'Please Wait',
        spinner: 'dots',
      });
      loader.present();

      this.comman.getcurrency(this.id_branch).then(data => {

        this.allow = data;
        console.log(data)
        this.comman.referal(this.allow['currency']['allow_referral']).then(data => {

          this.message = data['message'];
          console.log(data)
      //    loader.dismiss();

        })
        this.comman.company().then(data => {

          this.details = data;
          console.log(this.details);
   //       loader.dismiss();

        })

      })
      loader.dismiss();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitePage');
  }
  whatsapp() {
    this.socialSharing.shareViaWhatsApp(this.message, '', '').then((data) => {
      console.log(data);

      // Success!
    }).catch((err) => {
      console.log(err);

      // Error!
      alert("Sorry! Sharing via WhatsApp is not possible");
    });
  }
  facebook() {
    this.socialSharing.shareViaFacebook(this.message, '', '').then((data) => {
      console.log(data);

      // Success!
    }).catch((err) => {
      console.log(err);

      // Error!
      alert("Sorry! Sharing via Facebook is not possible");
    });
  }
  twitter() {
    this.socialSharing.shareViaTwitter(this.message, '', '').then((data) => {
      console.log(data);

      // Success!
    }).catch((err) => {
      console.log(err);

      // Error!
      alert("Sorry! Sharing via Twitter is not possible");
    });
  }
  email() {
    var subject = 'Reg:' + this.companyName + ',' + 'Invite Referrals';
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
  messagee() {
    this.socialSharing.shareViaSMS(this.message, "").then(() => {
      // Success!
    }).catch(() => {
      alert("Sorry! Sharing via SMS is not possible");
    });
  }


}
