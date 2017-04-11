import {AppComponent} from "../app.component";
import {AppRoutingModule} from "../app-routing/app-routing.module";
import {FormsModule} from "@angular/forms";
import {APP_BASE_HREF} from "@angular/common";
import {CharakterDetailComponent} from "../charakter-detail/charakter-detail.component";
import {CharlistComponent} from "../charlist/charlist.component";
import {FaehigkeitenComponent} from "../faehigkeiten/faehigkeiten.component";
import {WaffenComponent} from "../waffen/waffen.component";
import {ZauberComponent} from "../zauber/zauber.component";
import {CharService} from "../charservice/char.service";
import {DomainService} from "../domainservice/domain.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {Charakter} from "../domain/charakter";

export const TEST_CONFIG = {
    declarations: [AppComponent,
        CharakterDetailComponent,
        CharlistComponent,
        FaehigkeitenComponent,
        WaffenComponent,
        ZauberComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        CharService,
        DomainService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
};