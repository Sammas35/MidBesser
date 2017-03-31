import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FaehigkeitenComponent} from "../faehigkeiten/faehigkeiten.component";
import {WaffenComponent} from "../waffen/waffen.component";
import {ZauberComponent} from "../zauber/zauber.component";
import {CharlistComponent} from "../charlist/charlist.component";

const routes: Routes = [
  { path: '', redirectTo: '/charlist', pathMatch: 'full' },
  { path: 'charlist',  component: CharlistComponent },
  { path: 'faehigkeiten',  component: FaehigkeitenComponent },
  { path: 'waffen', component: WaffenComponent },
  { path: 'zauber',     component: ZauberComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
