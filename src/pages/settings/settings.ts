import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, ToastController,Events } from 'ionic-angular';
import { PpPage } from '../pp/pp';
import { AboutPage } from '../about/about';
import { TcPage } from '../tc/tc';
import { ResetPassPage } from '../reset-password/reset-password';
import { CommonProvider, BaseAPIURL } from '../../providers/common';
import { EditprofilePage } from '../editprofile/editprofile';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { KycPage } from '../kyc/kyc';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;



@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [CommonProvider]

})
export class SettingsPage {

  details: any = '';
  deviceid = JSON.parse(localStorage.getItem('DeviceData'));
  status = JSON.parse(localStorage.getItem('logstatus'));
  imgname: any = '';
  imgpath: any = '';
  kyc_req:any;

  constructor(public toastCtrl: ToastController, public platform: Platform, private camera: Camera, private transfer: Transfer, private ftransfer: FileTransfer, private file: File, private filePath: FilePath, public comman: CommonProvider, public load: LoadingController, public navCtrl: NavController, public navParams: NavParams,private events: Events) {
    this.kyc_req = JSON.parse(localStorage.getItem('sssuser'));
    console.log(this.kyc_req)

    if (this.status != null && this.status != false) {
      let loader = this.load.create({
        content: 'Please Wait',
        spinner: 'dots',
      });
      loader.present();
      this.comman.getcus().then(data => {

        this.details = data;
        loader.dismiss();

      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter");

    let user = true;
    this.events.publish('user:created', user);

}

  updatesettings() {

    var currentUser = JSON.parse(localStorage.getItem('sssuser'));



    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
    if (this.details['notification'] == 0) {

      if (this.deviceid != null) {
        var temp = { "id_customer": currentUser['customer']['id_customer'], "notification": 1, "token": this.deviceid['token'], "uuid": this.deviceid['uuid'], "device_type": this.deviceid['device_type'] }
      }
      this.comman.updatesettings(temp).then(data => {
        this.details['notification'] = 1;
        loader.dismiss();

      })
    }
    else {
      if (this.deviceid != null) {
        var temp = { "id_customer": currentUser['customer']['id_customer'], "notification": 0, "token": this.deviceid['token'], "uuid": this.deviceid['uuid'], "device_type": this.deviceid['device_type'] }
      }
      this.comman.updatesettings(temp).then(data => {
        this.details['notification'] = 0;

        loader.dismiss();

      })
    }

  }
  pp() {

    this.navCtrl.push(PpPage)
  }
  about() {

    this.navCtrl.push(AboutPage)
  }
  tc() {

    this.navCtrl.push(TcPage)
  }
  changepwd() {

    this.navCtrl.push(ResetPassPage)
  }
  edit() {
    this.navCtrl.push(EditprofilePage)

  }

  kyc() {
    this.navCtrl.push(KycPage)

  }


  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      encodingType: this.camera.EncodingType.JPEG,
/*       targetWidth: 1024,
      targetHeight: 768, */
      saveToPhotoAlbum: false,
      correctOrientation: true,
   //   allowEdit: true

    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            // this.uploadImage();
          });


      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        // this.uploadImage();

      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    })
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
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

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 6000,
      position: 'middle'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));

    // Destination URL
    var url = BaseAPIURL + 'mobile_api/uploadCusimage';
    var d = new Date(),
      n = d.getTime()
    // File for Upload
    var targetPath = this.pathForImage(this.imgname) + '?nocache=' + n;
    // File name only
    var filename = this.imgname;
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      params: {
        fileName: filename,
        id_customer: currentUser['customer']['id_customer']
      }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    let loader = this.load.create({
      content: "Uploading..."
    });
    loader.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, encodeURI(url), options).then((data) => {
      let result = JSON.parse(data.response);
      console.log(JSON.parse(data.response))
      console.log(targetPath);
      console.log(data);
      this.comman.getcus().then(data => {
        this.details = data;
        this.details['cus_img'] = data['cus_img'];
        loader.dismiss();

      })
   //   this.details['cus_img'] = targetPath;
      loader.dismissAll();
      this.presentToast('Image succesfully uploaded.');
    }, err => {
      loader.dismissAll()

      this.presentToast('Error while uploading Image.');
    });
  }

}
