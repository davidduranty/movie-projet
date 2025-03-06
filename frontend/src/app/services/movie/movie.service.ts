import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Lien } from '../../utils/liens';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = Lien.getAllMovies;
  private urlMovie = Lien.urlMovie;

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
  async getByMovie(title: string): Promise<Movie[]> {
    try {
      const response = await fetch(`${this.urlMovie}?title=${encodeURIComponent(title)}`)
      if (!response.ok) {
        console.log("error")
        throw new Error('Failed to fetch movies');
      }
      const movies = await response.json();
      return movies;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  }

  async addMovie(movie: Movie): Promise<Movie | null> {
    try {
      const add = await fetch(`${this.urlMovie}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      })
      if (!add.ok) {
        throw new Error('Echec de la création d un movie')
      }
      const savedMovie = await add.json();
      return savedMovie;
    } catch (error) {
      console.error('Erreur lors de la création de l acteur :', error);
      return null
    }
  }

  async deleteMovie(id: number): Promise<Movie | null> {
    try {
      const response = await fetch(`${this.urlMovie}/${id}`, {
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
