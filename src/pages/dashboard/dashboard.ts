




import { Component, Input, trigger, state, style, transition, animate, keyframes, ElementRef } from '@angular/core';
import { NavController, LoadingController,NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { SchemetypePage } from '../../pages/schemetype/schemetype';
import { MyschemePage } from '../../pages/myscheme/myscheme';
import { ClosedPage } from '../../pages/closed/closed';
import { PaymenthisPage } from '../../pages/paymenthis/paymenthis';
import { PayduesPage } from '../../pages/paydues/paydues';
import { WalletPage } from '../../pages/wallet/wallet';
import { OfferPage } from '../../pages/offer/offer';
import { NewarrivalsPage } from '../../pages/newarrivals/newarrivals';
import { InvitePage } from '../../pages/invite/invite';
import { RegexistschemePage } from '../regexistscheme/regexistscheme';
import { ExregreqPage } from '../exregreq/exregreq';
import { NotificationPage } from '../notification/notification';
import { HomecollectionPage } from '../homecollection/homecollection';



/*
  Generated class for the CategoryTile component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component( {
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [CommonProvider]

} )
export class DashboardPage {

    text: string;
    @Input() data: any;
    list: any;

    animateItems = [];
    animateClass: { 'zoom-in': true };
    showSpinner = true;
    off:any[] = [];
    new:any[] = [];
    dashboarddata:any = '';
    currency:any = '';
    id_branch:any=''


    constructor(public comman:CommonProvider, public navCtrl: NavController, private loadingCtrl: LoadingController , public navParams: NavParams ) {
       
        
        console.log(JSON.parse(localStorage.getItem('sssuser')))

    }

    ngAfterViewInit() {
      
        this.comman.getbanner(this.id_branch).then(data=>{
        
            this.off = data['offers'];
            console.log(data);

        
        });
        this.comman.newarrvials(this.id_branch).then(data=>{
        
            this.new = data['new_arrivals'];
            console.log(data);

        
        });
        this.comman.getcurrency(this.id_branch).then(data=>{

            this.currency = data;
        })
        this.comman.getDashboardData().then(data=>{
        
            console.log(data)
            this.dashboarddata = data;
            this.showSpinner = false;
            console.log(this.dashboarddata['customer']['firstname']);
        
        });
    }

   
	gotypesc(){
        this.navCtrl.setRoot(SchemetypePage)
    }
	
    myscheme(){

        this.navCtrl.push(MyschemePage)
    }
    close(){

        this.navCtrl.push(ClosedPage)
    }
    history(){

        this.navCtrl.push(PaymenthisPage)
    }
    due(){

        this.navCtrl.push(PayduesPage)
    }
    wallet(){

        this.navCtrl.push(WalletPage)
    }
    offer(){
        this.navCtrl.push(OfferPage)

    }
    newa(){

        this.navCtrl.push(NewarrivalsPage)

    }
    share(){
        this.navCtrl.push(InvitePage)

    }
    regex(){
        this.navCtrl.push(RegexistschemePage)

    }
    ex(){
        this.navCtrl.push(ExregreqPage)
    }
    notify(){

        this.navCtrl.push(NotificationPage)
    }
    homecollection(){

        this.navCtrl.push(HomecollectionPage)
    }
    

}
