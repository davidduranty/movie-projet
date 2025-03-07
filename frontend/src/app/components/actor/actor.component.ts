import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../services/actor/actor.service';
import { Actor } from '../../models/actor.model';
import { NewActorComponent } from './new-actor/new-actor.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actor',
  imports: [NewActorComponent, FormsModule],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css'
})
export class ActorComponent implements OnInit {

  actors: Actor[] = [];
  isAddActor: boolean = false

  constructor(private actorService: ActorService) { }

  ngOnInit(): void {
    this.actorService.getAllActors().then(
      (actorsArray: Actor[]) => {
        this.actors = actorsArray;
      }
    ).catch(error => {
      console.error('Error loading actors:', error);
    });
  }
  async searchActor(lastname: string): Promise<void> {
    try {
      const actorList = this.actorService.getByLastname(lastname)
      const firstLetter = lastname.charAt(0).toLowerCase();
      this.actors = (await actorList).filter(actor => actor.lastname?.toLowerCase().startsWith(firstLetter)
      )
    } catch (error) {
      console.error('Error find actors:', error);
    };
  }
  onAddActor() {
    this.isAddActor = true;
  }
  onCloseAddActor() {
    this.isAddActor = false;
  }
  async searchById(id: string): Promise<void> {
    const inputId = Number(id)
    try {
      const productorId = await this.actorService.getById(inputId)
      if (productorId) {
        this.actors = [productorId]
      } else {
        console.warn('No actor found with the given ID')
        this.actors = []
      }
    } catch (error) {
      console.error('Error finding actor by id:', error);
    }
  }
  async onActorAdded(newActor: Actor): Promise<void> {
    this.actors.push(newActor);
    this.onCloseAddActor();
  }
  async deleteActor(id: number): Promise<void> {
    const success = await this.actorService.delateActor(id)
    window.location.reload();
    if (success) {
      this.actors = this.actors.filter(actor => actor.id !== id)
    } else {
      console.error("Impossible de supprimer l'acteur."
      )
    }
  }
}

