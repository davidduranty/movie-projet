import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MovieService } from './services/movie/movie.service';
import { ActorService } from './services/actor/actor.service';
import { ProductorService } from './services/productor/productor.service';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'movie-app';
  dataLoaded = false;
  constructor(
    private movieService: MovieService,
    private actorService: ActorService,
    private productorService: ProductorService) { }


  async ngOnInit() {
    try {
      await this.preloadData();
      this.dataLoaded = true;
      console.log('Toutes les données sont chargées !');
    } catch (error) {
      console.error('Erreur lors du préchargement des données', error);
    }
  }

  async preloadData() {
    const [movies, actors, productors] = await Promise.all([
      this.movieService.getAllMovies(),
      this.actorService.getAllActors(),
      this.productorService.getAllProductor()
    ]);
    console.log({ movies, actors, productors });
  }
}
