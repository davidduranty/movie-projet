import { Component, OnInit } from '@angular/core';
import { Productor } from '../../models/productor.model';
import { ProductorService } from '../../services/productor/productor.service';
import { NewProductorComponent } from './new-productor/new-productor.component';


@Component({
  selector: 'app-productor',
  imports: [NewProductorComponent],
  templateUrl: './productor.component.html',
  styleUrl: './productor.component.css'
})
export class ProductorComponent implements OnInit {
  productors: Productor[] = []
  isAddProductor: boolean = false;

  constructor(private productorService: ProductorService) { }

  ngOnInit(): void {
    this.productorService.getAllProductor().then(
      (productorsArray: Productor[]) => {
        this.productors = productorsArray
      }).catch(error => {
        console.error('Error loading productor:', error)
      })

  }
  onAddProductor() {
    this.isAddProductor = true
  }
  onCloseAddProductor() {
    this.isAddProductor = false;
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
