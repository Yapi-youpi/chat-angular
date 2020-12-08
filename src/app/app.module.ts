import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  AngularFirestoreDocument,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { HeaderComponent } from './header/header.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { EmptylayoutComponent } from './emptylayout/emptylayout.component';
import { FooterComponent } from './footer/footer.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { RegComponent } from './reg/reg.component';
import { ChatService } from './shared/services/chat.service';
import { ChatComponent } from './chat/chat.component';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainlayoutComponent,
    EmptylayoutComponent,
    LoginComponent,
    HomeComponent,
    ChatComponent,
    FooterComponent,
    RegComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment),
    FormsModule,
    AngularFireFunctionsModule,
  ],
  providers: [AuthService, AuthGuard, ChatService],
  bootstrap: [AppComponent],
})
export class AppModule {
  private itemDoc: AngularFirestoreDocument<any>;
}
