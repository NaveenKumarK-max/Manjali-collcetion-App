import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
// import { CommonProvider } from '../../providers/common';
import { ProductsPage } from '../products/products';

/**
 * Generated class for the EcomfilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-ecomfilter',
  templateUrl: 'ecomfilter.html',
})
export class EcomfilterPage {


  showLevel1 = null;
showLevel2 = null;
pages:any[] = []
cat:any[] = []
remove:any[] = []
one = null;

  constructor(public viewctrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
 
  }

  ionViewDidLoad() {
    console.log(JSON.parse(localStorage.getItem('skjcat')))

    this.cat = JSON.parse(localStorage.getItem('skjcat')).filter(data=> data['parentid'] == 2);
    this.remove = JSON.parse(localStorage.getItem('skjcat')).filter(data=> data['parentid'] != 2)
    var st:any[] = [];

    this.cat.forEach(data=>{

      st = [];
      data['ass_categories'].forEach(element => {
        
        let temp = this.remove.filter(f=>f['parentid'] == data['id'] && f['id'] == element['id'] )
        var name = 'name'
        var value = temp[0]['name']
        element[name] = value;

        st.push({"subcategory":value,'name':value,'id':element['id'],"manufactures": this.remove.filter(f=>f['parentid']  == element['id'] )}) 

      });
      this.pages.push({"category":data['name'],'name':data['name'],"id":data['id'],"subs":st})

    })
    console.log(this.cat)
    console.log(this.pages)
    console.log(this.remove)

    console.log('ionViewDidLoad EcomfilterPage');
  }
  toggleLevel1(idx,i) {

    if(this.one == i){
      this.one = null;
    }
    else{
      this.one = i;

    }

    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };
  
  toggleLevel2(idx) {
  

    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  };
  isLevel1Shown(idx) {

    return this.showLevel1 === idx;
  };
 
  isLevel2Shown(idx) {

    return this.showLevel2 === idx;
  };

open(e){

  console.log(e);

  this.viewctrl.dismiss(e)
  // this.navCtrl.push(ProductsPage,{'data':e})

}
close(){

  this.viewctrl.dismiss();
}
}
