import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/material';
import { trigger, state, transition, style } from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('square', [state('green', style({'background-color': 'green'}))])
  ]
})
export class AppComponent {
  
  squareState: string;
  darkTheme = false;
  
  constructor(private oc: OverlayContainer) {

  }

  switchTheme(dark) {
    this.darkTheme = dark;
    this.oc.themeClass = dark ? 'myapp-dark-theme' : null;

  }
  
  onClick() {
    this.squareState = this.squareState ? null : 'green';
  }

}
