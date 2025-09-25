import { Component,Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events,Keyboard,  ViewController,ToastController ,LoadingController} from 'ionic-angular';

/**
 * Generated class for the CustomPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-countrymodel',
  templateUrl: 'countrymodel.html',
})
export class CountrymodelPage {


  details:any[] = [];
  
  searchData:any[] = [];
  public input: string = '';
  name:any = ''

  constructor(public keyboard:Keyboard,public event:Events,public navCtrl: NavController,public renderer: Renderer,public viewCtrl: ViewController, public navParams: NavParams) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'countrymodel', true);

  
    this.name = this.navParams.get('name');
    this.details = this.navParams.get('data');

    console.log(this.name);
    console.log(this.details)

    this.searchData = this.navParams.get('data');
    console.log(this.searchData)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomPopupPage');
  }
  closee(temp){

   
    this.viewCtrl.dismiss(temp,this.name);
  }
  close(temp){

  
    this.viewCtrl.dismiss();
  }
  search() {

    if (!this.input.trim().length || !this.keyboard.isOpen()) {
      console.log('11111111')
      this.details = this.navParams.get('data');
      return;
    }
    
    this.details = this.searchData.filter(item => item['name'].toUpperCase().includes(this.input.toUpperCase()));
  }
}
