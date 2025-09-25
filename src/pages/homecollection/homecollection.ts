import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Events } from 'ionic-angular';
import { providers } from '../../app/app.module';
import { CommonProvider } from '../../providers/common';
import { CollectionsPage } from '../collections/collections';

/**
 * Generated class for the HomecollectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-homecollection',
  templateUrl: 'homecollection.html',
  providers: [CommonProvider]
})
export class HomecollectionPage {
  productItems:any[]=[];
 

  constructor(private events: Events,public navCtrl: NavController, public navParams: NavParams,public comman: CommonProvider,public load: LoadingController) {
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.viewall_parentcategory().then(data => {

      this.productItems = data;
      console.log(this.productItems);
    })
    loader.dismiss();

  }
  
  openSubCategory(id_category){
    console.log(id_category);
    console.log(this.productItems);
    this.navCtrl.push(CollectionsPage,{'sub_category':id_category,'data':this.productItems})

  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter");

    let user = false;
    this.events.publish('user:created', user);

	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomecollectionPage');
  }

}
