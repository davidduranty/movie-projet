import { Injectable } from '@angular/core';
import { Productor } from '../../models/productor.model';
import { Lien } from '../../utils/liens';

@Injectable({
  providedIn: 'root'
})
export class ProductorService {
  private url = Lien.getAllProductors;
  private urlProductor = Lien.urlProductor
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
  async deleteProductor(id: number): Promise<Productor | null> {
    try {
      const response = await fetch(`${this.urlProductor}/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Échec de la suppression du producteur');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la suppression du producteur :', error);
      return null;
    }
  }
}
