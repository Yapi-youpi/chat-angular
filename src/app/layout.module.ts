import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { MainlayoutComponent} from "./mainlayout/mainlayout.component";
import { EmptylayoutComponent } from "./emptylayout/emptylayout.component";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout'


@NgModule({
  declarations: [
    HeaderComponent,
    EmptylayoutComponent,
    MainlayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FlexLayoutModule
  ],
  exports: [MainlayoutComponent]
})
export class LayoutModule { }
