import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the SyncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sync',
  templateUrl: 'sync.html',
  providers: [CommonProvider]
})
export class SyncPage {
  type = this.navParams.get('type');
  syncDatalen: any = 0;
  syncTime: any
  synctotal: any = 0;
  newcus: any = 0;

  localcus: any = '';
  localpay: any = '';

  constructor(public load: LoadingController, private storage: Storage, public toast: ToastController, public viewCtrl: ViewController, private menu: MenuController, public navCtrl: NavController, public navParams: NavParams, private commonService: CommonProvider,) {
    console.log(this.type)


    this.storage.get('settledPayment').then(data => {
      console.log(data)
      this.localpay = JSON.parse(data);

      this.syncDatalen = data != null ? JSON.parse(data).length : 0;
    });
    this.storage.get('total').then(data => {
      console.log(data)
      this.synctotal = data != null ? JSON.parse(data) : 0;

    });

    this.storage.get('localnewcus').then(data => {
      console.log(data)
      this.newcus = data != null ? JSON.parse(data).length : 0;
      console.log(this.newcus)
      this.localcus = JSON.parse(data);

    });
    this.storage.get('syncTime').then((val) => {
      console.log('syncTime : ', val);
      this.syncTime = JSON.parse(val);

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SyncPage');
  }
  getonline() {

    var currentUser = JSON.parse(localStorage.getItem('sssuser'));
    var postdata = {
      "id_employee": currentUser['employee']['id_employee'],
      "id_profile": currentUser['employee']['id_profile'],
      "login_type": currentUser['employee']['login_type'],
      "branch_name": currentUser['employee']['branch_name'],
      "email": currentUser['employee']['email'],
      "emp_ref_code": currentUser['employee']['emp_ref_code'],
      "id_branch": currentUser['employee']['id_branch'],
      "firstname": currentUser['employee']['firstname'],
      "lastname": currentUser['employee']['lastname'],
      "agent_code": currentUser['employee']['agent_code']
    }

    this.commonService.getOnlinedata(postdata).then(data => {
      console.log(data);
      if (data) {
        console.log(data)

        // set a key/value
        this.storage.set('onlineSetData', JSON.stringify(data));
        console.log(JSON.parse(localStorage.getItem('onlineSetData')));

        this.storage.get('onlineSetData').then((val) => {
          console.log('onlineSetData : ', val);
          this.navCtrl.setRoot(HomePage);
        });

      } else {
        let ctrl = this.toast.create({
          message: data['msg'],
          duration: 6000,
          position: 'bottom'
        });
        ctrl.present();
      }

    });

  }
  postoffline() {
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    var currentUser = JSON.parse(localStorage.getItem('sssuser'));
    var postdata = {
      "id_employee": currentUser['employee']['id_employee'],
      "id_profile": currentUser['employee']['id_profile'],
      "login_type": currentUser['employee']['login_type'],
      "branch_name": currentUser['employee']['branch_name'],
      "email": currentUser['employee']['email'],
      "emp_ref_code": currentUser['employee']['emp_ref_code'],
      "id_branch": currentUser['employee']['id_branch'],
      "firstname": currentUser['employee']['firstname'],
      "lastname": currentUser['employee']['lastname'],
      "agent_code": currentUser['employee']['agent_code']
    }
    var lcus = Object.assign({}, this.localcus, postdata);
    var lpay = Object.assign({}, this.localpay, postdata);

    if (this.newcus > 0) {
      this.commonService.postOnlinenewcusdata(lcus).then(data => {
        console.log(data);
        if (data.status) {

          let toast = this.toast.create({
            message: data.msg,
            position: 'bottom',
            duration: 3000
          });
          toast.present();

          if(this.localpay != null){

          data.customers.forEach((element,i) => {
            // if(element['status']){

              let ind =  this.localpay.findIndex(data=>data['id_customer'] == element['timestamp']);
              console.log(ind);
              if(ind > -1){
                this.localpay[ind]['id_customer'] = data.customers[i]['id_customer'];

              }
            // }
                  
          });
          this.storage.set('localnewcus', null);
          this.newcus = 0;
            
          
           lpay = Object.assign({}, this.localpay, postdata);

           this.storage.set('settledPayment',JSON.stringify(this.localpay)).then(data => {
            console.log('id_cus set :',data)
      
          });

          this.commonService.postOnlinedata(lpay).then(data => {
            console.log(data);
            if (data.status) {
              let toast = this.toast.create({
                message: data.msg,
                position: 'bottom',
                duration: 3000
              });
              toast.present();

              this.storage.get('total').then((val) => {
                console.log('syncTime : ', val);
                this.storage.set('total', JSON.stringify(this.syncDatalen + this.synctotal));
                this.storage.get('total').then(data => {
                  console.log(data);
                  this.synctotal = data != null ? JSON.parse(data) : 0;
                });
              });

              this.storage.set('settledPayment', null);
              this.storage.set('paymentHistoryData', null);
              this.storage.set('localnewcus', null);
              loader.dismiss();
              this.storage.set('syncTime', JSON.stringify(new Date().toLocaleString()));
              this.navCtrl.setRoot(HomePage);
            } else {
              loader.dismiss();
              let toast = this.toast.create({
                message: "something went wrong please try again after sometime",
                position: 'bottom',
                duration: 3000
              });
              toast.present();
            }
          
        
          }, err => {
            loader.dismiss();

          });
        }
        else{
          this.storage.set('localnewcus', null);
          this.newcus = 0;
          loader.dismiss();
          this.storage.set('syncTime', JSON.stringify(new Date().toLocaleString()));
          this.navCtrl.setRoot(HomePage);
        }
        } else {
          loader.dismiss();
          let toast = this.toast.create({
            message: "something went wrong please try again after sometime",
            position: 'bottom',
            duration: 3000
          });
          toast.present();

/*         }
 */      }

      }, err => {
        loader.dismiss();

      });
    
    }
    else {
      this.commonService.postOnlinedata(lpay).then(data => {
        console.log(data);
        if (data.status) {
          let toast = this.toast.create({
            message: data.msg,
            position: 'bottom',
            duration: 3000
          });
          toast.present();

          this.storage.get('total').then((val) => {
            console.log('syncTime : ', val);
            this.storage.set('total', JSON.stringify(this.syncDatalen + this.synctotal));

            this.storage.get('total').then(data => {
              console.log(data)
              this.synctotal = data != null ? JSON.parse(data) : 0;

            });

          });
          this.storage.set('settledPayment', null);
          this.storage.set('paymentHistoryData', null);
          this.storage.set('localnewcus', null);
          loader.dismiss();
          this.storage.set('syncTime', JSON.stringify(new Date().toLocaleString()));
          this.navCtrl.setRoot(HomePage);

        } else {
          loader.dismiss();
          let toast = this.toast.create({
            message: "something went wrong please try again after sometime",
            position: 'bottom',
            duration: 3000
          });
          toast.present();
        }

      }, err => {
        loader.dismiss();

      });
    }


  }


  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }
  close() {
    this.navCtrl.pop();
  }

}