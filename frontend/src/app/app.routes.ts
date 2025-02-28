import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ActorComponent } from './components/actor/actor.component';
import { MovieComponent } from './components/movie/movie.component';
import { ProductorComponent } from './components/productor/productor.component';

export const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'actor', component: ActorComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'productor', component: ProductorComponent }
];
