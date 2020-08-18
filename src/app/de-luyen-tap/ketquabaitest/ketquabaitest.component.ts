import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from '@ionic/angular';

@Component({
  templateUrl: "./ketquabaitest.component.html",
  styleUrls: ["./ketquabaitest.component.css"]
})
export class KetQuaBaiTestComponent implements OnInit {
  score: number = 0;
  hours: number = 0;
  minute: number = 0;
  seconds: number = 0;
  trungBinh1Cau : number = 0;
  totalTime : number = 0;
  totalCorrect: number = 0;
  url: string;
  isLoading = false;
  totalQuestion: number = 0;
  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute
    ) {
  }

  redirectPage() {
    this.navCtrl.navigateForward(this.url);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.score = params["score"];
      this.hours = params["hours"];
      this.minute = params["minute"];
      this.seconds = params["seconds"];
      this.totalCorrect = params["totalCorrect"];
      this.url = params["url"];
      this.totalQuestion = params["totalQuestion"];

      var x = this.seconds;
      var giay: number = +x;

      var y = this.minute;
      var phut: number = +y;

      var z = this.hours;
      var gio: number = +z;

      this.trungBinh1Cau = (giay + (phut * 60) + ((gio * 60) * 60))/this.totalQuestion;
      this.totalTime = (giay + (phut * 60) + ((gio * 60) * 60));
    });
  }
}
