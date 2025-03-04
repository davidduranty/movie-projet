import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie/movie.service';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getAllMovies().then(
      (moviesArray: Movie[]) => {
        this.movies = moviesArray
      }
    ).catch(error => {
      console.error('Error loading movies:', error)
    })
  }
  async deleteMovie(id: number): Promise<void> {
    const success = await this.movieService.deleteMovie(id);
    window.location.reload();
    if (success) {
      this.movies = this.movies.filter(movie => movie.id !== id)
    } else {
      console.error("Impossible de supprimer le film.");
    }
  }
}
