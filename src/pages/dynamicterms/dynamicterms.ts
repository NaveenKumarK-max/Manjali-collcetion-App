import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';

/**
 * Generated class for the DynamictermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-dynamicterms',
  templateUrl: 'dynamicterms.html',
  providers: [CommonProvider]

})
export class DynamictermsPage {

  branch:any[] = [];
  companyName = JSON.parse(localStorage.getItem( 'company'))

  constructor(public comman:CommonProvider, public navCtrl: NavController, private load: LoadingController, public navParams: NavParams) {
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    this.comman.classify().then(data=>{

      data.forEach((element,i) => {
        
        this.branch.push({'classification_name':data[i]['classification_name'],'description':data[i]['description'],'show':'false'})

      });
      console.log(this.branch);
      loader.dismiss();
      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DynamictermsPage');
  }
  tog(i){

    console.log(i)
    console.log(this.branch[i])
    if(this.branch[i]['show'] == 'false'){
      this.branch[i]['show'] = 'true';

    }
    else{
      
      this.branch[i]['show'] = 'false';

    }
    console.log(this.branch)


  }

}
