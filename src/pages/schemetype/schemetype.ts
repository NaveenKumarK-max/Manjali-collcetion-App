import { GoldratemodelPage } from './../goldratemodel/goldratemodel';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, ToastController,ModalController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { JoinschemePage } from '../joinscheme/joinscheme';
import { PayduesPage } from '../paydues/paydues';

/**
 * Generated class for the SchemetypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-schemetype',
  templateUrl: 'schemetype.html',
  providers: [CommonProvider]

})
export class SchemetypePage {

  types: any[] = [];

  count: any[] = [];
  id_branch: any = null;
  currency: any = { 'currency': { 'enable_dth ': 0 } };
  temp: any = { "mobile": "" }
  cusdata: any = this.navParams.get('cusData');
  activeschemes: any = this.navParams.get('ActiveSchemes');

  checknet = localStorage.getItem('checknetwork');
  customerData = this.navParams.get('customerData')
  pageType = this.navParams.get('pageType')

  constructor(public modal:ModalController,public toast: ToastController, public events: Events, public load: LoadingController, public comman: CommonProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.activeschemes);
    console.log(this.customerData)
    this.events.subscribe('checknetwork', (data) => {
      this.checknet = data;
      console.log(11111111111111111, data)
    });

    if (this.checknet == 'online') {
      //online
      this.comman.getcurrency(this.id_branch).then(data => {
        this.currency = data;
        console.log('else', this.currency)

      })

      if(this.pageType == 'myscheme'){
        let loader = this.load.create({
          //  content: 'Please Wait',
            spinner: 'crescent',
          });
          loader.present();

          var currentUser = JSON.parse(localStorage.getItem('sssuser'));
          console.log(currentUser)
          console.log(this.navParams.get('customerData'))

          var postdata = {
            'cusmobile': this.customerData['customer']['mobile'],
            'emp_branch': currentUser['employee']['id_branch'],
            'branch_settings': this.currency['currency']['branch_settings']
          }

          console.log(postdata);
          localStorage.setItem('postdata', JSON.stringify(postdata));
          this.comman.getCusByMobile(postdata).then(data => {
            console.log(data);
            if (data['status']) {
              loader.dismiss();
              let toast = this.toast.create({
                message: data['msg'],
                position: 'bottom',
                duration: 6000
              });
              toast.present();
              this.cusdata = data['cus']
              console.log(this.cusdata);
              localStorage.setItem('customerData', JSON.stringify(this.cusdata));
              this.comman.gettypescheme(this.cusdata).then(data => {
                console.log(data)
                this.types = data['clasification'];
                console.log(this.types);
              })
            }
            else {
              loader.dismiss();
              let toast = this.toast.create({
                message: "Customer not found",
                position: 'bottom',
                duration: 6000
              });
              toast.present();
              this.types = [];
            }
          })


      }else{

      }


    } else {

      // offline Data


    }



  }


  send() {
    console.log('cus : ', this.cusdata);
    console.log('send : ', this.activeschemes);

    if (this.checknet == 'offline') {
      if (this.temp['mobile'] != '') {
        /*     let loader = this.load.create({
              content: 'Please Wait',
              spinner: 'dots',
            });
            loader.present(); */
        console.log(this.activeschemes)
        var tempchkmob = this.cusdata.filter(item => item['mobile'] == (this.temp['mobile']));
        console.log('tempchkmob :', tempchkmob);
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        console.log(currentUser)

        var postdata = {
          'cusmobile': this.temp['mobile'],
          'emp_branch': currentUser['employee']['id_branch'],
          'branch_settings': this.currency['currency']['branch_settings']
        }

        console.log(postdata);

        if (tempchkmob.length != 0) {
          this.navCtrl.push(JoinschemePage, { 'ActiveSchemes': this.activeschemes, 'cusData': tempchkmob[0] })
        } else {
          let toast = this.toast.create({
            message: "customer not found..",
            position: 'bottom',
            duration: 4000
          });
          toast.present();
        }
        //  loader.dismiss();
      }
      else {
        let toast = this.toast.create({
          message: " * Fields Are Mandatory",
          position: 'bottom',

          duration: 6000
        });
        toast.present();
      }

    } else {
      //   online Data

      if (this.temp['mobile'] != '') {
        let loader = this.load.create({
        //  content: 'Please Wait',
          spinner: 'crescent',
        });
        loader.present();

        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        console.log(currentUser)

        var postdata = {
          'cusmobile': this.temp['mobile'],
          'emp_branch': currentUser['employee']['id_branch'],
          'branch_settings': this.currency['currency']['branch_settings']
        }

        console.log(postdata);
        localStorage.setItem('postdata', JSON.stringify(postdata));
        this.comman.getCusByMobile(postdata).then(data => {
          console.log(data);
          if (data['status']) {
            loader.dismiss();
            let toast = this.toast.create({
              message: data['msg'],
              position: 'bottom',
              duration: 6000
            });
            toast.present();
            this.cusdata = data['cus']
            console.log(this.cusdata);
            localStorage.setItem('customerData', JSON.stringify(this.cusdata));
            this.comman.gettypescheme(this.cusdata).then(data => {
              this.types = data; /* ['clasification'] */
              console.log(this.types);
            })
          }
          else {
            loader.dismiss();
            let toast = this.toast.create({
              message: "Customer not found",
              position: 'bottom',
              duration: 6000
            });
            toast.present();
            this.types = [];
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

  home(){
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchemetypePage');
  }
  gojoin(id) {
    console.log(id)
    this.navCtrl.push(JoinschemePage, { 'id': id,'customerData': JSON.parse(localStorage.getItem('customerData')) })

  }
  paydue() {

    this.navCtrl.push(PayduesPage)
  }

  /*   createUser(currency) {
      console.log('User created!')
      this.events.publish('user:created', currency);
    } */

  ionViewWillLeave() {
    this.events.publish('user:created', this.currency);
  }

  ionViewWillEnter() {
    let user = true;
    this.events.publish('user:created', user);



  }
  metal(){
    console.log('test')
    let mod = this.modal.create(GoldratemodelPage);
    mod.present();

  }

}
