import { Injectable } from '@angular/core';
import { Actor } from '../../models/actor.model';
import { Lien } from '../../utils/liens';
@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private url = Lien.getAllActors;
  private urlActor = Lien.urlActor;

  constructor() { }

  async getAllActors(): Promise<Actor[]> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error('Failed to fetch actors');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching actors:', error);
      return [];
    }
  }

  async addActor(actor: Actor): Promise<Actor | null> {
    try {
      const response = await fetch(`${this.urlActor}/add-actor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actor),
      })
      if (!response.ok) {
        console.log(response)
        throw new Error('Échec de la création de l acteur');
      }
      const savedActor = await response.json();
      return savedActor;
    } catch (error) {
      console.error('Erreur lors de la création de l acteur :', error);
      return null
    }
  }
  async delateActor(id: number): Promise<Actor | null> {
    try {
      const response = await fetch(`${this.urlActor}/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Échec de la suppression de l Acteur');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la suppression de l Acteur :', error);
      return null;
    }
  }
}
