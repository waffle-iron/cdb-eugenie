"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_routing_1 = require('./app.routing');
var http_1 = require('@angular/http');
require('./rxjs-extensions');
// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';
var app_component_1 = require('./app.component');
var heroes_component_1 = require('./team/heroes.component');
var hero_detail_component_1 = require('./team/hero-detail.component');
var hero_service_1 = require('./services/hero.service');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var hero_search_component_1 = require('./team/hero-search.component');
var highlight_directive_1 = require('./directives/highlight.directive');
var CmpModule = (function () {
    function CmpModule() {
    }
    CmpModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.routing,
                http_1.HttpModule
            ],
            declarations: [
                app_component_1.CmpComponent,
                dashboard_component_1.DashboardComponent,
                heroes_component_1.HeroesComponent,
                hero_detail_component_1.HeroDetailComponent,
                hero_search_component_1.HeroSearchComponent,
                highlight_directive_1.HighlightDirective
            ],
            bootstrap: [app_component_1.CmpComponent],
            providers: [hero_service_1.HeroService]
        }), 
        __metadata('design:paramtypes', [])
    ], CmpModule);
    return CmpModule;
}());
exports.CmpModule = CmpModule;
//# sourceMappingURL=app.module.js.map