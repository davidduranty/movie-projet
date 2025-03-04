import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../services/actor/actor.service';
import { Actor } from '../../models/actor.model';

@Component({
  selector: 'app-actor',
  imports: [],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css'
})
export class ActorComponent implements OnInit {

  actors: Actor[] = []

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

