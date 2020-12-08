import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptylayoutComponent } from "./emptylayout/emptylayout.component";
import { LoginComponent } from "./login/login.component";
import { MainlayoutComponent } from "./mainlayout/mainlayout.component";
import { HomeComponent } from "./home/home.component";
import { ChatComponent } from "./chat/chat.component";
import { RegComponent } from "./reg/reg.component";

const routes: Routes = [
  {
    path: 'login',
    component: EmptylayoutComponent,
    children: [
      {
        path: '', component:LoginComponent
      }
    ]
  },
  {
    path: 'reg',
    component: EmptylayoutComponent,
    children: [
      {
        path: '', component:RegComponent
      }
    ]
  },
  {
    path: 'home',
    component: MainlayoutComponent,
    children: [
      {
        path: '', component: HomeComponent
      }
    ]
  },
  {
    path: 'chat',
    component: MainlayoutComponent,
    children: [
      {
        path: '', component: ChatComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
