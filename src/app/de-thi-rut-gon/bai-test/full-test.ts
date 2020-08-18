import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { trigger, style, animate, transition } from "@angular/animations";
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { URLAPI } from 'src/app/constant';
import { HTTP } from '@ionic-native/http/ngx';
import { IonContent, NavController } from '@ionic/angular';

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
export class FullTestComponent implements OnInit, OnDestroy {
  
  constructor(
    private router: Router,
    private modalService: BsModalService,
    private http: HTTP,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    ) {

  }

  selectedItemChoose0: any = '';
  selectedItemChoose1: any = '';
  selectedItemChoose2: any = '';
  selectedItemChoose3: any = '';
  selectedItemChoose4: any = '';
  typeBack: number;
  url: any;
  selectedItem0: any;
  selectedItem1: any;
  selectedItem2: any;
  selectedItem3: any;
  selectedItem4: any;
  cauHoi1: any;
  cauHoi2: any;
  cauHoi3: any;
  dichDoanVan3: any;
  dichDoanVan2: any;
  dichDoanVan1: any;
  randomClassCauHoi2: string;
  randomClassCauHoi3: string;
  randomClassCauHoi1: string;
  baiTests: any;
  modalRef: BsModalRef;
  show: boolean;
  goiY: any;
  checkOpenModalNextCauHoi: boolean = false;
  checkCauTiepTheo: boolean = false;
  indexCauHoi: number = 0;
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
  totalCauHoi: number = 0;
  totalCau: number = 0;
  score: number = 0;
  intervalId: number = 0;
  seconds: number = 0;
  minute: number = 0;
  hours: number = 0;
  arrayQuestionAnswer = [];
  image: any;
  srcMp3: any;
  typeListen: number = 0;
  transcript: any;
  selectedItem: any;
  items: RadioButtonItem[] = [];
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
    setTimeout(() => (this.isLoading = false), 1000);
  }

  async wait(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  start() {
    this.isLoading = true;
    this.wait(500).then(() => (this.isLoading = false));
  }

  backButton() {
      this.router.navigateByUrl('/tabs/tab3');
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
    } else if (index == 3) {
      this.selectedItemChoose3 = dapAn;
    } else if (index == 4) {
      this.selectedItemChoose4 = dapAn;
    }
  }

  ngOnInit() {
    this.showCorrect = false;
    this.checkCauTiepTheo = true;
    this.randomClassCauHoi1 = Math.floor((Math.random() * 5) + 1).toString();
    this.randomClassCauHoi2 = Math.floor((Math.random() * 5) + 1).toString();
    this.randomClassCauHoi3 = Math.floor((Math.random() * 5) + 1).toString();
    let name = this.route.snapshot.paramMap.get('name');
    const type = this.route.snapshot.paramMap.get('type');
      this.isLoading = true;
      this.http.get(URLAPI + 'full-test/' + name, {}, {}).then(data => {
        this.baiTests = JSON.parse(data.data);
        this.typeBack = 1;
        this.getDetail();
        if (this.baiTests) {
          this.totalCau = this.baiTests.obj.toeic.length;
          for (let index = 0; index < this.totalCau; index++) {
            const e = this.baiTests.obj.toeic[index].listQuestion.length;
            this.totalCauHoi += e;
          }
          this.countDown();
          this.isLoading = false;
        }
      });
  }

  nextCauHoi() {
    this.scrollToTop();
    this.checkGiaiThich = false;
    this.randomClassCauHoi1 = Math.floor((Math.random() * 5) + 1).toString();
    this.randomClassCauHoi2 = Math.floor((Math.random() * 5) + 1).toString();
    this.randomClassCauHoi3 = Math.floor((Math.random() * 5) + 1).toString();
    this.checkUserChooseAnswer = true;
    this.checkGoiY = false;
    this.checkCauTiepTheo = true;
    if (this.checkOpenModalNextCauHoi) {
      this.modalRef.hide();
    }
    this.checkOpenModalNextCauHoi = false;

    if (this.indexCauHoi < this.totalCau - 1) {// this.totalCau - 1
        this.indexCauHoi += 1;
        this.getDetail();
        this.show = false;
        this.showCorrect = false;
        this.showInCorrect = false;
    } else {
      if (this.srcMp3) {
        this.audioPlayerRef.nativeElement.src = '';
      }
      let navigationExtras: NavigationExtras = {
        queryParams: {
          score: this.score,
          hours: this.hours,
          minute: this.minute,
          seconds: this.seconds,
          totalCorrect: this.totalCorrect,
          url: '/tabs/tab3',
          totalQuestion: this.totalCau
        }
      };
      this.navCtrl.navigateForward(['ket-qua-bai-thi'], navigationExtras);
    }
  }


  getDetail() {
    this.transcript = this.baiTests.obj.toeic[this.indexCauHoi].transcript;
    this.cauHoi1 = this.baiTests.obj.toeic[this.indexCauHoi].doanVan1;
    this.cauHoi2 = this.baiTests.obj.toeic[this.indexCauHoi].doanVan2;
    this.cauHoi3 = this.baiTests.obj.toeic[this.indexCauHoi].doanVan3;
    this.image = this.baiTests.obj.toeic[this.indexCauHoi].linkImage;
    this.srcMp3 = this.baiTests.obj.toeic[this.indexCauHoi].srcMp3;
    this.typeListen = this.baiTests.obj.toeic[this.indexCauHoi].typeListen;
    this.dichDoanVan1 = this.baiTests.obj.toeic[this.indexCauHoi].dichDoanVan1;
    this.dichDoanVan2 = this.baiTests.obj.toeic[this.indexCauHoi].dichDoanVan2;
    this.dichDoanVan3 = this.baiTests.obj.toeic[this.indexCauHoi].dichDoanVan3;
    if (this.typeListen == 1) {
      this.items = [
        { name: "A", value: "a" },
        { name: "B", value: "b" },
        { name: "C", value: "c" },
        { name: "D", value: "d" }
      ];
    } else if (this.typeListen == 2) {
      this.items = [
        { name: "A", value: "a" },
        { name: "B", value: "b" },
        { name: "C", value: "c" }
      ];
    } else if (this.typeListen == 5) {
      const cauA = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[0].cauA;
      const cauB = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[0].cauB;
      const cauC = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[0].cauC;
      const cauD = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[0].cauD;
      this.items = [
        { name: cauA, value: 'a' },
        { name: cauB, value: 'b' },
        { name: cauC, value: 'c' },
        { name: cauD, value: 'd' }
      ];
    }
    this.arrayQuestionAnswer = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion;
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
    } else if (index == 3) {
      if (dapAn == this.selectedItem3) {
        return true;
      } else {
        return false;
      }
    } else if (index == 4) {
      if (dapAn == this.selectedItem4) {
        return true;
      } else {
        return false;
      }
    }
    return false; 
  }

  total1CauHoi(total: number) {
    this.checkUserChooseAnswer = false;
    this.checkCauTiepTheo = false;
    this.selectedItem0 = this.selectedItem;
    const dapAnDung0 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[0].cauDung;
    if (this.selectedItem0 == dapAnDung0) {
      this.score += 100/total;
      this.showCorrect = true;
      this.totalCorrect += 1;
    } else {
      this.showInCorrect = true;
    }
    this.selectedItem = '';
  }

  total2CauHoi(total: number) {
    this.selectedItem0 = this.selectedItemChoose0;
    this.selectedItem1 = this.selectedItemChoose1;
    const dapAnDung0 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[0].cauDung;
    const dapAnDung1 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[1].cauDung;
    if (this.selectedItemChoose0 == dapAnDung0) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose1 == dapAnDung1) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose0 == dapAnDung0 && this.selectedItemChoose1 == dapAnDung1) {
      this.showCorrect = true;
      this.totalCorrect += 1;
    } else {
      this.showInCorrect = true;
    }
    this.selectedItemChoose0 = '';
    this.selectedItemChoose1 = '';
  }

  total3CauHoi(total: number) {
    this.selectedItem0 = this.selectedItemChoose0;
    this.selectedItem1 = this.selectedItemChoose1;
    this.selectedItem2 = this.selectedItemChoose2;
    const dapAnDung0 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[0].cauDung;
    const dapAnDung1 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[1].cauDung;
    const dapAnDung2 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[2].cauDung;
    if (this.selectedItemChoose0 == dapAnDung0) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose1 == dapAnDung1) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose2 == dapAnDung2) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose0 == dapAnDung0 && this.selectedItemChoose1 == dapAnDung1 
      && this.selectedItemChoose2 == dapAnDung2) {
      this.showCorrect = true;
      this.totalCorrect += 1;
    } else {
      this.showInCorrect = true;
    }
    this.selectedItemChoose0 = '';
    this.selectedItemChoose1 = '';
    this.selectedItemChoose2 = '';
  }

  total4CauHoi(total: number) {
    this.selectedItem0 = this.selectedItemChoose0;
    this.selectedItem1 = this.selectedItemChoose1;
    this.selectedItem2 = this.selectedItemChoose2;
    this.selectedItem3 = this.selectedItemChoose3;
    const dapAnDung0 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[0].cauDung;
    const dapAnDung1 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[1].cauDung;
    const dapAnDung2 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[2].cauDung;
    const dapAnDung3 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[3].cauDung;
    if (this.selectedItemChoose0 == dapAnDung0) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose1 == dapAnDung1) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose2 == dapAnDung2) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose3 == dapAnDung3) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose0 == dapAnDung0 && this.selectedItemChoose1 == dapAnDung1 
      && this.selectedItemChoose2 == dapAnDung2 && this.selectedItemChoose3 == dapAnDung3) {
      this.showCorrect = true;
      this.totalCorrect += 1;
    } else {
      this.showInCorrect = true;
    }
    this.selectedItemChoose0 = '';
    this.selectedItemChoose1 = '';
    this.selectedItemChoose2 = '';
    this.selectedItemChoose3 = '';
  }

  total5CauHoi(total: number) {
    this.selectedItem0 = this.selectedItemChoose0;
    this.selectedItem1 = this.selectedItemChoose1;
    this.selectedItem2 = this.selectedItemChoose2;
    this.selectedItem3 = this.selectedItemChoose3;
    this.selectedItem4 = this.selectedItemChoose4;
    const dapAnDung0 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[0].cauDung;
    const dapAnDung1 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[1].cauDung;
    const dapAnDung2 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[2].cauDung;
    const dapAnDung3 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[3].cauDung;
    const dapAnDung4 = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion[4].cauDung;
    if (this.selectedItemChoose0 == dapAnDung0) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose1 == dapAnDung1) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose2 == dapAnDung2) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose3 == dapAnDung3) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose4 == dapAnDung4) {
      this.score += 100/total;
    }
    if (this.selectedItemChoose0 == dapAnDung0 && this.selectedItemChoose1 == dapAnDung1 
      && this.selectedItemChoose2 == dapAnDung2 && this.selectedItemChoose3 == dapAnDung3
      && this.selectedItemChoose4 == dapAnDung4 ) {
      this.showCorrect = true;
      this.totalCorrect += 1;
    } else {
      this.showInCorrect = true;
    }
    this.selectedItemChoose0 = '';
    this.selectedItemChoose1 = '';
    this.selectedItemChoose2 = '';
    this.selectedItemChoose3 = '';
    this.selectedItemChoose4 = '';
  }
  // checkCauTiepTheo && selectedItemChoose0 && selectedItemChoose1 && selectedItemChoose2
  checkShowKiemTra(type: number) {
    if(type == 3 || type == 4) {
      if (this.checkCauTiepTheo && this.selectedItemChoose0 && this.selectedItemChoose1 && this.selectedItemChoose2) {
        return true;
      }
    } else if (type == 6) {
      if (this.checkCauTiepTheo && this.selectedItemChoose0 && this.selectedItemChoose1 && 
        this.selectedItemChoose2 && this.selectedItemChoose3) {
        return true;
      }
    }
    return false;
  }
  checkNextCauHoiType3(type: number) {
    if(type == 3 || type == 4) {
      if(!this.checkCauTiepTheo && (this.selectedItemChoose0 == '' || this.selectedItemChoose1 == '' 
      || this.selectedItemChoose2 == '')) {
        return true;
      }
    } else if (type == 6) {
      if(!this.checkCauTiepTheo && (this.selectedItemChoose0 == '' || this.selectedItemChoose1 == '' 
      || this.selectedItemChoose2 == '' || this.selectedItemChoose3 == '')) {
        return true;
      }
    }
    return false;
  }

  checkLam() {
    if (this.selectedItem) {
      return true;
    }
  }

  checkShowButtonKiemTraType7() {
    if (this.baiTests) {
      let totalCau = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion.length;
      switch (totalCau) {
        case 2:
            if (this.selectedItemChoose0 && this.selectedItemChoose1) {
              return true;
            } else {
              return false;
            }
        case 3:
            if (this.selectedItemChoose0 && this.selectedItemChoose1 && this.selectedItemChoose2) {
              return true;
            } else {
              return false;
            }
        case 4:
            if (this.selectedItemChoose0 
              && this.selectedItemChoose1 && this.selectedItemChoose2 && this.selectedItemChoose3) {
              return true;
            } else {
              return false;
            }
        case 5:
            if (this.selectedItemChoose0 
              && this.selectedItemChoose1 && this.selectedItemChoose2 
              && this.selectedItemChoose3 && this.selectedItemChoose4) {
              return true;
            } else {
              return false;
            }
      }
      return false;
    }
  }

  checkOpenModalType3(type: number) {
    if(type == 3 || type == 4) {
      if (this.checkCauTiepTheo && (this.selectedItemChoose0 == '' || this.selectedItemChoose1 == '' || this.selectedItemChoose2 == '')) {
        return true;
      }
    } else if (type == 6) {
      if (this.checkCauTiepTheo && (this.selectedItemChoose0 == '' || this.selectedItemChoose1 == '' 
      || this.selectedItemChoose2 == '' || this.selectedItemChoose3 == '')) {
        return true;
      }
    }
    return false;
  }

  checkNextCauHoi() {
    if (!this.checkCauTiepTheo && this.selectedItem == '') {
      return true;
    }
    return false;
  }

  checkOpenModal() {
    if (this.checkCauTiepTheo && !this.selectedItem) {
      return true;
    }
    return false;
  }

  
  kiemTra() {
    this.checkUserChooseAnswer = false;
    this.checkCauTiepTheo = false;
    this.checkGoiY = true;
    this.show = false;
    let total: number = 0;
    let totalCau = this.baiTests.obj.toeic[this.indexCauHoi].listQuestion.length;
    this.totalCau = this.baiTests.obj.toeic.length;
    for (let index = 0; index < this.totalCau; index++) {
      const e = this.baiTests.obj.toeic[index].listQuestion.length;
      total += e;
    }
    switch (totalCau) {
      case 1: 
          this.total1CauHoi(total);
          break;
      case 2:
          this.total2CauHoi(total);
          break;
      case 3:
          this.total3CauHoi(total);
          break;
      case 4:
        this.total4CauHoi(total);
        break;
      case 5:
        this.total5CauHoi(total);
        break;
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
