import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../services/actor/actor.service';
import { Actor } from '../../models/actor.model';
import { NewActorComponent } from './new-actor/new-actor.component';

@Component({
  selector: 'app-actor',
  imports: [NewActorComponent],
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
  onAddActor() {
    this.isAddActor = true;
  }
  onCloseAddActor() {
    this.isAddActor = false;
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

