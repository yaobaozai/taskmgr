import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { MdToolbarModule, MdIconModule, MdButtonModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { loadSvgResources } from '../utils/svg.util';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule
  ],
  declarations: [HeaderComponent,
     SidebarComponent,
     FooterComponent
    ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MdIconRegistry,
    ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error("模块已经存在，不能再次")
    }
    loadSvgResources(ir, ds);
  }
}
