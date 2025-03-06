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
  async getByname(lastname: string): Promise<Productor[]> {
    try {
      const response = await fetch(`${this.urlProductor}?lastname=${encodeURIComponent(lastname)}`)
      if (!response.ok) {
        console.log("error")
        throw new Error('Failed to fetch productor');
      }
      const productor = await response.json();
      return productor;
    } catch (error) {
      console.error('Error fetching productors:', error);
      return [];
    }
  }
  async getById(id: number): Promise<Productor | null> {
    try {
      const response = await fetch(`${this.urlProductor}/id/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch constructor by id');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération de l id :', error);
      return null
    }
  }

  async addProductor(productor: Productor): Promise<Productor | null> {
    try {
      const response = await fetch(`${this.urlProductor}/add-productor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productor),
      })
      if (!response.ok) {
        console.log(response)
        throw new Error('Échec de la création du producteur');
      }
      const savedProductor = await response.json();
      return savedProductor;
    } catch (error) {
      console.error('Erreur lors de la création du producteur :', error);
      return null
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
