import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { PurchaseitemPage } from '../purchaseitem/purchaseitem';
import { SellitemPage } from '../sellitem/sellitem';
import { AlertController } from 'ionic-angular';
import  jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { File,IWriteOptions } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { SocialSharing } from '@ionic-native/social-sharing';


// import  jsPDF from 'jspdf';
// import * as html2canvas from 'html2canvas';
// import { File } from '@ionic-native/file';

/**
 * Generated class for the EsticalculatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-esticalculator',
  templateUrl: 'esticalculator.html',
  providers: [CommonProvider],

})
export class EsticalculatorPage {
  currency: any = { 'currency': { 'currency_symbol': '' } };
  id_branch: any = null;
  rates: any = '';
  purchase_wastage: any;
  details: any[] = [];
  selldetails: any[] = [];
  purchase_total: any;
  estipurchaseTotal: any = 0;
  estisellTotal: any = 0;
  grand_total: any;
  loading: any;


  constructor(private socialSharing: SocialSharing,private file: File,
    private fileOpener: FileOpener,private alertCtrl: AlertController,public events: Events, public navCtrl: NavController, public navParams: NavParams, public load: LoadingController, public comman: CommonProvider,) {
    //   console.log(this.purchasedet);
    

    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
    this.comman.getcurrency(this.id_branch).then(data => {
      this.currency = data;
      this.rates = data['metal_rates']
      loader.dismiss();

    })
  }
  // generatePdf(){
  //   const div = document.getElementById("Html2Pdf");
  //   const options = {background:"white",height :div.clientHeight , width : div.clientWidth  };
  //   html2canvas(div,options).then((canvas)=>{
  //     //Initialize JSPDF
  //     var doc = new jsPDF("p","mm","a4");
  //     //Converting canvas to Image
  //     let imgData = canvas.toDataURL("image/PNG");
  //     //Add image Canvas to PDF
  //     doc.addImage(imgData, 'PNG', 20,20 );
      
  //     let pdfOutput = doc.output();
  //     // using ArrayBuffer will allow you to put image inside PDF
  //     let buffer = new ArrayBuffer(pdfOutput.length);
  //     let array = new Uint8Array(buffer);
  //     for (var i = 0; i < pdfOutput.length; i++) {
  //         array[i] = pdfOutput.charCodeAt(i);
  //     }


  //     //This is where the PDF file will stored , you can change it as you like
  //     // for more information please visit https://ionicframework.com/docs/native/file/
  //     const directory = this.file.externalexternalDataDirectory ;

  //     //Name of pdf
  //     const fileName = "example.pdf";
      
  //     //Writing File to Device
  //     this.file.writeFile(directory,fileName,buffer)
  //     .then((success)=> console.log("File created Succesfully" + JSON.stringify(success)))
  //     .catch((error)=> console.log("Cannot Create File " +JSON.stringify(error)));
  
  
  //   });
  // }
  async presentLoading(msg) {
     this.loading = await this.load.create({
      content: msg,
      spinner: 'dots'

    });

    return await this.loading.present();
  }
  exportPdf() {
    this.presentLoading('Creating PDF file...');
    const div = document.getElementById("printable-area");
    console.log(div.clientWidth)
    console.log(div.clientHeight)

    const options = { background: "white", height: div.clientHeight, width: div.clientWidth };
    domtoimage.toPng(div, options).then((dataUrl)=> {
      //Initialize JSPDF
      var position = 0;
      var doc = new jsPDF("p","mm", [div.clientWidth, div.clientHeight]);
      // var imgWidth = 210; 
      // var pageHeight = 295;  
      // var imgHeight =  div.clientHeight * imgWidth / div.clientWidth;
      // var heightLeft = imgHeight;
      //Add image Url to PDF
      // doc.addImage(dataUrl, 'PNG', 0, 0, 240, 180);
//       doc.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;

// while (heightLeft >= 0) {
//   position = heightLeft - imgHeight; // top padding for other pages
//   doc.addPage();
//   doc.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
//   heightLeft -= pageHeight;
// }
doc.addImage(dataUrl, 'PNG', 0, 0, div.clientWidth, div.clientHeight);

      let pdfOutput = doc.output();
      // using ArrayBuffer will allow you to put image inside PDF
      let buffer = new ArrayBuffer(pdfOutput.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < pdfOutput.length; i++) {
          array[i] = pdfOutput.charCodeAt(i);
      }
  
  
      //This is where the PDF file will stored , you can change it as you like
      // for more information please visit https://ionicframework.com/docs/native/file/
      const directory = this.file.externalDataDirectory ;
      const fileName = "invoice.pdf";
      let options: IWriteOptions = { replace: true };
  
      this.file.checkFile(directory, fileName).then((success)=> {
        //Writing File to Device
        this.file.writeFile(directory,fileName,buffer, options)
        .then((success)=> {
          this.loading.dismiss();
          console.log("File created Succesfully" + JSON.stringify(success));
          // this.fileOpener.open(this.file.externalDataDirectory + fileName, 'application/pdf')
          //   .then(() => console.log('File is opened'))
          //   .catch(e => console.log('Error opening file', e));
          this.socialSharing.share("Estimation", null, this.file.externalDataDirectory + fileName, 'https://www.vimalajewellery.com/')
          .then((data) => {

            console.log(data);
      
            // Success!
        }).catch((err) => {
            console.log(err);
      
            // Error!
            alert("Sorry! Sharing via WhatsApp is not possible");
        });
        })
        .catch((error)=> {
          this.loading.dismiss();
          console.log("Cannot Create File " +JSON.stringify(error));
        });
      })
      .catch((error)=> {
        //Writing File to Device
        this.file.writeFile(directory,fileName,buffer)
        .then((success)=> {
          this.loading.dismiss();
          console.log("File created Succesfully" + JSON.stringify(success));
          // this.fileOpener.open(this.file.externalDataDirectory + fileName, 'application/pdf')
          //   .then(() => console.log('File is opened'))
          //   .catch(e => console.log('Error opening file', e));
          this.socialSharing.share("Estimation", null, this.file.externalDataDirectory + fileName, 'https://www.vimalajewellery.com/')
          .then((data) => {
            console.log(data);
      
            // Success!
        }).catch((err) => {
            console.log(err);
      
            // Error!
            alert("Sorry! Sharing via WhatsApp is not possible");
        });
        })
        .catch((error)=> {
          this.loading.dismiss();
          console.log("Cannot Create File " +JSON.stringify(error));
        });
      });
    })
    .catch(function (error) {
      this.loading.dismiss();
      console.error('oops, something went wrong!', error);
    });
  }

  purchase(item) {
    // var item1={'purchase_category':'','purchase_wastage':'','stone_charge':'','purchase_weight':'','making_charge':'','purchase_total':''}
    this.navCtrl.push(PurchaseitemPage)
  }
  sell() {
    // var item1={ 'sell_total': '', 'sell_category': '', 'sell_weight': '', 'sell_wastage': '', 'sell_purerate': ''};
    this.navCtrl.push(SellitemPage)
  }
 

  ionViewWillEnter() {
    // let user = false;
    // this.events.publish('user:created', user);
    
    console.log(JSON.parse(localStorage.getItem('pDetails')))
    console.log(JSON.parse(localStorage.getItem('sDetails')))
    this.estipurchaseTotal = 0;
    this.estisellTotal = 0;
    if (localStorage.getItem('pDetails') != null) {
      this.details = JSON.parse(localStorage.getItem('pDetails'));
      console.log(this.details)
      this.details.forEach((element, i) => {
        console.log(element['purchase_total']);
        this.estipurchaseTotal += parseInt(element['purchase_total']);
      });
      console.log(parseInt(this.estipurchaseTotal));
      this.grandtotal(this.estipurchaseTotal);
    }

    if (localStorage.getItem('sDetails') != null) {
      this.selldetails = JSON.parse(localStorage.getItem('sDetails'));
      console.log(this.selldetails)
      this.selldetails.forEach((element, i) => {
        console.log(element['sell_total'])
        this.estisellTotal += parseInt(element['sell_total']);
      });
      console.log(parseInt(this.estisellTotal));
      this.grandtotal(this.estisellTotal);

    }
  }
  again() {
    
    console.log(JSON.parse(localStorage.getItem('pDetails')))
    console.log(JSON.parse(localStorage.getItem('sDetails')))
    this.estipurchaseTotal = 0;
    this.estisellTotal = 0;
    if (localStorage.getItem('pDetails') != null) {
      this.details = JSON.parse(localStorage.getItem('pDetails'));
      console.log(this.details)
      this.details.forEach((element, i) => {
        console.log(element['purchase_total'])
        this.estipurchaseTotal += parseInt(element['purchase_total']);
      });
      console.log(parseInt(this.estipurchaseTotal));
      this.grandtotal(this.estipurchaseTotal);
    }

    if (localStorage.getItem('sDetails') != null) {
      this.selldetails = JSON.parse(localStorage.getItem('sDetails'));
      console.log(this.selldetails)
      this.selldetails.forEach((element, i) => {
        console.log(element['sell_total'])
        this.estisellTotal += parseInt(element['sell_total']);
      });
      console.log(parseInt(this.estisellTotal));
      this.grandtotal(this.estisellTotal);

    }
  }

  grandtotal(tot) {
    this.grand_total = this.estipurchaseTotal - this.estisellTotal;
  }
  ptrash(i) {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to delete this entry?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.details.splice(i,1);
            localStorage.setItem('pDetails', JSON.stringify(this.details));
            this.again();

            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
  deleteall() {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to delete all entries?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.details = [];
            localStorage.setItem('pDetails', JSON.stringify(this.details));
            this.selldetails = [];
            localStorage.setItem('sDetails', JSON.stringify(this.selldetails));
            this.again();

            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
  strash(i) {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to delete this entry?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.selldetails.splice(i,1);
            localStorage.setItem('sDetails', JSON.stringify(this.selldetails));
            this.again();
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  Purchase_Edit(item,idx){
    console.log(item);
    console.log(idx);
    localStorage.setItem('pur',JSON.stringify(item));
    this.navCtrl.push(PurchaseitemPage, {'purchaseitem':item,'idx':idx,'full':this.details,'edit':true})

  }

  Sell_Edit(item,idx){

    console.log(item);
    console.log(idx);
    localStorage.setItem('sel',JSON.stringify(item));

    this.navCtrl.push(SellitemPage, {'sellitem':item,'idx':idx,'full':this.selldetails,'edit':true})

  }

}
