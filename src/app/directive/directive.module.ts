import { NgModule } from '@angular/core';
import { DropDirective } from './drag-drop/drop.directive';
import { DragDirective } from './drag-drop/drag.directive';
import { DragDropService } from './drag-drop.service';

@NgModule({
  declarations: [
    DropDirective, 
    DragDirective
  ],
  exports: [
    DragDirective,
    DropDirective
  ],
  providers: [
    DragDropService
  ]
})
export class DirectiveModule { }
