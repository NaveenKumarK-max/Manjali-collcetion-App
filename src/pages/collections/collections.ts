import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Events } from 'ionic-angular';
import { providers } from '../../app/app.module';
import { CommonProvider } from '../../providers/common';
import { ProductdetailPage } from '../productdetail/productdetail';

/**
 * Generated class for the CollectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-collections',
  templateUrl: 'collections.html',
  providers: [CommonProvider]
})
export class CollectionsPage {

  productitems = this.navParams.get('data');
  id_category = this.navParams.get('sub_category');
  subparentcat: any;
  products: any[] = [];
  sub_category: any[] = [];
  errormsg:any;

  constructor(private events: Events,public navCtrl: NavController, public navParams: NavParams, public load: LoadingController, public comman: CommonProvider) {
    console.log(this.productitems);

    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.view_subparent_category(this.id_category).then(data => {
      if (data) {
        if (data.type == "product") {
          this.products = data.responseData;
          this.errormsg = data.msg;
          console.log(this.products);
        } else {
          this.sub_category = data.responseData;
          this.errormsg ="";
          console.log('sbbbb' + this.sub_category);
        }

      } else {

      }
    })

    loader.dismiss();

  }

  opensubCategories(id_category) {
    console.log(id_category);
    this.comman.view_subparent_category(id_category).then(data => {
      if (data) {
        this.products = [];
        this.sub_category = [];
        if (data.type == "product") {
          this.products = data.responseData;
          this.errormsg = data.msg;
          console.log(this.products);
        } else {
          console.log('else');
          this.sub_category = data.responseData;
          this.errormsg ="";
          console.log(this.sub_category);
        }

      } else {

      }
    })
  }
  viewProduct(id_product) {

    console.log(id_product);
    console.log(this.products);
    this.navCtrl.push(ProductdetailPage, { 'productId': id_product })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectionsPage');
  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter");

    let user = false;
    this.events.publish('user:created', user);

	}

}
