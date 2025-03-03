import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = "http://localhost:3004/movies/all";

  constructor() { }

  async getAllMovies(): Promise<Movie[]> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  }
}
