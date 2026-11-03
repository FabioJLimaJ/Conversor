import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Formatador } from './pages/formatador/formatador';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
@Component({
  imports: [RouterOutlet, Formatador, Navbar, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('formatador');
}
