import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { meo1, meo2, meo3, meo4, meo5, meo6, meo7 } from '../data-full-test/data-full-test';
import { trigger, style, animate, transition } from "@angular/animations";
import { NavController } from '@ionic/angular';

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
    templateUrl: './meo-thi.html',
    styleUrls: ['./meo-thi.scss'],
    animations: [
      fadeInOut("fadeInOut-2", 0.7)
    ]
})
export class MeoThiComponent implements OnInit{
    
    content: any;
    constructor(
        private router: ActivatedRoute,
        // private platform: Platform,
        private nav: NavController,
    ) {
        // this.platform.backButton.subscribeWithPriority(112, () => {
        //     if (this.constructor.name == 'MeoThiComponent') {
        //     this.backButton();
        //     }
        // });
    }

    backButton() {
          this.nav.navigateRoot('/tabs/tab1');
    }
    ngOnInit() {
        const key = this.router.snapshot.paramMap.get('key');
        if (key == 'part1') {
            this.content = meo1;
            return;
        }
        if (key == 'part2') {
            this.content = meo2;
            return;
        }
        if (key == 'part3') {
            this.content = meo3;
            return;
        }
        if (key == 'part4') {
            this.content = meo4;
            return;
        }
        if (key == 'part5') {
            this.content = meo5;
            return;
        }
        if (key == 'part6') {
            this.content = meo6;
            return;
        }
        if (key == 'part7') {
            this.content = meo7;
            return;
        }
    }

}
