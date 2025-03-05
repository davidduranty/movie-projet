import { Component, EventEmitter, Output } from '@angular/core';
import { ActorService } from '../../../services/actor/actor.service';
import { FormsModule } from '@angular/forms';
import { Actor } from '../../../models/actor.model';

@Component({
  selector: 'app-new-actor',
  imports: [FormsModule],
  templateUrl: './new-actor.component.html',
  styleUrl: './new-actor.component.css'
})
export class NewActorComponent {
  @Output() close = new EventEmitter<void>();
  @Output() actorAdded = new EventEmitter<Actor>();

  enteredId: number = 0;
  enteredLastname: string = '';
  enteredFirstname: string = '';
  enteredStart: Date = new Date();
  enteredEnd: Date = new Date();
  enteredCountry: string = '';

  constructor(private actorService: ActorService) { }

  onCancel() {
    this.close.emit();
  }

  async onSubmit(): Promise<void> {
    const newActor: Actor = {
      id: this.enteredId,
      lastname: this.enteredLastname,
      firstname: this.enteredFirstname,
      start: this.enteredStart,
      end: this.enteredEnd,
      country: this.enteredCountry
    }
    try {
      const savedProductor = await this.actorService.addActor(newActor);

      if (savedProductor) {
        this.actorAdded.emit(savedProductor);
        this.close.emit();
      } else {
        console.log(newActor);
        console.error('L acteur n\'a pas été ajouté correctement');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l acteur:', error);
    }

  }
}
