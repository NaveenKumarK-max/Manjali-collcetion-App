import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Events, Platform, ToastController, ViewController, App } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { JoinschemePage } from '../joinscheme/joinscheme';
import { SchemedetailPage } from '../schemedetail/schemedetail';
import { GstmodelPage } from '../gstmodel/gstmodel';
import { BluetoothPage } from '../bluetooth/bluetooth';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { PayduesPage } from '../paydues/paydues';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the historyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-paymenthis',
  templateUrl: 'paymenthis.html',
  providers: [CommonProvider]

})
export class PaymenthisPage {

  history: any[] = [];
  tran: any[] = [];

  searchData: any[] = [];
  public input: string = '';
  pending: any[] = [];
  total: any = 0;
  currency: any = '';
  id_branch: any = null;
  amountsch: any[];
  amtweisch: any[];
  totalamount: any = 0;
  totalwei: any = 0;
  app_version = JSON.parse(localStorage.getItem('appVersion'));

  type: any = '';
  currentUser = JSON.parse(localStorage.getItem('sssuser'));
  companyName = JSON.parse(localStorage.getItem('company'));
  currentcussData: any = this.navParams.get('cusmobno');

  checknet = localStorage.getItem('checknetwork');

  constructor(private storage: Storage, public appCtrl: App, public viewCtrl: ViewController, public toast: ToastController, public events: Events, public modal: ModalController, public load: LoadingController, public comman: CommonProvider, public navCtrl: NavController, public navParams: NavParams, private fileOpener: FileOpener, private transfer: Transfer, public file: File, private filePath: FilePath, private fileChooser: FileChooser, public platform: Platform) {
    console.log(this.currentcussData);

    this.events.subscribe('checknetwork', (data) => {
      this.checknet = data;
      console.log(11111111111111111, data)
    });
    console.log('checkNet', this.checknet);

    this.type = this.navParams.get('sch_type');


    if (this.checknet == 'offline') {
      // offline

      this.storage.get('paymentHistoryData').then((val) => {
        console.log('paymentHistoryData : ', JSON.parse(val));
        this.history = val != null ? JSON.parse(val).filter(data => data['mobile'] == this.currentcussData['mobile']) : [];
        console.log('paymentHistoryData 1 : ', this.history);
        this.tran = this.history;
        this.searchData = this.history;
      });

    } else {

      // online Data
      let loader = this.load.create({
       // content: 'Please Wait',
        spinner: 'crescent',
      });
      loader.present();

      this.comman.getcurrency(this.id_branch).then(data => {
        this.currency = data;
        this.comman.history(this.currentcussData).then(data => {
          this.history = data;
          this.tran = data;
          this.searchData = data;
          console.log(data['sch_type']);
          console.log(this.tran)
          console.log(this.history);
          loader.dismiss();
        })
      })

    }

  }


  search(type) {
    this.history = this.searchData.filter(item => item['scheme_acc_number'].toUpperCase().includes(this.input.toUpperCase()));
    if (this.history.length == 0) {
      this.history = this.searchData.filter(item => item['payment_status'].toUpperCase().includes(this.input.toUpperCase()));
    }
  }

  more(i) {

    let mod = this.modal.create(GstmodelPage, { data: i, 'currency': this.currency })
    mod.present();
  }
  // , { enableBackdropDismiss: false }
  ionViewDidLoad() {
    console.log('ionViewDidLoad historyPage');
  }
  takeprint(pay_printable) {
    this.navCtrl.push(BluetoothPage, { 'printerurl': pay_printable });
  }

  downloadPDF(printURL, name) {
    console.log(printURL, name);
    if (printURL != '') {
      let loader = this.load.create({
        content: 'Please Wait',
        spinner: 'bubbles',
      });
      loader.present();
      /*       this.comman.getpaymentPrintURL({
              "id_payment": no,
              "id_branch": this.currentUser['employee']['id_branch']
            } ).then(data=>{
              if(data.status){  */
      if (printURL != '') {
        console.log(printURL);
        this.downloadfile(printURL, name);
      }
      //  }
      loader.dismiss();
      let toastMsg = this.toast.create({
        message: "Pdf file fetched Successfully..",
        duration: 3000,
        position: 'center'
      });
      toastMsg.present();

    } else {
      let toastMsg = this.toast.create({
        message: "No PDF records found...",
        duration: 3000,
        position: 'center'
      });
      toastMsg.present();
    }
  }

  downloadfile(url, name) {
    console.log(url, name)
    var date = new Date();
    date.setDate(date.getDate());
    console.log(date.toISOString().split('T')[0])
    this.platform.ready().then(() => {
      console.log("Platform ready");
      if (this.platform.is('android')) {
        console.log("Platform Android");
        this.file.checkDir(this.file.externalDataDirectory, this.companyName).then((data) => {
          console.log("Check directory IDO");
          this.file.checkDir(this.file.externalDataDirectory + '' + this.companyName + '/', date.toISOString().split('T')[0]).then(_ => {
            console.log("Check directory IDO " + date.toISOString().split('T')[0]);
            this.viewFile(url, name);
          }).catch(er => {
            this.file.createDir(this.file.externalDataDirectory + '' + this.companyName + '/', date.toISOString().split('T')[0], false).then(_ => {
              console.log("Create directory IDO " + date.toISOString().split('T')[0]);
              this.viewFile(url, name);
            }).catch(err => {
              console.log(err);
              console.log('Couldn\'t create directory')
            });
          });
        }).catch(err => {
          this.file.createDir(this.file.externalDataDirectory, this.companyName, false).then(_ => {
            console.log('Create directory IDO')
            this.file.createDir(this.file.externalDataDirectory + '' + this.companyName + '/', date.toISOString().split('T')[0], false).then(_ => {
              console.log('Create directory IDO / ' + date.toISOString().split('T')[0]);
              this.viewFile(url, name);
            }).catch(err1 => {
              console.log(err1);
              console.log('Couldn\'t create directory')
            });
          }).catch(err2 => {
            console.log(err2);
            console.log('Couldn\'t create directory')
          });
        });
      }
    });
  }

  viewFile(url, name) {
    var date = new Date();
    date.setDate(date.getDate());
    console.log(date);
    console.log(date.toISOString().split('T')[0])
    this.platform.ready().then(() => {
      console.log('platform ready viewFile')
      this.file.resolveDirectoryUrl(this.file.externalDataDirectory + '' + this.companyName + '/' + date.toISOString().split('T')[0]).then((resolvedDirectory) => {
        console.log(resolvedDirectory);
        console.log("resolved  directory: " + resolvedDirectory.nativeURL);
        this.file.checkFile(resolvedDirectory.nativeURL, name).then((data) => {
          console.log(data)
          console.log(resolvedDirectory.nativeURL + name)
          this.fileOpener.open(resolvedDirectory.nativeURL + name, 'application/pdf')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
        }, err => {
          console.log(err)
          let loader = this.load.create({
            content: 'Please Wait',
            spinner: 'bubbles',
          });
          loader.present();

          const filetrans: TransferObject = this.transfer.create();

          var targetPath = this.file.externalDataDirectory + '' + this.companyName + '/' + date.toISOString().split('T')[0] + '/' + name;
          filetrans.download(url, targetPath, true).then((entry) => {
            console.log('download complete: ' + entry.toURL());
            loader.dismiss();
            this.fileOpener.open(entry.toURL(), 'application/pdf')
              .then(() => console.log('File is opened'))
              .catch(e => console.log('Error opening file', e));
          }, (error) => {
            loader.dismiss();
            console.log(error)
          });
        });
      }, err => {
        console.log(err)
      });
    });
  }

  goBack() {
    console.log('true');
    this.navCtrl.setRoot(HomePage);
  }


}
