import { Routes } from '@angular/router';
import { AppComponent } from './app.component';


export const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'actor', loadComponent: () => import('./components/actor/actor.component').then((mod) => mod.ActorComponent) },
  { path: 'movie', loadComponent: () => import('./components/movie/movie.component').then((mod) => mod.MovieComponent) },
  { path: 'productor', loadComponent: () => import('./components/productor/productor.component').then((mod) => mod.ProductorComponent) }
];
