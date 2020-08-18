import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
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
  styleUrls: ["../bai-test1/bai-test.component.scss"],
  animations: [
    fadeInOut("fadeInOut-1", 0.3),
    fadeInOut("fadeInOut-2", 0.7),
    fadeInOut("fadeInOut-3", 1)
  ]
})
export class BaiTest2Component implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private modalService: BsModalService,
    private http: HTTP,
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) {
  }
  
  baiTests: any;
  transcriptAudio: any;
  selectedItemChoose0: any = '';
  selectedItemChoose1: any = '';
  selectedItemChoose2: any = '';
  selectedItem0: any;
  selectedItem2: any;
  modalRef: BsModalRef;
  mp3: any;
  show: boolean;
  image: any;
  goiY: any;
  selectedItem: any;
  checkOpenModalNextCauHoi: boolean = false;
  checkOpenModalOrNextCauHoi: boolean = false;
  checkKiemTraCauHoi: any;
  checkCauTiepTheo: boolean = false;
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
  checkTongKet: boolean = false;
  selectedItem1: any;
  score: number = 0;
  intervalId: number = 0;
  seconds: number = 0;
  minute: number = 0;
  hours: number = 0;
  arrayQuestionAnswer = [];
  totalCau: number = 3;

  type: number = 0;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  @ViewChild('stream') audioPlayerRef: ElementRef;

  scrollToTop() {
    this.content.scrollToTop(0);
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

  backButton() {
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.clearTimer();
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  onChane(event) {
    const index = event.substring(0, 1);
    const dapAn = event.substring(1, 2);
    if (index == 0) {
      this.selectedItemChoose0 = dapAn;
    } else if (index == 1) {
      this.selectedItemChoose1 = dapAn;
    } else if (index == 2) {
      this.selectedItemChoose2 = dapAn;
    }
  }

  ngOnInit() {
    this.isLoading = true;
    let id = this.route.snapshot.paramMap.get('id');
    if (id == '3') {
      this.type = 0;
      this.http.get(URLAPI + 'part3', {}, {}).then(data => {
        this.baiTests = JSON.parse(data.data);
        if (this.baiTests) {
          this.getDetail();
          this.isLoading = false;
          this.checkCauTiepTheo = true;
          this.showCorrect = false;
          this.countDown();
        }
      });
    } else if (id == '4') {
      this.type = 1;
      this.http.get(URLAPI + 'part4', {}, {}).then(data => {
        this.baiTests = JSON.parse(data.data);
        if (this.baiTests) {
          this.getDetail();
          this.isLoading = false;
          this.checkCauTiepTheo = true;
          this.showCorrect = false;
          this.countDown();
        }
      });
    }
  }

  

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
    if (this.indexCauHoi < this.totalCau) {
        this.indexCauHoi += 1;
        this.getDetail();
        this.checkCauTiepTheo = true;
        this.checkKiemTraCauHoi = false;
        this.show = false;
        this.showCorrect = false;
        this.showInCorrect = false;
        this.selectedItemChoose0 = "";
        this.selectedItemChoose1 = "";
        this.selectedItemChoose2 = "";
    } else {
      this.audioPlayerRef.nativeElement.src = '';
      let id = this.route.snapshot.paramMap.get('id');
      let navigationExtras: NavigationExtras = {
        queryParams: {
          score: this.score,
          hours: this.hours,
          minute: this.minute,
          seconds: this.seconds,
          totalCorrect: this.totalCorrect,
          url: '/tabs/tab1',
          totalQuestion: this.totalCau + 1
        }
      };
      if (id == '3') {
      this.navCtrl.navigateForward(['ket-qua-bai-thi'], navigationExtras);
      
        // this.router.navigate(['/ket-qua-bai-thi'], {
        //   state: { 
        //     score: this.score,
        //     hours: this.hours,
        //     minute: this.minute,
        //     seconds: this.seconds,
        //     totalCorrect: this.totalCorrect,
        //     url: '/',
        //     totalQuestion: this.totalCau + 1
        //     }
        // });
      } else if (id == '4') {
        
        this.navCtrl.navigateForward(['ket-qua-bai-thi'], navigationExtras);

        // this.router.navigate(['/ket-qua-bai-thi'], {
        //   state: { 
        //     score: this.score,
        //     hours: this.hours,
        //     minute: this.minute,
        //     seconds: this.seconds,
        //     totalCorrect: this.totalCorrect,
        //     part: '/',
        //     totalQuestion: this.totalCau + 1
        //     }
        // });
      }
      
    }
  }

  getDetail() {
    this.mp3 = this.baiTests.listen.listening[this.indexCauHoi].srcMp3;
    this.image = this.baiTests.listen.listening[this.indexCauHoi].linkImage;
    this.goiY = this.baiTests.listen.listening[
      this.indexCauHoi
    ].listQuestion[0].goiY;
    this.transcriptAudio = this.baiTests.listen.listening[this.indexCauHoi].transcript;
    this.giaiThich = this.baiTests.listen.listening[ 
      this.indexCauHoi
    ].listQuestion[0].giaiThich;
    this.arrayQuestionAnswer = this.baiTests.listen.listening[
      this.indexCauHoi
    ].listQuestion;
  }

  isVisible(event){
    const index = event.substring(0, 1);
    const dapAn = event.substring(1, 2);
    if (index == 0) {
      if (dapAn == this.selectedItem0) {
        return true;
      } else {
        return false;
      }
      
    } else if (index == 1) {
      if (dapAn == this.selectedItem1) {
        return true;
      } else {
        return false;
      }
    } else if (index == 2) {
      if (dapAn == this.selectedItem2) {
        return true;
      } else {
        return false;
      }
    }
    return false; 
  }
  
  kiemTra() {
    this.checkUserChooseAnswer = false;
    this.checkCauTiepTheo = false;
    this.checkGoiY = true;
    this.show = false;
    this.selectedItem0 = this.selectedItemChoose0;
    this.selectedItem1 = this.selectedItemChoose1;
    this.selectedItem2 = this.selectedItemChoose2;
    const dapAnDung0 = this.baiTests.listen.listening[this.indexCauHoi]
      .listQuestion[0].cauDung;
    const dapAnDung1 = this.baiTests.listen.listening[this.indexCauHoi]
    .listQuestion[1].cauDung;
    const dapAnDung2 = this.baiTests.listen.listening[this.indexCauHoi]
    .listQuestion[2].cauDung;
    if (this.selectedItemChoose0 == dapAnDung0) {
      this.score += 100/12;
    }
    if (this.selectedItemChoose1 == dapAnDung1) {
      this.score += 100/12;
    }  
    if (this.selectedItemChoose2 == dapAnDung2) {
      this.score += 100/12;
    }
    if (this.selectedItemChoose0 == dapAnDung0 && this.selectedItemChoose1 == dapAnDung1 && this.selectedItemChoose2 == dapAnDung2) {
      this.showCorrect = true;
      this.totalCorrect += 1;
    } else {
      this.showInCorrect = true;
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