import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FaehigkeitenComponent} from "../faehigkeiten/faehigkeiten.component";
import {WaffenComponent} from "../waffen/waffen.component";
import {ZauberComponent} from "../zauber/zauber.component";

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'faehigkeiten',  component: FaehigkeitenComponent },
  { path: 'waffen', component: WaffenComponent },
  { path: 'zauber',     component: ZauberComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
