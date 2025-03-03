import { Component, OnInit } from '@angular/core';
import { Productor } from '../../models/productor.model';
import { ProductorService } from '../../services/productor/productor.service';

@Component({
  selector: 'app-productor',
  imports: [],
  templateUrl: './productor.component.html',
  styleUrl: './productor.component.css'
})
export class ProductorComponent implements OnInit {
  productors: Productor[] = []

  constructor(private productorService: ProductorService) { }

  ngOnInit(): void {
    this.productorService.getAllProductor().then(
      (productorsArray: Productor[]) => {
        this.productors = productorsArray
      }).catch(error => {
        console.error('Error loading productor:', error)
      })

  }
  async deleteProductor(id: number): Promise<void> {
    const success = await this.productorService.deleteProductor(id);
    window.location.reload();
    if (success) {
      this.productors = this.productors.filter(data => data.id !== id)
    } else {
      console.error("Impossible de supprimer le producteur.");
    }
  }
}
