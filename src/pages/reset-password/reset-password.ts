import { Component, Pipe, PipeTransform, trigger, state, style, transition, animate, keyframes, ElementRef } from '@angular/core';
import { NavController,NavParams, Platform, MenuController, Events, LoadingController ,ToastController} from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CommonProvider } from '../../providers/common';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

/*
  Generated class for the ForgotPass page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component( {
    selector: 'page-reset-password',
    templateUrl: 'reset-password.html',
    providers: [CommonProvider]

} )
export class ResetPassPage {
    resetpasswordForm: FormGroup;

    public passwd: AbstractControl;
    public cpasswd: AbstractControl;

    errorMessage: string = 'Please Enter New Password';
    userdetails: any;
    public typechecknew = 'password';
    public showPassnew = false;
    public typecheckconfirm = 'password';
    public showPassconfirm = false;
    mob = this.navparams.get('data');
    loginstatus = false;
    

    constructor(public navparams:NavParams, private toastCtrl: ToastController, private platform: Platform, private builder: FormBuilder, private nav: NavController, private event: Events, private menu: MenuController, private commonService: CommonProvider, private loadingCtrl: LoadingController ) {
        this.nav = nav;
        this.menu = menu;
        this.platform = platform;
        console.log(JSON.parse(localStorage.getItem('sssuser')));
        this.resetpasswordForm = builder.group( {
            'passwd': ['', Validators.compose( [Validators.required, Validators.minLength( 8 ),Validators.maxLength( 16 )] )],
            'cpasswd': ['', Validators.compose( [Validators.required, Validators.minLength( 8 ),Validators.maxLength( 16 )] )],
        } , { validator: this.checkIfMatchingPasswords( 'passwd', 'cpasswd' ) } );
        
        this.passwd = this.resetpasswordForm.controls['passwd'];
        this.cpasswd = this.resetpasswordForm.controls['cpasswd'];
    }
	checkIfMatchingPasswords( passwordKey: string, passwordConfirmationKey: string ) {
        return ( group: FormGroup ) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if ( passwordInput.value !== passwordConfirmationInput.value ) {
                return passwordConfirmationInput.setErrors( { notEquivalent: true } )
            }
            else {
                return passwordConfirmationInput.setErrors( null );
            }
        }
    }
	private presentToast( text ) {
        let toast = this.toastCtrl.create( {
            message: text,
            duration: 6000,
            position: 'middle'
        } );
        toast.present();
    }
  
    public reset(  ): void {
        if ( this.resetpasswordForm.valid ) {
            this.errorMessage = 'Please wait...';
            let loader = this.loadingCtrl.create( {
              //  content: 'Please Wait',
                spinner: 'crescent',
                        } );
            loader.present();
            // this.userdetails = this.commonService.getUserDetails();
          //  var currentUser = JSON.parse(localStorage.getItem('sssuser')) ;
          if(this.navparams.get('data') != undefined){
            this.mob = this.navparams.get('data')
        }else{
            this.mob = JSON.parse(localStorage.getItem('sssuser'));
            this.mob=this.mob.mobile;
            console.log(this.mob);
        }
            this.commonService.reset( JSON.stringify( { 'passwd': this.resetpasswordForm.controls['passwd'].value, 'mobile': this.mob } ) ).then( res => {
                if ( res ) {
                    if (res.status) {
                        /* this.errorMessage = res.msg;
                        this.presentToast(res.msg); */
                        let toast = this.toastCtrl.create({
                            message: res.msg,
                            position: 'bottom',
                            duration: 3000
                        });
                        toast.present();
                        localStorage.setItem('logstatus', JSON.stringify(false));
						localStorage.setItem('remember', JSON.stringify(false));
						this.loginstatus = false;
						this.event.publish('username:changed', false);
						this.nav.setRoot(HomePage, { st: false });
                      //  this.nav.setRoot(HomePage);

                       // this.nav.setRoot(HomePage);

                    } else {
                        //this.commonservice.showAlertMSG( 2, res.msg );
                     /*    this.presentToast(res.msg);
                        this.errorMessage = res.msg; */

                        let toast = this.toastCtrl.create({
                            message: res.msg,
                            position: 'bottom',
                            duration: 6000
                        });
                        toast.present();
                    }
                    loader.dismiss();
                }
            }, error => {
                loader.dismiss();
            } );
        }
        else{
        if(this.resetpasswordForm.controls['passwd'].value != this.resetpasswordForm.controls['cpasswd'].value){

            let toast = this.toastCtrl.create( {
              message: 'Password and Confirm Password Mismatch',
                  position: 'bottom',

              duration: 6000
          } );
          toast.present();
      }
        else{
       

        let toast = this.toastCtrl.create( {
          message: 'Minimum 8 to 16 Characters Only Allowed',
              position: 'bottom',

          duration: 6000
      } );
      toast.present();
        }
    }
    }
    ionViewDidLoad() {
        console.log( 'Hello ForgotPassPage Page' );
    }
    shownewPassword() {
        this.showPassnew = !this.showPassnew;
     
        if(this.showPassnew){
          this.typechecknew = 'text';
        } else {
          this.typechecknew = 'password';
        }
      }
      showconfirmPassword() {
        this.showPassconfirm = !this.showPassconfirm;
     
        if(this.showPassconfirm){
          this.typecheckconfirm = 'text';
        } else {
          this.typecheckconfirm = 'password';
        }
      }
      in(){
        this.nav.push( LoginPage )
    }
    up(){
        this.nav.push( RegisterPage )
    }
}
