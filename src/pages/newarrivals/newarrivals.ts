import { Component, trigger, state, style, transition, animate, keyframes, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Events,LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { NewarrivaldetailPage } from '../newarrivaldetail/newarrivaldetail';
/**
 * Generated class for the NewarrivalsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component( {
    selector: 'page-newarrivals',
    templateUrl: 'newarrivals.html',
    providers: [CommonProvider],

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
        ] ),

        trigger( 'flyAlternameSlow', [
            state( "1", style( {
                transform: 'translate3d(0,0,0)'
            } ) ),
            state( "0", style( {
                transform: 'translate3d(0,0,0)'
            } ) ),
            transition( '* => 1', [
                animate( '1000ms ease-in', keyframes( [
                    style( { transform: 'translate3d(500px,0,0', offset: 0 } ),
                    style( { transform: 'translate3d(-10px,0,0)', offset: 0.5 } ),
                    style( { transform: 'translate3d(0,0,0)', offset: 1 } )
                ] ) )
            ] ),
            transition( '* => 0', [
                animate( '1000ms ease-in', keyframes( [
                    style( { transform: 'translate3d(-1000px,0,0', offset: 0 } ),
                    style( { transform: 'translate3d(10px,0,0)', offset: 0.5 } ),
                    style( { transform: 'translate3d(0,0,0)', offset: 1 } )
                ] ) )
            ] )
        ] )
    ]
} )
export class NewarrivalsPage {
    mySearch: any = '';

    new:any[] = [];
    id_branch: any = null;
    currency: any = { 'currency': { 'currency_symbol': '' } };
    branchname: any = '';
    status: any;



    constructor(public load:LoadingController, public comman:CommonProvider, public navCtrl: NavController, public navParams: NavParams, private commProvider: CommonProvider ,private modalCtrl:ModalController, private event: Events, private loadingCtrl: LoadingController) {
      
        let loader = this.load.create({
            content: 'Please Wait',
            spinner: 'dots',
          });
          loader.present();


          this.status = JSON.parse(localStorage.getItem('logstatus'));
          console.log("Status" + this.status);
          let remember = JSON.parse(localStorage.getItem('remember'));
          console.log(JSON.parse(localStorage.getItem('remember')))
          var currentUser = JSON.parse(localStorage.getItem('sssuser'));

          if(this.status == true && remember == true && JSON.parse(localStorage.getItem('sssuser')) != null ){
            this.comman.newarrvials(currentUser['customer']['id_branch']).then(data=>{
                this.new = data['new_arrivals'];
                loader.dismiss();
                
              })
          }else{
            this.comman.newarrvials(this.id_branch).then(data=>{
                this.new = data['new_arrivals'];
                loader.dismiss();
                
              })
          }  

          this.comman.getcurrency(this.id_branch).then(data => {

            this.currency = data;
          })
	
    }
	


    ionViewDidLoad() {
        console.log( 'ionViewDidLoad NewarrivalsPage' );
    }
    searchCollection() {
        console.log( this.mySearch );
    }
    detail(i){

        this.navCtrl.push(NewarrivaldetailPage,{data:i})
    }
}
