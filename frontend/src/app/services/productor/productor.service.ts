import { Injectable } from '@angular/core';
import { Productor } from '../../models/productor.model';
import { Lien } from '../../utils/liens';

@Injectable({
  providedIn: 'root'
})
export class ProductorService {
  private url = Lien.getAllProductors;
  constructor() { }

  async getAllProductor(): Promise<Productor[]> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error('Failed to fetch productors');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching productors:', error);
      return [];
    }
  }
}
