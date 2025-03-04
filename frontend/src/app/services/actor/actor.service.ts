import { Injectable } from '@angular/core';
import { Actor } from '../../models/actor.model';
import { Lien } from '../../utils/liens';
@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private url = Lien.getAllActors;
  private urlDelete = Lien.urlActor;

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
  async delateActor(id: number): Promise<Actor | null> {
    try {
      const response = await fetch(`${this.urlDelete}/${id}`, {
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
