import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Userserv } from './services/userserv';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Roleanalysis } from './components/roleanalysis/roleanalysis';

@Component({
  selector: 'app-root',
  standalone: true, // Angular 18 uses standalone by default
  imports: [RouterOutlet, CommonModule, FormsModule,Roleanalysis],
  templateUrl: './app.html',
})
export class App  {
}

