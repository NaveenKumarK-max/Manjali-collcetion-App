import { Component, ViewChild } from '@angular/core';

import { CommonProvider } from '../../providers/common';
import { Slides } from 'ionic-angular';

export interface Slide {
  image: string;
}

@Component({
  selector: 'carousel',
  templateUrl: 'carousel.html',
  providers: [CommonProvider]

})
export class CarouselComponent {
  @ViewChild('slides') slides: Slides;

  slidess: any[] = [];
  text: string;
  animateClass = { 'zoom-in': true };
  id_branch: any = null;
  status: any;

  constructor(public comman: CommonProvider) {
    console.log('id_branch :' + this.id_branch)
    console.log('caro');
    /* take images from carousel provider*/

    this.status = JSON.parse(localStorage.getItem('logstatus'));
    console.log("Status" + this.status);
    let remember = JSON.parse(localStorage.getItem('remember'));
    console.log(JSON.parse(localStorage.getItem('remember')))
    var currentUser = JSON.parse(localStorage.getItem('sssuser'));

    if(this.status == true && remember == true && JSON.parse(localStorage.getItem('sssuser')) != null ){
    this.comman.getbanner(currentUser['customer']['id_branch']).then(data => {
      console.log(data)
      this.slidess = data['offers_banners'];
      console.log(this.slidess);
      // return data;
    })
  }else{
    this.comman.getbanner(this.id_branch).then(data => {
      console.log(data)
      this.slidess = data['offers_banners'];
      console.log(this.slidess);
      // return data;
    })
  }

  }
  slide() {
    this.slides.startAutoplay();
  }

}
