import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { DatePicker } from '@ionic-native/date-picker';
import { CountrymodelPage } from '../countrymodel/countrymodel';

/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
  providers: [CommonProvider]

})
export class EditprofilePage {

  details: any = '';
  country: any[] = [];
  state: any[] = [];
  city: any[] = [];
  title: any[] = [];
  protitle: any = '';
  preofdetails: any = '';


  constructor(public modal: ModalController, private datePicker: DatePicker, public comman: CommonProvider, public toast: ToastController, public load: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
    this.comman.getcus().then(data => {

      this.details = data;
      this.comman.getstate(this.details['id_country']).then(data => {


        this.state = data;
      })
      this.comman.getcity(this.details['id_city']).then(data => {

        this.city = data;
        loader.dismiss();

      })

      if(this.details['date_of_birth'] != '' && this.details['date_of_birth'] != null){
        var temp:any[] = this.details['date_of_birth'].split('-');
        console.log(temp);
        var ddd1 = temp[0];
        var mmm1 = temp[1];
        var yy1 = temp[2];
        var date = new Date(yy1 + "-" + mmm1 + "-" + ddd1);
        var ddd = date.getDate();
        var mmm = date.getMonth() + 1;
        var yy = date.getFullYear();
      
        console.log(ddd)
        console.log(mmm)
        console.log(yy)
        this.details.date_of_birth = yy + "-" + mmm + "-" + ddd;
      }
      if(this.details['date_of_wed'] != '' && this.details['date_of_wed'] != null){
        var temp:any[] = this.details['date_of_wed'].split('-');
        console.log(temp);
        var ddd1 = temp[0];
        var mmm1 = temp[1];
        var yy1 = temp[2];
        var date = new Date(yy1 + "-" + mmm1 + "-" + ddd1);
        var ddd = date.getDate();
        var mmm = date.getMonth() + 1;
        var yy = date.getFullYear();
      
        console.log(ddd)
        console.log(mmm)
        console.log(yy)
        this.details.date_of_wed = yy + "-" + mmm + "-" + ddd;
      }


    })
    this.comman.getcountry().then(data => {

      console.log(data)
      this.country = data;

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  submit() {

    var allow_submit = false;
    var regexp = /^[a-zA-Z ]*$/;
    var firstname = this.details['firstname'];
    var lastname = this.details['lastname'];
    var txt = firstname.toUpperCase();
    if (!regexp.test(txt)) {
      var ltxt = lastname.toUpperCase();
      if (!regexp.test(ltxt)) {
        let toast = this.toast.create({
          message: "Firstname and lastname must contain alphabets only",
          position: 'bottom',
          duration: 6000
        });
        toast.present();
        allow_submit = false;
      } else {
        let toast = this.toast.create({
          message: "Firstname must contain alphabets only",
          position: 'bottom',
          duration: 6000
        });
        toast.present();
        allow_submit = false;

      }
    } else {
      var txt = lastname.toUpperCase();
      if (!regexp.test(txt)) {
        let toast = this.toast.create({
          message: "Lastname must contain alphabets only",
          position: 'bottom',
          duration: 6000
        });
        toast.present();
        allow_submit = false;
      } else {
        allow_submit = true;
      }
    }

    if(allow_submit){

    let loader = this.load.create({
      content: 'Please Wait',
      spinner: 'dots',
    });
    loader.present();
    this.preofdetails = Object.assign(this.details, this.protitle);
    console.log(this.preofdetails);
    this.comman.updateprofile(this.preofdetails).then(data => {

      if (data['status']) {
        let toast = this.toast.create({
          message: data['msg'],
          position: 'bottom',
          duration: 6000
        });
        loader.dismiss();
        toast.present();
      }
      else {
        let toast = this.toast.create({
          message: data['msg'],
          position: 'bottom',
          duration: 6000
        });
        loader.dismiss();
        toast.present();
      }

    })
  }
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
      console.log(ddd)
      console.log(mmm)
      console.log(yy)
      this.details.date_of_birth = yy + "-" + mmm + "-" + ddd;
   // this.details.date_of_birth = ddd + "-" + mmm + "-" + yy;

       console.log( this.details.date_of_birth)
    });
  }
  wed() {
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
      console.log(ddd)
      console.log(mmm)
      console.log(yy)
      this.details.date_of_wed = yy + "-" + mmm + "-" + ddd;
     // this.details.date_of_wed = ddd + "-" + mmm + "-" + yy;
       console.log( this.details.date_of_wed)
    });
  }
  openmodal(name, details) {

    let mod = this.modal.create(CountrymodelPage, { data: details, name: name })
    mod.present();
    mod.onDidDismiss((dataa, name) => {

      console.log(dataa)
      if (dataa != undefined) {
        let loader = this.load.create({
          content: 'Please Wait',
          spinner: 'dots',
        });
        loader.present();
        if (name == 'Country') {
          this.comman.getstate(dataa['id_country']).then(data => {

            this.details['countryname'] = dataa['name']
            this.details['id_country'] = dataa['id_country']

            this.state = data;
            loader.dismiss();
          })
        }
        if (name == 'State') {

          this.comman.getcity(dataa['id_state']).then(data => {
            this.details['statename'] = dataa['name']
            this.details['id_state'] = dataa['id_state']
            this.city = data;
            loader.dismiss();

          })
        }
        if (name == 'City') {

          this.details['cityname'] = dataa['name']
          this.details['id_city'] = dataa['id_city']
          loader.dismiss();

        }
      }

    });

  }

/*   categories = [
    {

      title: 'Mr',
      value: false
    },

    {
      title: 'Mrs',
      value: false
    },
    {
      title: 'Ms',
      value: false
    },
    {
      title: 'Dr',
      value: false
    },
    {
      title: 'Prof',
      value: false
    }
  ];

  selection(title: string) {
    this.categories.forEach(item => {
      if (item.title !== title) {
        item.value = !item.value
        this.protitle = { 'title': title };
        console.log(this.protitle);
      }
    })

  } */

}
