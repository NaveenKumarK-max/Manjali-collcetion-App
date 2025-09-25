import { GoldratemodelPage } from './../pages/goldratemodel/goldratemodel';



import { CustomerledgerdetailsPage } from './../pages/customerledgerdetails/customerledgerdetails';
import { CustomerProfilePage } from './../pages/customer-profile/customer-profile';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FileTransfer } from '@ionic-native/file-transfer'
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Market } from '@ionic-native/market';

import { LoginPage } from '../pages/login/login';
import { CustomerServicePage } from '../pages/customer-service/customer-service';
import { NewarrivalsPage } from '../pages/newarrivals/newarrivals';

import { RegisterPage } from '../pages/register/register';
import { ForgotPassPage } from '../pages/forgot-pass/forgot-pass';
import { ResetPassPage } from '../pages/reset-password/reset-password';
import { PayduesPage } from '../pages/paydues/paydues';
import { CountrymodelPage } from '../pages/countrymodel/countrymodel';
import { SocialSharing } from '@ionic-native/social-sharing';

import { CustomPopupPage } from '../pages/custom-popup/custom-popup';

import { SchemetypePage } from '../pages/schemetype/schemetype';
import { JoinschemePage } from '../pages/joinscheme/joinscheme';
import { ConfirmschemePage } from '../pages/confirmscheme/confirmscheme';
import { MyschemePage } from '../pages/myscheme/myscheme';
import { SchemedetailPage } from '../pages/schemedetail/schemedetail';
import { ClosedPage } from '../pages/closed/closed';
import { OfferPage } from '../pages/offer/offer';
import { OfferdetailPage } from '../pages/offerdetail/offerdetail';
import { NewarrivaldetailPage } from '../pages/newarrivaldetail/newarrivaldetail';
import { CreditcardPage } from '../pages/creditcard/creditcard';
import { NetbankPage } from '../pages/netbank/netbank';
import { SavecardmodelPage } from '../pages/savecardmodel/savecardmodel';
import { RatehistoryPage } from '../pages/ratehistory/ratehistory';
import { KycPage } from '../pages/kyc/kyc';
import { DthPage } from '../pages/dth/dth';
import { DthdetailPage } from '../pages/dthdetail/dthdetail';
import { DthstatusPage } from '../pages/dthstatus/dthstatus';
import { IntroimgPage } from '../pages/introimg/introimg';
import { MaintenancePage } from '../pages/maintenance/maintenance';

import { PaymenthisPage } from '../pages/paymenthis/paymenthis';
import { FaqPage } from '../pages/faq/faq';
import { NotificationPage } from '../pages/notification/notification';
import { NotifydetailPage } from '../pages/notifydetail/notifydetail';

import { HomecollectionPage } from '../pages/homecollection/homecollection';

import { FeedbackPage } from '../pages/feedback/feedback';
import { StorelocatorPage } from '../pages/storelocator/storelocator';
import { WalletPage } from '../pages/wallet/wallet';
import { SettingsPage } from '../pages/settings/settings';
import { InvitePage } from '../pages/invite/invite';
import { WriteusPage } from '../pages/writeus/writeus';
import { TcPage } from '../pages/tc/tc';
import { PpPage } from '../pages/pp/pp';
import { PolicyPage } from '../pages/policy/policy';
import { AboutPage } from '../pages/about/about';
import { ComplaintdetailPage } from '../pages/complaintdetail/complaintdetail';
import { ComplaindetastausPage } from '../pages/complaindetastaus/complaindetastaus';
import { TruncatePipe } from '../pipes/truncate/truncate';

import { BranchPage } from '../pages/branch/branch';
import { DynamictermsPage } from '../pages/dynamicterms/dynamicterms';
import { WalletmodalPage } from '../pages/walletmodal/walletmodal';
import { PaymentPage } from '../pages/payment/payment';
import { OtpPage } from '../pages/otp/otp';
import { CheckschemePage } from '../pages/checkscheme/checkscheme';
import { ClassiPopupPage } from '../pages/classi-popup/classi-popup';
import { CusPendingMsgPage } from '../pages/cus-pending-msg/cus-pending-msg';


import { EditprofilePage } from '../pages/editprofile/editprofile';
import { RegexistschemePage } from '../pages/regexistscheme/regexistscheme';
import { SchememodalPage } from '../pages/schememodal/schememodal';
import { ExregreqPage } from '../pages/exregreq/exregreq';
import { GstmodelPage } from '../pages/gstmodel/gstmodel';
import { GiftpaymentPage } from '../pages/giftpayment/giftpayment';
import { GiftlistPage } from '../pages/giftlist/giftlist';

import { PaydetailmodalPage } from '../pages/paydetailmodal/paydetailmodal';

import { ImagePicker } from '@ionic-native/image-picker';

import { DatePicker } from '@ionic-native/date-picker';
import { RatefixdisclaimerPage } from '../pages/ratefixdisclaimer/ratefixdisclaimer';

//Components
import { CarouselComponent } from '../components/carousel/carousel';

import { Ionic2RatingModule } from 'ionic2-rating/';

import { Toast } from '@ionic-native/toast';
import { OneSignal } from '@ionic-native/onesignal';
import { Network } from '@ionic-native/network';
import { AppVersion } from '@ionic-native/app-version';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ModalController, NavParams } from 'ionic-angular';

//Pipes
import { FilterPipe } from '../app/pipes/filter-pipe.pipe';

import { ScrollHideDirective } from '../directives/hide-footer/hide-footer';
import { ImageCacheDirective } from '../directives/imagecache/imagecache';
import { FormattimePipe } from '../pipes/formattime/formattime';
import { FileOpener } from '@ionic-native/file-opener';
import { FileChooser } from '@ionic-native/file-chooser';

import { Base64 } from '@ionic-native/base64';
/* import { AnimationService, AnimationBuilder } from 'css-animator'; */
import { PledgecalculatorPage } from '../pages/pledgecalculator/pledgecalculator';
import { EsticalculatorPage } from '../pages/esticalculator/esticalculator';
import { PurchaseitemPage } from '../pages/purchaseitem/purchaseitem';
import { SellitemPage } from '../pages/sellitem/sellitem';
import { CompareplanPage } from '../pages/compareplan/compareplan';
import { EnquiryFormPage } from '../pages/enquiry-form/enquiry-form';
import { CallpopupmodalPage } from '../pages/callpopupmodal/callpopupmodal';
import { CollectionsPage } from '../pages/collections/collections';
import { ProductdetailPage } from '../pages/productdetail/productdetail';
import { CoinBookFormPage } from '../pages/coin-book-form/coin-book-form';
import { CoinBookListPage } from '../pages/coin-book-list/coin-book-list';
import { CoinBookDetailsPage } from '../pages/coin-book-details/coin-book-details';
import { CallbranchmodalPage } from '../pages/callbranchmodal/callbranchmodal';
import { EmpreportPage } from '../pages/empreport/empreport';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { PaymentotpPage } from '../pages/paymentotp/paymentotp';

// import { DatabaseProvider } from '../providers/database/database';

// import { SQLite } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { SyncPage } from '../pages/sync/sync';
import { EcomfilterPage } from '../pages/ecomfilter/ecomfilter';
import { EnquiryPage } from '../pages/enquiry/enquiry';
import { JobDetailPage } from '../pages/job-detail/job-detail';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CustomerledgerPage } from '../pages/customerledger/customerledger';
import { TodayscollectionPage } from '../pages/todayscollection/todayscollection';
import { Device } from '@ionic-native/device';


let pages = [
    MyApp,
    HomePage,
    CoinBookFormPage,
    CoinBookListPage,
    CoinBookDetailsPage,
    EnquiryFormPage,
    CallpopupmodalPage,
    CollectionsPage,
    ProductdetailPage,
    LoginPage,
    RegisterPage,
    ForgotPassPage,
    ResetPassPage,
    CustomerServicePage,
    NewarrivalsPage,
    SchemetypePage,
    JoinschemePage,
    ConfirmschemePage,
    MyschemePage,
    SchemedetailPage,
    ClosedPage,
    PaymenthisPage,
    PayduesPage,
    WalletPage,
    OfferPage,
    OfferdetailPage,
    NewarrivaldetailPage,
    CustomPopupPage,
    SettingsPage,
    WriteusPage,
    InvitePage,
    TcPage,
    PpPage,
    AboutPage,
    BranchPage,
    DynamictermsPage,
    WalletmodalPage,
    PaymentPage,
    PaydetailmodalPage,
    FaqPage,
    FeedbackPage,
    ComplaintdetailPage,
    ComplaindetastausPage,
    OtpPage,
    EditprofilePage,
    CountrymodelPage,
    RegexistschemePage,
    SchememodalPage,
    ExregreqPage,
    CheckschemePage,
    CreditcardPage,
    NetbankPage,
    NotificationPage,
    NotifydetailPage,
    GstmodelPage,
    SavecardmodelPage,
    HomecollectionPage,
    RatehistoryPage,
    KycPage,
    DthPage,
    DthdetailPage,
    DthstatusPage,
    IntroimgPage,
    MaintenancePage,
    StorelocatorPage,
    ClassiPopupPage,
    GiftpaymentPage,
    GiftlistPage,
    RatefixdisclaimerPage,
    PolicyPage,
    PledgecalculatorPage,
    EsticalculatorPage,
    PurchaseitemPage,
    SellitemPage,
    CompareplanPage,
    CallbranchmodalPage,
    EmpreportPage,
    BluetoothPage,
    PaymentotpPage,
    SyncPage,
    EcomfilterPage,
    EnquiryPage,
    JobDetailPage,
    DashboardPage,
    CustomerledgerPage,
    CustomerProfilePage,
    CustomerledgerdetailsPage,
    TodayscollectionPage,
    CusPendingMsgPage,
    GoldratemodelPage,


];

export function declarations() {
    return [pages, CarouselComponent, TruncatePipe,FormattimePipe ,FilterPipe,ImageCacheDirective,ScrollHideDirective];
}

export function entryComponents() {
    return pages;
}


export function providers() {
    return [
        // Keep this to enable Ionic's runtime error handling during development     AnimationService,AnimationService,
        Device,InAppBrowser,/* DatabaseProvider,SQLite,*/BluetoothSerial,Base64, FileChooser, FileOpener, SocialSharing, ImagePicker, DatePicker, AndroidPermissions, StatusBar, SplashScreen, Toast, OneSignal, FileTransfer, File, Transfer, Camera, FilePath, Network, AppVersion, Market, { provide: ErrorHandler, useClass: IonicErrorHandler,ModalController }
    ];
}

/* @NgModule({
    declarations: declarations(),
    imports: [
        IonicModule.forRoot(MyApp), IonicStorageModule.forRoot(), BrowserModule,
        HttpModule, BrowserAnimationsModule, Ionic2RatingModule, IonicImageViewerModule
    ],
    bootstrap: [IonicApp],
    entryComponents: entryComponents(),
    providers: providers()
}) */

@NgModule({
  declarations: declarations(),
  imports: [
      IonicModule.forRoot(MyApp), IonicStorageModule.forRoot(), BrowserModule,
      HttpModule, BrowserAnimationsModule, Ionic2RatingModule, IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule { }
