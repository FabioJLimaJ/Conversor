import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Formatador } from './pages/formatador/formatador';

@Component({
  imports: [RouterOutlet, Formatador],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('formatador');
}
