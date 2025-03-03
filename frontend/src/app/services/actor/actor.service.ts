import { Injectable } from '@angular/core';
import { Actor } from '../../models/actor.model';
@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private url = "http://localhost:3004/actors/all";

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
}
