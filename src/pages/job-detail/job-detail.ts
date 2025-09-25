import { Component, trigger, state, style, transition, animate, keyframes, ElementRef } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { MyOrdersPage } from '../../pages/my-orders/my-orders';
import { CommonProvider } from '../../providers/common';
import { DisplayWhen } from 'ionic-angular/components/show-hide-when/display-when';
/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component( {
    selector: 'page-job-detail',
    templateUrl: 'job-detail.html',
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
        ] )
    ]
} )
export class JobDetailPage {
    proid: any;
    productdet: any = [];
    productdet1: any = [];

    reference:any=[];
	disablebtn = false;
    relationship:any = 'cat';

    constructor( public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private commonService: CommonProvider, public alertCtrl: AlertController, public toastCtrl: ToastController, private event: Events ) {
        this.productdet = navParams.get( 'jobdetails' );
                this.productdet1 = navParams.get( 'pay' );

        console.log( navParams.get( 'jobdetails' ) );
    }
    changeImage( image ) {
        this.productdet.image = image;
    }
   
}
