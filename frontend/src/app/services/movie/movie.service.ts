import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Lien } from '../../utils/liens';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = Lien.getAllMovies;
  private urlDelete = Lien.urlMovie;

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
  async deleteMovie(id: number): Promise<Movie | null> {
    try {
      const response = await fetch(`${this.urlDelete}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Échec de la suppression du film');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la suppression du film :', error);
      return null;
    }
  }
}
