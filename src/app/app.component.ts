import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';
import { Platform, IonRouterOutlet, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
const { AdMob } = Plugins;
import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed } from '@capacitor/core';
  
  const { PushNotifications } = Plugins;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{

    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
    public pageList = [
        {
            iconName: 'home-outline', displayText: 'Đề luyện tập', expanded: false, hasChild: true, url: '/tabs/tab1',
            // subOptions: [ 
            //     {iconName: 'home', displayText: 'Home', url: '/tabs/tab2'},
            // ]
        },
        {
            iconName: 'document-text-outline', displayText: 'Đề thi rút gọn', expanded: false, hasChild: true, url: '/tabs/tab2',
        },
        {
            iconName: 'documents-outline', displayText: 'Đề thi đầy đủ', expanded: false, hasChild: true, url: '/tabs/tab3',
        },
        {
            iconName: 'calendar-outline', displayText: 'Chính sách bảo mật', expanded: false, hasChild: true, url: '/policy',
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router,
        private nav: NavController
    ) {
        this.initializeApp();
    }

    ngOnInit() {
        // console.log('Initializing HomePage');
    
        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        PushNotifications.requestPermission().then( result => {
          if (result.granted) {
            // Register with Apple / Google to receive push via APNS/FCM
            PushNotifications.register();
          } else {
            // Show some error
          }
        });
    
        PushNotifications.addListener('registration',
          (token: PushNotificationToken) => {
            // alert('Push registration success, token: ' + token.value);
          }
        );
    
        PushNotifications.addListener('registrationError',
          (error: any) => {
            // alert('Error on registration: ' + JSON.stringify(error));
          }
        );
    
        PushNotifications.addListener('pushNotificationReceived',
          (notification: PushNotification) => {
            // alert('Push received: ' + JSON.stringify(notification));
          }
        );
    
        PushNotifications.addListener('pushNotificationActionPerformed',
          (notification: PushNotificationActionPerformed) => {
            // alert('Push action performed: ' + JSON.stringify(notification));
          }
        );
      }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
            AdMob.initialize();
            this.platform.backButton.subscribeWithPriority(999,() => {
                switch(this.router.url) {
                    case '/ket-qua-bai-thi' : {
                        break;
                    }
                    case '/tabs/tab1' : {
                        navigator['app'].exitApp();
                        break;
                    }
                    case '/tabs/tab2' : {
                        navigator['app'].exitApp();
                        break;
                    }
                    case '/tabs/tab3' : {
                        navigator['app'].exitApp();
                        break;
                    }
                    default : {
                        this.nav.back();
                        // this.nav.pop();
                    }
                }
            }); 
        });
    }
}
