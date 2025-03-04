import { Injectable } from '@angular/core';
import { Productor } from '../../models/productor.model';
import { Lien } from '../../utils/liens';
import { response } from 'express';
import { catchError, Observable, throwError } from 'rxjs';
import { subscribe } from 'diagnostics_channel';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductorService {
  // productor: Productor[] = []
  private url = Lien.getAllProductors;
  private urlProductor = Lien.urlProductor
  constructor(private http: HttpClient) { }

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

  addProductor(productor: Productor): Observable<Productor> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Productor>(`${this.urlProductor}/add-productor`, productor, { headers })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error + '❌ Impossible d\'ajouter le producteur.'));
        })
      );
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
