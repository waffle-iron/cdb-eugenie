import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';
import './rxjs-extensions';
import { AUTH_PROVIDERS }      from 'angular2-jwt';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

import { CmpComponent } from './app.component';
import { HeroesComponent } from './team/heroes.component';
import { HeroDetailComponent } from './team/hero-detail.component';
import { HeroService } from './services/hero.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './team/hero-search.component';
import { UserProfileComponent }   from './user/user-profile.component';
import { HighlightDirective } from './directives/highlight.directive';
import { MdlUpgradeElementDirective } from './directives/mdl-upgrade-element.directive';
import { AuthService } from './services/auth.service';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
    ,MaterialModule.forRoot()
    //, InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    CmpComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    HighlightDirective,
    UserProfileComponent,
    MdlUpgradeElementDirective
  ],
  bootstrap: [CmpComponent],
  providers: [
    HeroService,
    AUTH_PROVIDERS,
    AuthService
    ]
})
export class CmpModule {

}
