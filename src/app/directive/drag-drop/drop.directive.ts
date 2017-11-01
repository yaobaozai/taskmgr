<<<<<<< HEAD
import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
=======
import { Directive, HostListener, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { DragDropService, DragData } from '../drag-drop.service';
>>>>>>> ee3d4143277ba55e2e4c318d966e1d6bf29ff5e4

@Directive({
  selector: '[app-droppable][dropTags][dragEnterClass]'
})
export class DropDirective {

<<<<<<< HEAD
  constructor(private el: ElementRef, private rd: Renderer2) { }

  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event) {
    if(this.el.nativeElement === ev.target){
      this.rd.addClass(this.el.nativeElement, this.draggedClass);
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd (ev: Event) {
    if(this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }
=======
  @Output() dropped = new EventEmitter<DragData>();
  @Input() dragEnterClass: string;
  @Input() dropTags: string[] = [];
  private data$;

  constructor(
    private el: ElementRef, 
    private rd: Renderer2, 
    private service: DragDropService) {
      this.data$ = this.service.getDragData().take(1);
    }

  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.addClass(this.el.nativeElement, this.dragEnterClass); 
        }
      }) 
      
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.setProperty(ev, 'dataTransfer.effectAllowed', 'all');
          this.rd.setProperty(ev, 'dataTransfer.dropEffect', 'move');
        } else {
          this.rd.setProperty(ev, 'dataTransfer.effectAllowed', 'none');
          this.rd.setProperty(ev, 'dataTransfer.dropEffect', 'none');
        }
      })
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
      this.data$.subscribe(dragData => {
        if(this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
        }
      })
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(ev:Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if(this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
          this.dropped.emit(dragData);
          this.service.clearDragData();
        }
      })
    }    
  }
>>>>>>> ee3d4143277ba55e2e4c318d966e1d6bf29ff5e4

}
