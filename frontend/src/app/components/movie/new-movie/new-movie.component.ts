import { Component, EventEmitter, Output } from '@angular/core';
import { Movie } from '../../../models/movie.model';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../../services/movie/movie.service';

@Component({
  selector: 'app-new-movie',
  imports: [FormsModule],
  templateUrl: './new-movie.component.html',
  styleUrl: './new-movie.component.css'
})
export class NewMovieComponent {
  @Output() close = new EventEmitter<void>()
  @Output() movieAdded = new EventEmitter<Movie>();
  enteredId: number = 0;
  enteredTitle: string = '';
  enteredDate: Date = new Date();
  enteredGenre: string = '';

  constructor(private movieService: MovieService) { }

  onCancel() {
    this.close.emit();
  }

  async onSubmit(): Promise<void> {
    const dateOnly = new Date(this.enteredDate);
    dateOnly.setUTCHours(0, 0, 0, 0);
    const newMovie: Movie = {
      id: this.enteredId,
      title: this.enteredTitle,
      date: new Date(this.enteredDate).toISOString().split('T')[0],
      genre: this.enteredGenre,
    };

    try {
      const savedMovie = await this.movieService.addMovie(newMovie);

      if (savedMovie) {
        this.movieAdded.emit(savedMovie);
        this.close.emit(); // Ferme le formulaire
      } else {
        console.log(newMovie);
        console.error('Le film n\'a pas été ajouté correctement');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du film:', error);
    }
  }
}
