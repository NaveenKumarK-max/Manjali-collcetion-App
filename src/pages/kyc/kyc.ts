



import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Events, MenuController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { CommonProvider, BaseAPIURL } from '../../providers/common';
import { PayduesPage } from '../paydues/paydues';
import { HomePage } from '../home/home';
import { FileChooser } from '@ionic-native/file-chooser';



import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { Base64 } from '@ionic-native/base64';

import { FilePath } from '@ionic-native/file-path';

declare var cordova: any;


/**
 * Generated class for the KycPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-kyc',
  templateUrl: 'kyc.html',
})
export class KycPage {

  type = "b";
  dob: any = '';
  no: any = '';
  name: any = '';
  ano: any = '';
  aname: any = '';

  acnumber: any = '';
  acname: any = '';
  confirmac: any = '';
  bank_ifsc: any = '';
  bank_branch: any = '';

  pannumber: any = '';
  panname: any = '';
  /*   number: any = ''; */

  adharno: any = '';
  adharname: any = '';
  adhardob: any = '';
  adrpwd: any = '';
  adharstatus: any = '';
  adharstatusvalue: any = '';


  dlcno: any = '';
  dlcdob: any = '';

  pantab = true;
  bankstatus: any = '';
  panstatus: any = '';
  licencestatus: any = '';

  bankstatusvalue: any = '';
  panstatusvalue: any = '';
  licencestatusvalue: any = '';

  count: any[] = [];
  color: any[] = [];
  showLoadMore = false; newPostAvailable = false;
  storageDirectory: any;
  spinner: any[] = [];
  slidess: any[] = [];
  downloadd: any[] = [];
  imgname: any = '';
  imgpath: any = '';
  targetpath: any = '';
  aadhaarLink: any = '';
  aadhaarDownLink: any = '';
  agreestatus: any = false;
  currentName: any = '';

  constructor(public toast: ToastController, private fileChooser: FileChooser, private transfer: Transfer, private ftransfer: FileTransfer, private file: File, private filePath: FilePath, private datePicker: DatePicker, public comman: CommonProvider, public load: LoadingController, private events: Events, private menu: MenuController, public navCtrl: NavController, public navParams: NavParams) {

    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();

    // this.comman.getauthenticate().then(data=>{

    //   console.log(data)
    // })

    // this.comman.myschemes().then(data => {

    //   data['chits'].forEach((element, i) => {

    //     if (element['allow_pay'] == 'Y') {

    //       this.count.push(element)
    //     }
    //   });
    //   // loader.dismiss();
    // });

    this.comman.readKYC().then(data => {

      this.aadhaarLink = data['aadhaarlink'];
      this.aadhaarDownLink = data['aadhaardownlink'];
      console.log(this.aadhaarLink);

      data.data.forEach((element, i) => {

        if (element['kyc_type'] == 1) {
          this.bank_ifsc = element['bank_ifsc'];
          this.acnumber = element['number'];
          this.confirmac = element['number'];
          this.acname = element['name'];
          this.bank_branch = element['bank_branch'];
          this.bankstatusvalue = element['status'];
          this.bankstatus = element['status'] == "Verified" ? true : false;

          this.type = 'p';
          //  this.status.push(element)
        }
        else if (element['kyc_type'] == 2) {
          this.pannumber = element['number'];
          this.panname = element['name'];
          this.panstatusvalue = element['status'];
          this.panstatus = element['status'] == "Verified" ? true : false;

          this.type = 'dl';
        }
        else if (element['kyc_type'] == 4) {
          this.dlcno = element['number'];
          this.dlcdob = element['dob'];
          this.licencestatusvalue = element['status'];
          this.licencestatus = element['status'] == "Verified" ? true : false;

          this.type = 'dl';
        }
        else if (element['kyc_type'] == 3) {
          this.adharno = element['number'];
          this.adhardob = element['dob'];
          this.adharstatusvalue = element['status'];
          this.adharstatus = element['status'] == "Verified" ? true : false;


          this.type = 'a';
          console.log(this.adharstatusvalue)
        }
      });
      loader.dismiss();
      console.log(this.adharstatusvalue)


    });


  }
  agree(e) {

    this.agreestatus = e.value;
    console.log(e);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KycPage');
  }
  segmentChanged(e) {

  }
  birth() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(date => {

      var ddd = date.getDate();
      var mmm = date.getMonth() + 1;
      var yy = date.getFullYear();
      //var today = new Date(yy+"-"+mmm+"-"+ddd).toISOString().substring(0, 10);
      var today = date.toISOString().substring(0, 10);
      //this.fromdate= today;
      this.dlcdob = yy + "-" + mmm + "-" + ddd;

    });
  }


  bank() {


    //  var regexp = /^[A-Za-z]{4}\d{7}$/;
    var regexp = /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/;
    var validifsc = regexp.test(this.bank_ifsc.toUpperCase());

    var currentUser = JSON.parse(localStorage.getItem('sssuser'));

    if (this.bank_ifsc != '' && validifsc == true) {
      if (this.acnumber != '' && this.confirmac != '') {
        if (this.acnumber == this.confirmac) {
          if (this.acname != '') {
            let loader = this.load.create({
              content: 'Please Wait',
              //spinner: 'hide',
            });
            loader.present();

            this.comman.kyc({ "id_customer": currentUser['customer']['id_customer'], "kyc_type": "1", "number": this.acnumber, "name": this.acname, "bank_ifsc": this.bank_ifsc, "bank_branch": this.bank_branch }
            ).then(res => {
              console.log(res.kyc_status);
              if (res) {
                if (res['status'] == true) {
                  let toast = this.toast.create({
                    message: res.msg,
                    duration: 6000
                  });
                  toast.present();
                  this.bankstatus = true;
                  this.bankstatusvalue = res['kyc_type_status'];
                  this.type = 'p';
                } else {
                  let toast = this.toast.create({
                    message: res.msg,
                    duration: 6000
                  });
                  toast.present();
                }
                loader.dismiss();
              }
              // if (res.kyc_status == 0) {
              //   this.pantab = true;
              //   this.type = "p";
              //   console.log(this.type);
              //   console.log(this.pantab);
              // }
            }, error => {
              loader.dismiss();
            });

          }
          else {
            let toast = this.toast.create({
              message: 'Account Holder Name is Required',
              position: 'bottom',
              duration: 6000
            });
            toast.present();
          }
        }
        else {
          let toast = this.toast.create({
            message: 'Account Number and Confirm Account Number Mismatch',
            position: 'bottom',
            duration: 6000
          });
          toast.present();
        }
      }
      else {
        let toast = this.toast.create({
          message: 'Account Number and Confirm Account Number Required',
          position: 'bottom',
          duration: 6000
        });
        toast.present();
      }
    }
    else {
      let toast = this.toast.create({
        message: 'IFSC Code Must Contain 11 Digits Only',
        position: 'bottom',
        duration: 6000
      });
      toast.present();
    }

  }


  selectDocument() {
    this.fileChooser.open().then((imageData) => {
      this.filePath.resolveNativePath(imageData)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          this.currentName = filePath.substring(filePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, this.currentName, this.createFileName());
          console.log(filePath);
          console.log(correctPath);
          console.log(this.currentName)
        })
        .catch(err => {
          let toast = this.toast.create({
            message: 'Please Choose File from File Explorer',
            duration: 2000,
            position: "bottom"
          });
          toast.present(toast);
        });
    });

  }
  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".pdf";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.imgname = newFileName;
      this.imgpath = this.pathForImage(this.imgname);

      this.uploadImage();

    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  private presentToast(text) {
    let toast = this.toast.create({
      message: text,
      duration: 6000,
      position: 'middle'
    });
    toast.present();
  }

  public uploadImage() {
    this.targetpath = this.pathForImage(this.imgname);


    var currentUser = JSON.parse(localStorage.getItem('sssuser'));

    // Destination URL
    var url = BaseAPIURL + 'mobile_api/uploadAadhar';
    var d = new Date(),
      n = d.getTime()
    // File for Upload
    var targetPath = this.pathForImage(this.imgname);
    // File name only
    var filename = this.imgname;
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        file_name: filename,
        id_customer: currentUser['customer']['id_customer'],

      }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    let loader = this.load.create({
      content: "Uploading..."
    });
    loader.present();

    console.log(targetPath, url, filename);

    fileTransfer.upload(targetPath, encodeURI(url), options).then((data) => {
      let result = JSON.parse(data.response);
      loader.dismissAll();
      this.presentToast('File succesfully uploaded.');
    }, err => {
      loader.dismissAll()

      this.presentToast('Error while uploading Image.');
    });

  }



  aadhar() {
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));

    if (this.adrpwd != '' && this.targetpath != '') {
      if (this.agreestatus == true) {

        let loader = this.load.create({
          //  content: 'Please Wait',
          spinner: 'hide',
        });
        loader.present();

        this.comman.kyc({ "id_customer": currentUser['customer']['id_customer'], "kyc_type": '3', 'file_name': this.imgname, 'pdf_password': this.adrpwd }
        ).then(res => {
          if (res) {
            if (res['status'] == true) {
              let toast = this.toast.create({
                message: res.msg,
                duration: 6000
              });
              toast.present();
              this.adharstatus = true;
              this.adharstatusvalue = res['kyc_type_status'];
              // this.type = 'p';
              if (res.kyc_status == 1) {
                this.navCtrl.setRoot(HomePage);
              }

              //  this.navCtrl.setRoot(HomePage);

            } else {
              let toast = this.toast.create({
                message: res.msg,
                duration: 6000
              });
              toast.present();
            }
            loader.dismiss();
          }
          if (res.kyc_status == 0) {
            this.pantab = true;
            this.type = "a";
            console.log(this.type);
            console.log(this.pantab);
          }

        }, error => {
          loader.dismiss();
        });
      }
      else {
        let toast = this.toast.create({
          message: 'Please Enable Aadhaar details for KYC verification',
          position: 'bottom',

          duration: 6000
        });
        toast.present();
      }
    }
    else {
      let toast = this.toast.create({
        message: 'Aadhaar File and Aadhaar Pdf Password is Required',
        position: 'bottom',

        duration: 6000
      });
      toast.present();
    }


  }


  pan() {


    var regexp = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
    var validPan = regexp.test(this.pannumber.toUpperCase());
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));

    if (validPan == true && this.pannumber != '') {
      if (this.panname != '') {

        let loader = this.load.create({
          content: 'Please Wait',
          //spinner: 'hide',
        });
        loader.present();

        this.comman.kyc({ "id_customer": currentUser['customer']['id_customer'], "kyc_type": "2", "number": this.pannumber, "name": this.panname }
        ).then(res => {
          localStorage.setItem('kyc_status', JSON.stringify(res['kyc_status']));
          console.log(JSON.stringify(res));

          if (res) {
            if (res['status'] == true) {
              let toast = this.toast.create({
                message: res.msg,
                duration: 6000
              });
              toast.present();
              this.panstatus = true;
              this.type = 'dl';
              this.panstatusvalue = res['kyc_type_status'];

              if (res.kyc_status == 1) {
                this.navCtrl.setRoot(HomePage);
              }

            } else {
              let toast = this.toast.create({
                message: res.msg,
                duration: 6000
              });
              toast.present();

            }
            loader.dismiss();
          }
          // if (res.kyc_status == 0) {
          //   this.pantab = true;
          //   this.type = "dl";
          //   console.log(this.type);
          //   console.log(this.pantab);
          // }

        }, error => {
          loader.dismiss();
        });

      }
      else {
        let toast = this.toast.create({
          message: 'PAN Card Holder Name Required',
          position: 'bottom',
          duration: 6000
        });
        toast.present();
      }

    }
    else {

      let toast = this.toast.create({
        message: 'Please Enter Valid PAN Number',
        position: 'bottom',
        duration: 6000
      });
      toast.present();
    }
  }



  drivinglic() {

    var currentUser = JSON.parse(localStorage.getItem('sssuser'));

    if (this.dlcno != '') {

      let loader = this.load.create({
        content: 'Please Wait',
        // spinner: 'hide',
      });
      loader.present();

      this.comman.kyc({ "id_customer": currentUser['customer']['id_customer'], "kyc_type": "4", "number": this.dlcno, "dob": this.dlcdob }
      ).then(res => {
        console.log(res.kyc_status);

        localStorage.setItem('kyc_status', JSON.stringify(res['kyc_status']));
        console.log(JSON.stringify(res));

        if (res) {
          if (res['status'] == true) {
            let toast = this.toast.create({
              message: res.msg,
              duration: 6000
            });
            toast.present();
            this.licencestatus = true;
            this.licencestatusvalue = res['kyc_type_status'];

            if (res.kyc_status == 1) {
              this.navCtrl.setRoot(HomePage);
            }

            //  this.navCtrl.setRoot( HomePage );

          } else {
            let toast = this.toast.create({
              message: res.msg,
              duration: 6000
            });
            toast.present();
          }
          loader.dismiss();
        }
        // if (res.kyc_status == 0) {
        //   this.pantab = true;
        //   // this.type = "b";
        //   console.log(this.type);
        //   console.log(this.pantab);
        // }
      }, error => {
        loader.dismiss();
      });
    }
    else {
      let toast = this.toast.create({
        message: 'Please enter valid Driving Licence',
        position: 'bottom',
        duration: 6000
      });
      toast.present();
    }
  }

  paydue() {

    this.navCtrl.push(PayduesPage)
  }
  /* for footer as hide in default. it's assigned in app.components.ts */
  ionViewWillEnter() {
    let user = false;
    this.events.publish('user:created', user);
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }


}

