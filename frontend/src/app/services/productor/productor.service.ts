import { Injectable } from '@angular/core';
import { Productor } from '../../models/productor.model';

@Injectable({
  providedIn: 'root'
})
export class ProductorService {
  private url = "http://localhost:3004/productors/all";
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
