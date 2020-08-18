import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { URLAPI } from '../constant';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  isLoading = false;
  lstBaiTestRutGon: any = [];
  constructor(
    private http: HTTP
  ) {

  }

  ngOnInit() {
    this.isLoading = true;
    this.http.get(URLAPI + 'abcxzy', {}, {}).then(data => {
        this.lstBaiTestRutGon = JSON.parse(data.data);
        this.lstBaiTestRutGon = JSON.parse(this.lstBaiTestRutGon.json);
        this.isLoading = false;
    })
  }
}
