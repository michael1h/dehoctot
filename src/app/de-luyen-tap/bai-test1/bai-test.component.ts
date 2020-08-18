import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { Router, NavigationExtras } from '@angular/router';
import { URLAPI } from 'src/app/constant';
import { HTTP } from '@ionic-native/http/ngx';
import { IonContent, NavController } from '@ionic/angular';
import { trigger, style, animate, transition } from "@angular/animations";

export const fadeInOut = (name = "fadeInOut", duration = 0.1) =>
  trigger(name, [
    transition(":enter", [
      style({ opacity: 0 }),
      animate(`${duration}s ease-in-out`)
    ]),
    transition(":leave", [
      animate(`${duration}s ease-in-out`, style({ opacity: 0 }))
    ])
  ]);
@Component({
  selector: "app-bai-test",
  templateUrl: "./bai-test.component.html",
  styleUrls: ["./bai-test.component.scss"],
  animations: [
    fadeInOut("fadeInOut-1", 0.3),
    fadeInOut("fadeInOut-2", 0.7),
    fadeInOut("fadeInOut-3", 1)
  ]
})

export class BaiTest1Component implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private modalService: BsModalService,
    private http: HTTP,
    private navCtrl: NavController,
  ) {

  }

  baiTests: any;
  modalRef: BsModalRef;
  mp3: any;
  show: boolean;
  image: any; 
  goiY: any;
  selectedItem: any;
  checkOpenModalNextCauHoi: boolean = false;
  checkOpenModalOrNextCauHoi: boolean = false;
  checkKiemTraCauHoi: any;
  checkCauTiepTheo: any;
  indexCauHoi: number = 0;
  checkPlayMp3: number = 0;
  giaiThich: any;
  cauDung: any;
  checkGiaiThich: boolean = false;
  showCorrect: any;
  showInCorrect: any;
  isLoading = false;
  totalCorrect: number = 0;
  checkGoiY: boolean = false;
  checkUserChooseAnswer: boolean = true;

  intervalId: number = 0;
  seconds: number = 0;
  minute: number = 0;
  hours: number = 0;
  @ViewChild(IonContent, {static: true}) content: IonContent;

  @ViewChild('stream') audioPlayerRef: ElementRef;

  scrollToTop() {
    this.content.scrollToTop(0);
  }

  backButton() {
    this.router.navigateByUrl('/');
  }
  
  clearTimer(): void {
    clearInterval(this.intervalId);
  }

  private countDown(): void {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds += 1;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minute += 1; 
        if(this.minute == 60) {
          this.hours += 1;
          this.minute = 0;
        }
      } else {
        if (this.seconds < 0) {
          this.seconds = 0;
        } // reset
      }
    }, 1000);
  }

  openModal(template: TemplateRef<any>) {
    this.checkOpenModalNextCauHoi = true;
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: "static",
      class: 'custom-class-modal'
    });
  }
  
  load(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), 2000);
  }

  async wait(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  start() {
    this.isLoading = true;
    this.wait(500).then(() => (this.isLoading = false));
  }

  ngOnDestroy() {
    this.clearTimer();
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  ngOnInit() {
    this.isLoading = true;
    this.http.get(URLAPI + 'part2', {}, {}).then(data => {
      this.baiTests = JSON.parse(data.data);
      if (this.baiTests) {
        this.countDown();
        this.mp3 = this.baiTests.listen.listening[this.indexCauHoi].srcMp3;
        this.image = this.baiTests.listen.listening[this.indexCauHoi].linkImage;
        this.goiY = this.baiTests.listen.listening[
          this.indexCauHoi
        ].listQuestion[0].goiY;
        this.giaiThich = this.baiTests.listen.listening[
          this.indexCauHoi
        ].listQuestion[0].giaiThich;
        this.cauDung = this.baiTests.listen.listening[
          this.indexCauHoi
        ].listQuestion[0].cauDung;
        this.checkCauTiepTheo = true;
        this.showCorrect = false;
        this.isLoading = false;
      }
    });
  }

  items: RadioButtonItem[] = [
    { name: "A", value: "a" },
    { name: "B", value: "b" },
    { name: "C", value: "c" }
  ];

  nextCauHoi() {
    this.scrollToTop();
    this.selectedItem1 = "";
    this.checkOpenModalOrNextCauHoi = false;
    this.checkUserChooseAnswer = true;
    this.checkGiaiThich = false;
    this.checkGoiY = false;
    if (this.checkOpenModalNextCauHoi) {
      this.modalRef.hide();
    }
    this.checkOpenModalNextCauHoi = false;

    if (this.indexCauHoi < 5) { //5
      if (this.selectedItem) {
        this.indexCauHoi += 1;
        this.mp3 = this.baiTests.listen.listening[this.indexCauHoi].srcMp3;
        this.image = this.baiTests.listen.listening[this.indexCauHoi].linkImage;
        this.goiY = this.baiTests.listen.listening[
          this.indexCauHoi
        ].listQuestion[0].goiY;
        this.giaiThich = this.baiTests.listen.listening[ 
          this.indexCauHoi
        ].listQuestion[0].giaiThich;
        this.selectedItem = "";
        this.checkCauTiepTheo = true;
        this.checkKiemTraCauHoi = false;
        this.show = false;
        this.showCorrect = false;
        this.showInCorrect = false;
        this.cauDung = this.baiTests.listen.listening[
          this.indexCauHoi
        ].listQuestion[0].cauDung;
      } else {
        this.indexCauHoi += 1;
        this.mp3 = this.baiTests.listen.listening[this.indexCauHoi].srcMp3;
        this.image = this.baiTests.listen.listening[this.indexCauHoi].linkImage;
        this.goiY = this.baiTests.listen.listening[
          this.indexCauHoi
        ].listQuestion[0].goiY;
        this.giaiThich = this.baiTests.listen.listening[ 
          this.indexCauHoi
        ].listQuestion[0].giaiThich;
        this.selectedItem = "";
        this.checkCauTiepTheo = true;
        this.checkKiemTraCauHoi = false;
        this.show = false;
        this.showCorrect = false;
        this.showInCorrect = false;
        this.cauDung = this.baiTests.listen.listening[
          this.indexCauHoi
        ].listQuestion[0].cauDung;
      }
    } else {
      this.audioPlayerRef.nativeElement.src = '';
      let navigationExtras: NavigationExtras = {
        queryParams: {
          score: this.score,
          hours: this.hours,
          minute: this.minute,
          seconds: this.seconds,
          totalCorrect: this.totalCorrect,
          url: '/tabs/tab1',
          totalQuestion: 6
        }
    };
    this.navCtrl.navigateForward(['ket-qua-bai-thi'], navigationExtras);
      // this.router.navigate(['/ket-qua-bai-thi'], {
      //   state: { 
      //     score: this.score,
      //     hours: this.hours,
      //     minute: this.minute,
      //     seconds: this.seconds,
      //     totalCorrect: this.totalCorrect,
      //     part: '/',
      //     totalQuestion: 6
      //     }
      // });
    }
  }
  checkTongKet: boolean = false;
  selectedItem1: any;
  score: number = 0;
  kiemTra() {
    this.checkUserChooseAnswer = false;
    this.checkCauTiepTheo = false;
    this.checkGoiY = true;
    this.show = false;
    this.selectedItem1 = this.selectedItem;
    const dapAnDung = this.baiTests.listen.listening[this.indexCauHoi]
      .listQuestion[0].cauDung;
    if (this.selectedItem == dapAnDung) {
      this.score += 100/6;
      this.showCorrect = true;
      this.selectedItem = "";
      this.totalCorrect += 1;
    } else {
      this.showInCorrect = true;
      this.selectedItem = "";
    }
    setTimeout(() => this.removeAlert(), 1000);
  }

  clickGoiY() {
    this.show = !this.show;
  }

  clickXemLoiGiai() {
    this.checkGiaiThich = !this.checkGiaiThich;
  }

  removeAlert() {
    this.showCorrect = false;
    this.showInCorrect = false;
  }
}

export interface RadioButtonItem {
  name: string;
  value: string;
}