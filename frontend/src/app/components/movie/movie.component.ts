import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie/movie.service';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-movie',
  imports: [NewMovieComponent, FormsModule],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];
  isAddMovie: boolean = false;


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
  async searchMovie(title: string): Promise<void> {
    try {
      const movieList = this.movieService.getByMovie(title)
      const firstLetter = title.charAt(0).toLowerCase()
      this.movies = (await movieList).filter(movie => movie.title?.toLowerCase().startsWith(firstLetter))
    } catch (error) {
      console.error('Error find movie:', error);
    };
  }
  async searchId(inputValue: string): Promise<void> {
    const id = Number(inputValue)
    try {
      const movieId = await this.movieService.getById(id)
      if (movieId) {
        this.movies = [movieId]
        console.log('Movie fetched:', movieId);
      } else {
        console.warn('No movie found with the given ID')
        this.movies = []
      }
    } catch (error) {
      console.error('Error finding movie by id:', error);
    }
  }
  onAddMovie() {
    this.isAddMovie = true;
  }
  onCloseAddMovie() {
    this.isAddMovie = false;
  }
  async onMovieAdded(newMovie: Movie): Promise<void> {
    this.movies.push(newMovie);
    this.onCloseAddMovie();
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
