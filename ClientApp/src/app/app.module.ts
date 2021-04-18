import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LogsContainerComponent } from './logs-container/logs-container.component';
import { LogListComponent } from './logs-container/log-list/log-list.component';
import { LogSourcesComponent } from './logs-container/log-sources/log-sources.component';

import { HTTPService } from './http.service';
import { LoaderService } from './loader.service';
import { NotifyService } from './notify.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LogsContainerComponent,
    LogListComponent,
    LogSourcesComponent,
  ],
  imports: [
    BrowserModule,
    SnotifyModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    HTTPService,
    LoaderService,
    SnotifyService,
    NotifyService,
  ],
  exports: [SnotifyModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
