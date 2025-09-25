import { Component, Pipe, PipeTransform, trigger, state, style, transition, animate, keyframes, ElementRef } from '@angular/core';
import { NavController, Platform, MenuController, Events, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { RegisterPage } from '../../pages/register/register';
import { LoginPage } from '../../pages/login/login';
import { CommonProvider } from '../../providers/common';
import { OtpPage } from '../otp/otp';

/*
  Generated class for the ForgotPass page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-forgot-pass',
    templateUrl: 'forgot-pass.html',
    providers: [CommonProvider]

})
export class ForgotPassPage {
    forgotpasswordForm: FormGroup;
    resetpasswordForm: FormGroup;
    public mobileno: AbstractControl;


    userdetails: any;
    app_version = JSON.parse(localStorage.getItem('appVersion'));

    constructor(public toast: ToastController, private platform: Platform, private builder: FormBuilder, private nav: NavController, private event: Events, private menu: MenuController, private commonService: CommonProvider, private loadingCtrl: LoadingController) {
        this.nav = nav;
    //     this.menu.swipeEnable(false);
		// this.menu.enable(false);
    let that = this;
        this.platform = platform;
        this.forgotpasswordForm = builder.group({
            'mobileno': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],

        });

        this.mobileno = this.forgotpasswordForm.controls['mobileno'];


    }

    public otp(values: Object): void {
        if (this.forgotpasswordForm.valid) {

            let loader = this.loadingCtrl.create({
               // content: 'Please Wait',
                spinner: 'crescent',
            });
            loader.present();
            this.commonService.verifygenerateotp(this.forgotpasswordForm.controls['mobileno'].value).then(res => {
                if (res) {
                    if (res.is_reg) {

                        this.nav.push(OtpPage, { data: this.forgotpasswordForm.controls['mobileno'].value, page: 'old' })

                    } else {
                        let toast = this.toast.create({
                            message: 'Entered Mobile is not Registered',
                            duration: 6000,
                            position: 'bottom'
                        });
                        toast.present();
                    }
                    loader.dismiss();
                }
            }, error => {
                loader.dismiss();
            });
        }
        else {
            let toast = this.toast.create({
                message: 'Please Enter 10 Digit Mobile Number',
                duration: 6000,
                position: 'bottom'
            });
            toast.present();
        }
    }

    ionViewDidLoad() {
        console.log('Hello ForgotPassPage Page');
    }
    /* for footer as hide in default. it's assigned in app.components.ts */
    ionViewWillEnter() {
        let user = false;
        this.event.publish('user:created', user);
    }
    register() {
        this.nav.setRoot(RegisterPage) //navigate to RegisterPage
    }
    in() {
        this.nav.push(LoginPage)
    }
    up() {
        this.nav.push(RegisterPage)
    }

    login() {
        this.nav.setRoot(LoginPage) //navigate to HomePage
    }


    public mobonKeyUp(event: any) {
        //const NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
       const NUMBER_REGEXP = /^[0-9]*$/;
        let newValue = event.target.value;
        let regExp = new RegExp(NUMBER_REGEXP);

        if (!regExp.test(newValue)) {
          event.target.value = newValue.slice(0, -1);
          return true;
        }else{
          return false;
        }
      }


}
