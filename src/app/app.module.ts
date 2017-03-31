import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {CharlistComponent} from './charlist/charlist.component';
import {CharakterDetailComponent} from './charakter-detail/charakter-detail.component';
import {FaehigkeitenComponent} from './faehigkeiten/faehigkeiten.component';
import {WaffenComponent} from './waffen/waffen.component';
import {ZauberComponent} from './zauber/zauber.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {DomainService} from "./domainservice/domain.service";
import {CharService} from "./charservice/char.service";

@NgModule({
    declarations: [
        AppComponent,
        CharlistComponent,
        CharakterDetailComponent,
        FaehigkeitenComponent,
        WaffenComponent,
        ZauberComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        RouterModule
    ],
    providers: [DomainService, CharService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
