import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, Events, LoadingController, Content, NavParams, ViewController, ToastController,MenuController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { LoginPage } from '../login/login';
import { OfferPage } from '../../pages/offer/offer';
import { NewarrivalsPage } from '../../pages/newarrivals/newarrivals';
import { RegexistschemePage } from '../regexistscheme/regexistscheme';
import { MyschemePage } from '../../pages/myscheme/myscheme';
import { SchemetypePage } from '../../pages/schemetype/schemetype';
import { PayduesPage } from '../../pages/paydues/paydues';
import { InvitePage } from '../../pages/invite/invite';
import { RatehistoryPage } from '../ratehistory/ratehistory';
import { NotificationPage } from '../notification/notification';
import { IntroimgPage } from '../introimg/introimg';
import { BranchPage } from '../branch/branch';
import { TcPage } from '../tc/tc';
import { PaymenthisPage } from '../paymenthis/paymenthis';
import { ExregreqPage } from '../exregreq/exregreq';
import { ClosedPage } from '../closed/closed';
import { HomecollectionPage } from '../homecollection/homecollection';
import { WalletPage } from '../wallet/wallet';
import { ComplaintdetailPage } from '../complaintdetail/complaintdetail';
import { CompareplanPage } from '../compareplan/compareplan';
import { CallbranchmodalPage } from '../callbranchmodal/callbranchmodal';
import { RegisterPage } from '../register/register';
import { EmpreportPage } from '../empreport/empreport';
import { DatePicker } from '@ionic-native/date-picker';
/* import { AnimationService, AnimationBuilder } from 'css-animator'; */
import { Storage } from '@ionic/storage';
import { CustomerledgerPage } from '../customerledger/customerledger';
import { TodayscollectionPage } from '../todayscollection/todayscollection';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [CommonProvider]

})
export class HomePage {

    @ViewChild(Content) content: Content;
    myInput: any = '';
    rates: any = '';
    showSpinner: any = true;
    showdash: any = false;
    off: any[] = [];
    new: any[] = [];
    dashboarddata: any = '';
    status: any = JSON.parse(localStorage.getItem('logstatus'));

    branchname: any = '';
    branchid: any = '';
    id_branch: any = null;
    total_amount: any;
    allow_access: any = '';
    date: any;
    details: any = '';

    currency: any = { 'currency': { 'reg_existing': 0, 'enable_dth ': 0, 'estimation': 0, 'pledge_calculator': 0, 'allow_shareonly': 0, 'allow_referral': 0, 'rate_history': 0, 'searchbyaccno': 0 , 'is_offline': 0} };
    temp: any = { "mobile": "" }
    empName: any;
    uuid: any;
    token: any;
    loginstatus = false;
    device_type: any;

    schemes: any[] = [];
    schemeyear: any[] = [];
    selectedyear: any = '';
    schaccno: any = '';
    code: any = '';

    onlinedata: any[] = [];
    allschemeData: any[] = [];

    checknet: any = localStorage.getItem('checknetwork');
    checknet1 = localStorage.getItem('one');
    datedata:any;


    constructor( public menu: MenuController,public ref: ChangeDetectorRef, private storage: Storage, public navParams: NavParams, private datePicker: DatePicker, public toast: ToastController, public comman: CommonProvider, public view: ViewController, public params: NavParams, public navCtrl: NavController, private commonService: CommonProvider, private modalCtrl: ModalController, private events: Events, private loadingCtrl: LoadingController) {

    //     this.menu.swipeEnable(false);
		// this.menu.enable(false);
    let that = this;
        console.log('id_branch : ', this.id_branch);
        this.events.subscribe('checknetwork', (data) => {
            this.checknet = data;
            this.checknet1 = localStorage.getItem('one');
          //  this.ref.detectChanges();
            console.log(11111111111111111, data)
            console.log('22222222222222', this.checknet1)
        });

        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        this.checknet = localStorage.getItem('checknetwork');
        this.checknet1 = localStorage.getItem('one');

        console.log('1111', this.checknet);
        console.log('2222', this.checknet1);

        // console.log(currentUser['currency']['metal_rates']);
        console.log(this.checknet);
        if (this.checknet == 'offline') {
            // offline
            this.rates = currentUser['currency']['metal_rates'];
            console.log(this.rates);
        } else {

            // online Data

        }

        if(this.currency['currency']['is_offline']==1){

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

        this.storage.get('settledPayment').then(data1 => {
			this.storage.get('localnewcus').then(data2 => {
				if (data1 != null || data2 != null) {

                }else{

                    this.commonService.getOnlinedata(postdata).then(data => {
                            console.log(data);
                            if (data) {
                                console.log(data)

                                // set a key/value
                                this.storage.set('onlineSetData', JSON.stringify(data));
                                console.log(JSON.parse(localStorage.getItem('onlineSetData')));

                                this.storage.get('onlineSetData').then((val) => {
                                    console.log('onlineSetData : ', val);
                                    this.events.publish('checknetwork', 'online');
                                    localStorage.setItem('checknetwork', 'online');
                                });

                            } else {
                                // else
                            }

                        });

                }
            });
        });
      }

        // this.commonService.getOnlinedata(postdata).then(data => {
        //     console.log(data);
        //     if (data) {
        //         console.log(data)

        //         // set a key/value
        //         this.storage.set('onlineSetData', JSON.stringify(data));
        //         console.log(JSON.parse(localStorage.getItem('onlineSetData')));

        //         this.storage.get('onlineSetData').then((val) => {
        //             console.log('onlineSetData : ', val);
        //             this.events.publish('checknetwork', 'online');
        //             localStorage.setItem('checknetwork', 'online');
        //         });

        //     } else {
        //         // else
        //     }

        // });


        this.storage.get('onlineSetData').then((val) => {
            console.log('onlineSetData : ', JSON.parse(val));
            if (val != null) {

                this.onlinedata = JSON.parse(val)['customer'];
                console.log('onlineSetData 1 : ', this.onlinedata);
            }

        });


        this.storage.get('onlineSetData').then((val) => {
            console.log('onlineSetData : ', JSON.parse(val));
            if (val != null) {

                this.allschemeData = JSON.parse(val)['schemes'];
                console.log('onlineSetData 1 : ', this.allschemeData);
            }
        });


        var d = new Date()
        this.date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()
        console.log(this.date)
        console.log(this.navCtrl);
        console.log(this.view)

        this.status = JSON.parse(localStorage.getItem('logstatus'));
        console.log("Status" + this.status);
        console.log(JSON.parse(localStorage.getItem('remember')))

        console.log(JSON.parse(localStorage.getItem('sssuser')))
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));

        this.empName = JSON.parse(localStorage.getItem('sssuser'))
        console.log(this.empName)

        if (JSON.parse(localStorage.getItem('sssuser')) != null && JSON.parse(localStorage.getItem('sssuser')) != undefined && this.status == true) {
            this.comman.getcurrency(currentUser['employee']['id_branch']).then(data => {
                this.currency = data;
                console.log('if', this.currency)
            })
        } else {
            this.comman.getcurrency(this.id_branch).then(data => {
                this.currency = data;
                console.log('else', this.currency)
            })
        }

        this.selectyear();
    }

    selectyear() {

        let year_satart = 2000;
        let year_end = (new Date).getFullYear(); // current year
        let year_selected = 1992;

        let option = '';
        option = '<option>Year</option>'; // first option

        for (let i = year_satart; i <= year_end; i++) {
            this.schemeyear.push(i)
        }
        console.log(this.schemeyear);
        //  console.log("year").innerHTML = option;
    }


    ngAfterViewInit() {

        /*         this.comman.newarrvials().then(data => {
                    this.new = data['new_arrivals'];
                    console.log(data);
                }); */
        this.status = JSON.parse(localStorage.getItem('logstatus'));
        console.log("Status" + this.status);
        let remember = JSON.parse(localStorage.getItem('remember'));
        console.log(JSON.parse(localStorage.getItem('remember')))
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));

    }
    logout(){
        this.events.publish('logout', true);
    }
    ionViewWillEnter() {
        this.checknet = localStorage.getItem('checknetwork');

        console.log("ionViewWillEnter");
        console.log(this.checknet);
        console.log(this.status);

        console.log(JSON.parse(localStorage.getItem('sssuser')));

        var currentUser = JSON.parse(localStorage.getItem('sssuser'));

        if (JSON.parse(localStorage.getItem('sssuser')) != null && this.status == true) {
            this.comman.getcurrency(currentUser['employee']['id_branch']).then(data => {

                this.currency = data;
                this.branchname = data['metal_rates']['name'];
                this.rates = data['metal_rates']
                let c = this.rates['updatetime'];
                let s = c.split(" ")
                let d = s[0].split("-")
                console.log(d[1])
                let dd = d[1]
                // let car = new Date(dd).toLocaleString('en-us',{month:'short'})
                // console.log(car)
                // const options = {month: 'short'};
                console.log(new Date(dd).toLocaleDateString('en-us', {month: 'short'}));
                this.datedata = d[0]+' '+new Date(dd).toLocaleDateString('en-us', {month: 'short'})+' '+d[2]
                    // if(dd =='09' || dd =='9'){
                //     console.log('SEP')
                // }
                // console.log(f)
                console.log(s)
                console.log(d)
                this.showSpinner = false;
                this.allow_access = this.events.publish("allow_access", data['currency']);
                console.log('if' + this.allow_access)

            })
            this.comman.getallAcitiveschemes().then(data => {
                console.log(data);
                this.schemes = data['scheme'];
                console.log(this.schemes)

            })

        } else {
            this.comman.getcurrency(this.id_branch).then(data => {

                this.currency = data;
                this.branchname = data['metal_rates']['name'];
                this.rates = data['metal_rates'];
                let c = data['updatetime'];
                console.log(c)
                this.showSpinner = false;
                this.allow_access = this.events.publish("currency", data['currency']);
                console.log('else' + this.allow_access)
            })
        }

        let user = true;
        this.events.publish('user:created', user);

    }


    ionViewDidEnter() {

    }

    send() {
        console.log('send : ', this.onlinedata);
        console.log(this.temp['mobile'].length)
        if (this.temp['mobile'] != '' && this.temp['mobile'].length == 10) {

            console.log('11')
            console.log('checknet', this.checknet)
            if (this.checknet == 'offline') {
                console.log('check net false : ')
                // offline Data :
                console.log(this.onlinedata)
                var tempchkmob = this.onlinedata.filter(item => item['mobile'] == (this.temp['mobile']));
                console.log('tempchkmob :', tempchkmob);
                if (tempchkmob.length != 0 && tempchkmob[0]['payments'] != null) {
                    this.navCtrl.setRoot(PayduesPage, { 'offlineCusCurrentPay': tempchkmob })

                } else {
                    let toast = this.toast.create({
                        message: "No Records Found",
                        position: 'bottom',
                        duration: 4000
                    });
                    toast.present();
                }

            } else {

                // online Data :
                let loader = this.loadingCtrl.create({
                  //  content: 'Please Wait',
                    spinner: 'crescent',
                });
                loader.present();

                var currentUser = JSON.parse(localStorage.getItem('sssuser'));
                var postdata = {
                    'id_employee': currentUser['employee']['id_employee'],
                    'login_type': currentUser['employee']['login_type'],
                    'cusmobile': this.temp['mobile'],
                    'emp_branch': currentUser['employee']['id_branch'],
                    'branch_settings': this.currency['currency']['branch_settings'],
                    'schemecode': "",
                    'year': "",
                    'schemeaccno': ""
                }
                console.log(postdata);
                localStorage.setItem('postdata', JSON.stringify(postdata));
                this.commonService.fetchCustomerSchemes(postdata).then(data => {
                    console.log(data);
                    if (data['isValid']) {
                        loader.dismiss();
                        let toast = this.toast.create({
                            message: data['msg'],
                            position: 'bottom',
                            duration: 6000
                        });
                        toast.present();
                         this.navCtrl.setRoot(PayduesPage)
                      //  this.navCtrl.setRoot(MyschemePage ,{'data':data})
                    }
                    else {
                        loader.dismiss();
                        let toast = this.toast.create({
                            message: "Customer not found",
                            position: 'bottom',
                            duration: 6000
                        });
                        toast.present();
                        this.navCtrl.push(RegisterPage)
                    }
                })
                loader.dismiss();
            }

        }
        else {
            let toast = this.toast.create({
                message: "Please Enter Valid Mobile No.",
                position: 'bottom',
                duration: 6000
            });
            toast.present();
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Homepage');
      };


    go() {   // only working Online
        if (this.code != '') {
            if (this.selectedyear != '') {
                if (this.schaccno != '') {
                    let loader = this.loadingCtrl.create({
                       // content: 'Please Wait',
                        spinner: 'crescent',
                    });
                    loader.present();
                    var currentUser = JSON.parse(localStorage.getItem('sssuser'));
                    var postdata = {
                        'id_employee': currentUser['employee']['id_employee'],
                        'login_type': currentUser['employee']['login_type'],
                        'schemecode': this.code,
                        'year': this.selectedyear,
                        'schemeaccno': this.schaccno,
                        'emp_branch': currentUser['employee']['id_branch'],
                        'branch_settings': this.currency['currency']['branch_settings']
                    }
                    console.log(postdata);
                    localStorage.setItem('postdata', JSON.stringify(postdata));
                    this.commonService.fetchCustomerSchemes(postdata).then(data => {
                        console.log(data);
                        if (data['isValid']) {
                            //  loader.dismiss();
                            let toast = this.toast.create({
                                message: data['msg'],
                                position: 'bottom',
                                duration: 6000
                            });
                            toast.present();
                            loader.dismiss();
                            // this.navCtrl.setRoot(PayduesPage)
                        this.navCtrl.setRoot(MyschemePage ,{'data':data})
                        }
                        else {
                            //  loader.dismiss();
                            let toast = this.toast.create({
                                message: "You don't have any plans..",
                                position: 'bottom',
                                duration: 6000
                            });
                            toast.present();
                            loader.dismiss();
                        this.navCtrl.push(RegisterPage)
                        }
                    })
                } else {
                    let toast = this.toast.create({
                        message: "Please enter valid acc no.",
                        position: 'bottom',
                        duration: 6000
                    });
                    toast.present();
                }
            } else {
                let toast = this.toast.create({
                    message: "Select year of purchase plan.",
                    position: 'bottom',
                    duration: 6000
                });
                toast.present();
            }
        }
        else {
            let toast = this.toast.create({
                message: "Select purchase plan code..",
                position: 'bottom',
                duration: 6000
            });
            toast.present();
        }
    }

    gotypesc() {
        console.log(this.status)
        if (this.status == true) {
            this.navCtrl.push(SchemetypePage, { 'ActiveSchemes': this.allschemeData, 'cusData': this.onlinedata })
        } else {
            this.navCtrl.setRoot(LoginPage)
        }

    }

    registration() {
        if (this.status == true) {
            this.navCtrl.setPages([{ page: HomePage }, { page: RegisterPage }]);
        } else {
            this.navCtrl.setRoot(LoginPage)
        }
    }

    empreport() {
        if (this.status == true) {
            this.navCtrl.push(EmpreportPage)
        } else {
            this.navCtrl.setRoot(LoginPage)
        }
    }

    cusLedger() {
        if (this.status == true) {
            this.navCtrl.push(CustomerledgerPage)
        } else {
            this.navCtrl.setRoot(LoginPage)
        }
    }

    sign() {
        this.navCtrl.setRoot(LoginPage)
    }


    call() {
        let mod = this.modalCtrl.create(CallbranchmodalPage, { 'data': this.details });
        mod.present();
    }

    openmodal() {

        let mod = this.modalCtrl.create(BranchPage)
        mod.present();
        mod.onDidDismiss(data => {

            console.log(data)
            if (data != undefined) {
                this.branchname = data['name']
                this.branchid = data['id_branch']
                console.log(data['id_branch']);
                this.commonService.getcurrency(data['id_branch']).then(data => {
                    console.log(data);
                    this.currency = data;
                    this.rates = data['metal_rates']
                    this.showSpinner = false;
                });
            }
        });

        console.log('1111')
    }

    termcondi($event) {
        this.navCtrl.push(TcPage)
    }
    tdycltion(){
      this.navCtrl.push(TodayscollectionPage)
    }

    notification()
    {
      if (this.status == true) {
        this.navCtrl.push(NotificationPage)
    } else {
        this.navCtrl.setRoot(LoginPage)
    }
    }

}
