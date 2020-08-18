import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BaiTestRutGonComponent } from './de-thi-rut-gon/bai-test/short-test';
import { KetQuaBaiTestComponent } from './de-luyen-tap/ketquabaitest/ketquabaitest.component';
import { BaiTestComponent } from './de-luyen-tap/bai-test/bai-test.component';
import { BaiTest1Component } from './de-luyen-tap/bai-test1/bai-test.component';
import { BaiTest2Component } from './de-luyen-tap/bai-test2/bai-test.component';
import { BaiTestReading1Component } from './de-luyen-tap/reading-1/bai-test.component';
import { BaiTestReading2Component } from './de-luyen-tap/reading-2/bai-test.component';
import { BaiTestReading3Component } from './de-luyen-tap/reading-3/bai-test.component';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';
import { PolicyComponent } from './shared/policy/policy.component';
import { FullTestComponent } from './de-thi-rut-gon/bai-test/full-test';
import { MeoThiComponent } from './meo-thi/meo-thi.component';

const routes: Routes = [
  { path: '', redirectTo: '/tabs/tab1', pathMatch: 'full' },
  { path: 'tabs/tab1', component: Tab1Page },
  { path: 'tabs/tab2', component: Tab2Page },
  { path: 'tabs/tab3', component: Tab3Page },
  { path: 'mini-test/:name/:type', component: BaiTestRutGonComponent },
  { path: 'full-test/:name', component: FullTestComponent },
  { path: 'ket-qua-bai-thi', component: KetQuaBaiTestComponent },
  { path: 'bai-test-rut-gon-part-1', component: BaiTestComponent },
  { path: 'bai-test-rut-gon-part-2', component: BaiTest1Component },
  { path: 'bai-test-rut-gon-part/:id', component: BaiTest2Component },
  { path: 'bai-test-rut-gon-part-5', component: BaiTestReading1Component },
  { path: 'bai-test-rut-gon-part-6', component: BaiTestReading2Component },
  { path: 'bai-test-rut-gon-part-7/:id', component: BaiTestReading3Component },
  { path: 'policy', component: PolicyComponent },
  { path: 'meo-thi/:key', component: MeoThiComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
