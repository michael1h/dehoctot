import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['../tab1/tab1.page.scss']
})
export class Tab3Page{
  constructor(
    private platform: Platform,
    private router: Router,
    private http: HTTP
  ) {
    // this.platform.backButton.subscribeWithPriority(999,() => {
    //   alert(this.constructor.name)
    //       if (this.constructor.name == 'Tab3Page') {
    //         this.router.navigateByUrl('/tabs/tab3');
    //       }
    // });
  }
  lstBaiTestRutGon: any = [
    {
      "item": [
        {
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_ets_2020_1.png",
          "title": "Thi thử TOEIC Đề ETS TOEIC 2019 TEST 1",
          "key": "thi-thu-toeic-de-ets-toeic-2019-test-1"
        },
        {
          "title": "Thi thử TOEIC Đề ETS TOEIC 2019 TEST 2",
          "key": "thi-thu-toeic-de-ets-toeic-2019-test-2",
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_ets_2020_2.png"
        },
        {
          "title": "Thi thử TOEIC Đề ETS TOEIC 2019 TEST 3",
          "key": "thi-thu-toeic-de-ets-toeic-2019-test-3",
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_ets_2020_3.png"
        },
        {
          "title": "Thi thử TOEIC Đề ETS TOEIC 2019 TEST 4",
          "key": "thi-thu-toeic-de-ets-toeic-2019-test-4",
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_ets_2020_4.png"
        },
        {
          "title": "Thi thử TOEIC Đề ETS TOEIC 2019 TEST 5",
          "key": "thi-thu-toeic-de-ets-toeic-2019-test-5",
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_ets_2020_5.png"
        }
      ]
    },
    {
      "item": [
        {
          "title": "Thi thử TOEIC Đề ETS TOEIC 2018 TEST 1",
          "key": "thi-thu-toeic-de-ets-toeic-2018-test-1",
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_ets_1.png"
        },
        {
          "title": "Thi thử TOEIC Đề ETS TOEIC 2018 TEST 2",
          "key": "thi-thu-toeic-de-ets-toeic-2018-test-2",
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_ets_2.png"
        },
        {
          "title": "Thi thử TOEIC Đề ETS TOEIC 2018 TEST 3",
          "key": "thi-thu-toeic-de-ets-toeic-2018-test-3",
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_ets_3.png"
        },
        {
          "title": "Thi thử TOEIC Đề ETS TOEIC 2018 TEST 4",
          "key": "thi-thu-toeic-de-ets-toeic-2018-test-4",
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_ets_4.png"
        },
        {
          "title": "Thi thử TOEIC Đề ETS TOEIC 2018 TEST 5",
          "key": "thi-thu-toeic-de-ets-toeic-2018-test-5",
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_ets_5.png"
        }
      ]
    },
    {
      "item": [
        {
          "title": "Thi thử TOEIC Đề ECO TOEIC 1000 TEST 1",
          "key": "thi-thu-toeic-de-eco-toeic-1000-test-1",
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_economy_2018_1.png"
        },
        {
          "title": "Thi thử TOEIC Đề ECO TOEIC 1000 TEST 2",
          "key": "thi-thu-toeic-de-eco-toeic-1000-test-2",
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_economy_2018_2.png"
        },
        {
          "title": "Thi thử TOEIC Đề ECO TOEIC 1000 TEST 3",
          "key": "thi-thu-toeic-de-eco-toeic-1000-test-3",
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_economy_2018_3.png"
        },
        {
          "title": "Thi thử TOEIC Đề ECO TOEIC 1000 TEST 4",
          "key": "thi-thu-toeic-de-eco-toeic-1000-test-4",
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_economy_2018_4.png"
        },
        {
          "title": "Thi thử TOEIC Đề ECO TOEIC 1000 TEST 5",
          "key": "thi-thu-toeic-de-eco-toeic-1000-test-5",
          "img": "https://tienganhmoingay.com/static/ToeicTests/images/de_thi_economy_2018_5.png"
        }
      ]
    }
  ];
}
