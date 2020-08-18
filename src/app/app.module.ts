import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaiTestRutGonComponent } from './de-thi-rut-gon/bai-test/short-test';
import { LoadingComponent } from './shared/loading/loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BaiTestComponent } from './de-luyen-tap/bai-test/bai-test.component';
import { BaiTest1Component } from './de-luyen-tap/bai-test1/bai-test.component';
import { BaiTest2Component } from './de-luyen-tap/bai-test2/bai-test.component';
import { RadioButtonComponent } from './shared/radio-button/radio-button.component';
import { ModalModule } from 'ngx-bootstrap';
import { KetQuaBaiTestComponent } from './de-luyen-tap/ketquabaitest/ketquabaitest.component';
import { BaiTestReading1Component } from './de-luyen-tap/reading-1/bai-test.component';
import { BaiTestReading2Component } from './de-luyen-tap/reading-2/bai-test.component';
import { BaiTestReading3Component } from './de-luyen-tap/reading-3/bai-test.component';
import { HTTP } from '@ionic-native/http/ngx';
import { ComponentsModule } from './components/components.module';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';
import { PolicyComponent } from './shared/policy/policy.component';
import { FullTestComponent } from './de-thi-rut-gon/bai-test/full-test';
import { MeoThiComponent } from './meo-thi/meo-thi.component';

@NgModule({
  declarations: [
    AppComponent,
    KetQuaBaiTestComponent,
    BaiTestReading1Component,
    BaiTestReading2Component,
    BaiTestReading3Component,
    BaiTestRutGonComponent,
    BaiTest1Component,
    BaiTest2Component,
    MeoThiComponent,
    LoadingComponent,
    RadioButtonComponent,
    FullTestComponent,
    BaiTestComponent,
    Tab1Page,
    Tab2Page,
    Tab3Page,
    PolicyComponent
  ],
  entryComponents: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule, 
    ComponentsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    StatusBar, HTTP,
        SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(library: FaIconLibrary) {
  //   library.addIcons(faTrashAlt, faCheckSquare, faSquare, faAngleDoubleRight, faEnvelopeOpen);
  // }
}