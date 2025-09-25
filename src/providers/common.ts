import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { encode } from 'punycode';
import 'rxjs/add/operator/map';
//import { Chart } from 'chart.js';



/*
  Generated class for the CommonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CommonProvider {

    private _header: Headers;
    private _imageheader: Headers;
    private _username: string = 'lmxretail';
    private _password: string = 'lmx@2017';
    status: any = false;

    constructor(public http: Http) {
        this._header = new Headers();

        this._header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        // this._header.append( 'Authorization', 'Basic ' + btoa( this._username + ':' + this._password ) );

        this._imageheader = new Headers();
        this._imageheader.append('Authorization', 'Basic ' + btoa(this._username + ':' + this._password));
    }


    public getHeader() {
        let options = new RequestOptions({ headers: this._header });
        return options;
    }
    public getImageHeader() {
        let options = new RequestOptions({ headers: this._imageheader });
        return options;
    }
    updatestatus(data) {
        console.log(data)
        this.status = data;
        console.log(this.status);
    }

    public doLogin(logindata) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/authenticate', logindata, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public feedback(data) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/sendFeedback', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public updatesettings(data) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/updatecusSettings', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public getcus() {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));

        return this.http
            .post(BaseAPIURL + 'adminapp_api/getCustomer?nocache=' + n, { "id_customer": currentUser['customer']['id_customer'] }, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public reset(data) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/updateCustomerByMobile', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public updateprofile(data) {
        console.log(data);
        return this.http
            .post(BaseAPIURL + 'adminapp_api/updateProfile', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public createcus(data) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/createCustomer', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
/*     public createcus(data) {
        return this.http
            .post("http://www.swarnaakaarshbullion.com/new/mobileapi/index.php/C_mobileclient/user_kycregistration", data)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
 */

    public checkotp(data) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/check_regOTP', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    public verifyRateFixOTP(data) {
        console.log(data);
        return this.http
            .post(BaseAPIURL + 'adminapp_api/verifyRateFixOTP', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    public submit_schregOtp(data) {
        console.log(data);
        return this.http
            .post(BaseAPIURL + 'adminapp_api/submit_schregOtp', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    public createac(logindata) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/createAccount', logindata, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    public intstenquiry(logindata) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/sch_enquiry', logindata, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public enquiry( data ) {
        return this.http
            .post( 'https://skjewels.in/mobapi/createresource.php?output_format=JSON&display=full', data, this.getHeader() )
            .map(( response ) => {
                // some response manipulation
                let result = response.json();
                return result;
            } )
            .toPromise();
    }

    getDashboardData(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/getDashboard?id_customer=' + currentUser['customer']['id_customer'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    getcomplaintstatus(id): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/custComplaintStatus?id_enquiry=' + id + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    complaints(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/custComplaints?id_customer=' + currentUser['customer']['id_customer'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    getrans(id): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/get_customerWallets?id_customer=' + currentUser['customer']['id_customer'] + '&lastIdWalTrans' + id + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    myschemes(c): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/customerSchemes?id_customer=' + c['customer']['id_customer'] + '&mobile=' + c['customer']['mobile'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    closed(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/closedAcc?id_customer=' + currentUser['customer']['id_customer'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    history(currentcusData): any {
        var d = new Date(),
            n = d.getTime()
            var currentUser = JSON.parse(localStorage.getItem('sssuser'));
       //     var currentcusData = JSON.parse(localStorage.getItem('customerData'));
            console.log(currentUser)
            console.log(currentcusData)
        return this.http
            .get(BaseAPIURL + 'adminapp_api/paymentHistory?mobile=' + currentcusData['mobile'] + '&id_employee=' + currentUser['employee']['id_employee']+ '&login_type=' + currentUser['employee']['login_type'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    schemedetail(id): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'mobile_api/getSchemeDetail?id_scheme_account=' + id + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    offdetail(id): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/offerDetail?id_offer=' + id + '&id_branch=' + currentUser['customer']['id_branch'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    newdetail(id): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/newArrDetail?id_new_arrival=' + id + '&id_branch=' + currentUser['customer']['id_branch'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    joinscheme(ids): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        var currentcusData = JSON.parse(localStorage.getItem('customerData'));
        return this.http
            .get(BaseAPIURL + 'mobile_api/getScheme?id_customer=' + currentcusData['id_customer'] + '&id_scheme=' + ids + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    exregreq(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/existingRegReq?id_customer=' + currentUser['customer']['id_customer'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    verifygenerateotp(mobile): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/checkMobileReg?mobile=' + mobile + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    getsavedcards(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/getsavedCards?mobile=' + currentUser['mobile'] + '&id_branch=' + currentUser['customer']['id_branch'] + '&id_customer=' + currentUser['customer']['id_customer'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    getallpayments(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'mobile_api/getAllPaymentGateways?emp_branch=' + currentUser['employee'].id_branch + '&id_profile=' + currentUser['employee'].id_profile + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    mGiftCardPayment(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/mGiftCardPayment?mobile=' + currentUser['mobile'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    getnetbank(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/getNetbankingStatus?mobile=' + currentUser['mobile'] + '&id_branch=' + currentUser['customer']['id_branch'] + '&id_customer=' + currentUser['customer']['id_customer'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    generateotp(mobile, email): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/generateOTP?mobile=' + mobile + '&email=' + email + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    passresetotp(mobile): any {
      var d = new Date(),
          n = d.getTime()
      let c = 'reset_password';
      var currentUser = JSON.parse(localStorage.getItem('sssuser'));
      return this.http
          .get(BaseAPIURL + 'adminapp_api/generateOTP?mobile=' + mobile + '&type=' + c + '&nocache=' + n)
          .map((response) => {
              // some response manipulation
              let result = response.json();
              return result;
          })
          .toPromise();
  }
    newarrvials(id_branch): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/new_arrivals?&id_branch=' + id_branch + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    classify(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/getClassificationAll?&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    company(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/company')
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    getwt(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'mobile_api/getWeights?nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    referal(allow): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/referral_linksend?mobile=' + currentUser['mobile'] + '&allow_referral=' + allow + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    delscheme(id): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/deleteScheme?id_scheme_account=' + id + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    getcountry(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'mobile_api/getCountry?nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    getstate(id): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'mobile_api/getState?id_country=' + id + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    getcity(id): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'mobile_api/getCity?id_state=' + id + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    /*     public doUpdateDeviceIds(deviceinfo) {
            return this.http
                .post(BaseAPIURL + 'Vendor_api/update_deviceinfo', deviceinfo, this.getHeader())
                .map((response) => {
                    // some response manipulation
                    let result = response.json();
                    return result;
                })
                .toPromise();
        }
     */


    getCusAppVersion(): any {
        return this.http
            .get(BaseAPIURL + 'adminapp_api/getVersion', this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    isnoreg(mobile, email): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/isNumberRegistered?mobile=' + mobile + '&nocache=' + n + '&email=' + email)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public doRegister(registerdata) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/createCustomer', registerdata, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public fullpay(data) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/mobile_FullPayredeem', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    getbanner(id_branch): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/offers?&id_branch=' + id_branch + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    getscheme(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));

        return this.http
            .get(BaseAPIURL + 'adminapp_api/getSchemes?&id_customer=' + currentUser['customer']['id_customer'] + '&id_branch=' + currentUser['customer']['id_branch'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    gettypescheme(data): any {
        var d = new Date(),
            n = d.getTime()
        console.log(data);
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        console.log(currentUser)
        return this.http
            .get(BaseAPIURL + 'mobile_api/getVisClass?id_customer=' + data['id_customer'] + '&id_branch=' + currentUser['employee']['id_branch'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    getjoinscheme(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        var currentcusData = JSON.parse(localStorage.getItem('customerData'));
        console.log(currentUser)
        console.log(currentcusData)
        return this.http
            .get(BaseAPIURL + 'mobile_api/getActiveSchemes?id_customer=' + currentcusData['id_customer'] + '&id_branch=' + currentUser['employee'].id_branch + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    getallAcitiveschemes(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
     //   var currentcusData = JSON.parse(localStorage.getItem('customerData'));
        console.log(currentUser)
     //   console.log(currentcusData)
        return this.http
            .get(BaseAPIURL + 'adminapp_api/getallAcitiveschemes?&id_employee=' + currentUser['employee']['id_employee'] + '&id_branch=' + currentUser['employee'].id_branch + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }


    getcurrency(id_branch): any {
        var d = new Date(),
            n = d.getTime()

        return this.http
            .get(BaseAPIURL + 'adminapp_api/currency?&nocache=' + n + '&id_branch=' + id_branch)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    getbranch(): any {
        var d = new Date(),
            n = d.getTime()
            var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/get_branch?&emp_branch=' + currentUser['employee'].id_branch + '&id_profile=' + currentUser['employee'].id_profile + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public ratehistory(data) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/rate_history', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    readKYC(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/readKYC?id_customer=' + currentUser['customer']['id_customer'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    public kyc(data) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/insertkyc', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    getnotify(id): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/getNotifications?cusID=' + currentUser['customer']['id_customer'] + '&lastNotiID=' + id + '&id_branch=' + currentUser['customer']['id_branch'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    public getmygift(data) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/getMyGifts', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public getmygiftcards(data) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/getGiftedCards', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    dthrequest(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/custDTHRequests?id_customer=' + currentUser['customer']['id_customer'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    dthstatus(id): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/custDTHStatus?id_enquiry=' + id + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    viewall_parentcategory(): any {
        var d = new Date(),
            n = d.getTime()

        return this.http
            .get(BaseAPIURL + 'adminapp_api/viewall_parentcategory?&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    view_subparent_category(id_category): any {
        var d = new Date(),
            n = d.getTime()

        return this.http
            .get(BaseAPIURL + 'adminapp_api/view_subparent_category?id_category=' + id_category + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public productDetail(prodid) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/productDetail', prodid, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    getAllBranchDetail(): any {
        var d = new Date(),
            n = d.getTime()

        return this.http
            .get(BaseAPIURL + 'adminapp_api/getAllBranchDetail?&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    termscondi(): any {
        var d = new Date(),
            n = d.getTime()

        return this.http
            .get(BaseAPIURL + 'adminapp_api/terms_and_conditions?&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public sendEnquiry(data) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/productenquriy', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    getEnqProductGrms(): any {
        var d = new Date(),
            n = d.getTime()

        return this.http
            .get(BaseAPIURL + 'adminapp_api/getEnqProductGrms?&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    custCoinEnq(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/custCoinEnq?mobile=' + currentUser['mobile'] + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    custCoinEnqStatus(id): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/custCoinEnqStatus?id_enquiry=' + id + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    public customer_ledger(data): any {
      console.log(data)
      var d = new Date(),
          n = d.getTime()
      var currentUser = JSON.parse(localStorage.getItem('sssuser'));
      console.log(currentUser)

      return this.http
          .post(BaseAPIURL + 'adminapp_api/customer_ledger',data, this.getHeader())
          .map((response) => {
              // some response manipulation

              let result = response.json();
              return result;
          })
          .toPromise();
  }

  public customer_ledger_details(data): any {
    console.log(data)
    var d = new Date(),
        n = d.getTime()
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));
    console.log(currentUser)

    return this.http
        .post(BaseAPIURL + 'adminapp_api/customer_ledger_details',data, this.getHeader())
        .map((response) => {
            // some response manipulation

            let result = response.json();
            return result;
        })
        .toPromise();
}


     uploadCusimage(data) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/uploadCusimage', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    // mobileCF_payment(params, det, total, redm, cusdetail,payBranch): any {
    //     console.log(cusdetail)
    //     console.log();
    //     var d = new Date(),
    //         n = d.getTime()
    //     //   var currentUser = JSON.parse(localStorage.getItem('sssuser'));
    //     var currentUser = JSON.parse(localStorage.getItem('sssuser'));
    //     console.log(currentUser);
    //     let qs = 'firstname=' + cusdetail.firstname + "&lastname=" + cusdetail.lastname + "&phone=" + cusdetail.mobile +'&id_employee=' + currentUser['employee']['id_employee']+ '&login_type=' + currentUser['employee']['login_type'] + "&id_branch=" + payBranch + "&amount=" + total + "&redeemed_amount=" + redm + "&productinfo=" + undefined + "&email=" + cusdetail.email + "&pg=" + 'NB' + "&gateway=" + det['id_pg'] + "&pg_code=" + det['pg_code'] + "&pay_arr=" + encodeURIComponent(JSON.stringify(params)) + "&nocache=" + d.getHours() + '' + d.getMinutes() + '' + d.getSeconds();
    //     console.log(qs)
    //     return this.http
    //         .get(BaseAPIURL + 'mobile_api/mobile_payment?' + qs + '&nocache=' + n)
    //         .map((response) => {
    //             // some response manipulation
    //             let result = response.json();
    //             return result;
    //         })
    //         .toPromise();
    // }


mobileCF_payment(params, det, total, redm, cusdetail,payBranch): any {
      var d = new Date(),
        n = d.getTime()
         var currentUser = JSON.parse(localStorage.getItem('sssuser'));
let post = {
        firstname: cusdetail.firstname,
        lastname: cusdetail.lastname,
        phone: cusdetail.mobile,
        id_employee: currentUser['employee']['id_employee'],
        login_type: currentUser['employee']['login_type'],
        id_branch: payBranch,
        amount: total,
        redeemed_amount: redm,
        productinfo: '', // avoid undefined
        email: cusdetail.email,
        pg: 'NB',
        gateway: det['id_pg'],
        pg_code: det['pg_code'],
        pay_arr: params // already object, no need to stringify unless server expects it
};
      return this.http
        .post(BaseAPIURL + 'adminapp_api/mobile_payment', post, + "&nocache=" + d.getHours() + '' + d.getMinutes() + '' + d.getSeconds() + this.getHeader())
        .map((response) => {
          // some response manipulation
          let result = response.json();
          return result;
        })
        .toPromise();
    }

    mobileCF_status(cf_result): any {
        return this.http
            .post(BaseAPIURL + 'mobile_api/cf_payment_status', cf_result, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public fetchCustomerSchemes(data) {
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        console.log(currentUser);
        return this.http
            .post(BaseAPIURL + 'adminapp_api/customerSchemes', data, this.getHeader())
            .map((response) => {
              console.log(response);
              console.log(response.json());

                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    getbranches(): any {
        var d = new Date(),
            n = d.getTime()
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        return this.http
            .get(BaseAPIURL + 'adminapp_api/get_branch?&emp_branch=' + currentUser['employee'].id_branch + '&id_profile=' + currentUser['employee'].id_profile + '&nocache=' + n)
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    public getCusByMobile(data) {
        var currentUser = JSON.parse(localStorage.getItem('sssuser'));
        console.log(currentUser);
        return this.http
            .post(BaseAPIURL + 'adminapp_api/getCusByMobile', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    public pay_collection(data) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/pay_collection', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    public getpaymentPrintURL(data) {
        return this.http
            .post(BaseAPIURL + 'adminapp_api/getpaymentPrintURL', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    public getOnlinedata(data) {
        console.log(data);
        return this.http
            .post(BaseAPIURL + 'adminapp_api/syncAgentCustomers', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    public postOnlinedata(data) {
        console.log(data);
        return this.http
            .post(BaseAPIURL + 'adminapp_api/syncOfflineAccPayments', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }
    public postOnlinenewcusdata(data) {
        console.log(data);
        return this.http
            .post(BaseAPIURL + 'adminapp_api/syncOfflineCustomers', data, this.getHeader())
            .map((response) => {
                // some response manipulation
                let result = response.json();
                return result;
            })
            .toPromise();
    }

    public agentWise_monthly_reports(data) {
      console.log(data);
      return this.http
          .post(BaseAPIURL + 'adminapp_api/agentWise_monthly_reports', data, this.getHeader())
          .map((response) => {
              // some response manipulation
              let result = response.json();
              return result;
          })
          .toPromise();
  }

  public pendingReson(data) {
    return this.http
        .post(BaseAPIURL + 'adminapp_api/pendingMsg', data, this.getHeader())
        .map((response) => {
            // some response manipulation
            let result = response.json();
            return result;
        })
        .toPromise();
}

public storeCollectionDevices(data) {
  return this.http
      .post(BaseAPIURL + 'adminapp_api/storeCollectionDevices', data, this.getHeader())
      .map((response) => {
          // some response manipulation
          let result = response.json();
          return result;
      })
      .toPromise();
}



}

export const BaseAPIURL = 'https://www.manjalijewellers.in/manjaliemi/index.php/';



