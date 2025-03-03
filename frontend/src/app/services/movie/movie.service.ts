import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Lien } from '../../utils/liens';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = Lien.getAllMovies;

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
