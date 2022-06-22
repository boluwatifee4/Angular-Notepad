import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AuthComponent } from './layout/auth/auth.component';
import { PagesComponent } from './layout/pages/pages.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { CreateNoteComponent } from './views/pages/create-note/create-note.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ViewNotesComponent } from './views/pages/view-notes/view-notes.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthGuard } from './guards/auth.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import { PickerModule } from '@ctrl/ngx-emoji-mart';
// import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PagesComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CreateNoteComponent,
    ViewNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    // PickerModule,
    // MatSidenavModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor ,
      multi: true
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
