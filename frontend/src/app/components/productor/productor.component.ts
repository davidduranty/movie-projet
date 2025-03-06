import { Component, OnInit } from '@angular/core';
import { Productor } from '../../models/productor.model';
import { ProductorService } from '../../services/productor/productor.service';
import { NewProductorComponent } from './new-productor/new-productor.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-productor',
  imports: [NewProductorComponent, FormsModule],
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
  async searchProductor(lastname: string): Promise<void> {
    try {
      const productorlist = this.productorService.getByname(lastname)
      const firstLetter = lastname.charAt(0).toLowerCase();
      this.productors = (await productorlist).filter(productor => productor.lastname?.toLowerCase().startsWith(firstLetter)
      )
    } catch (error) {
      console.error('Error find productor:', error);
    };
  }
  async searchById(id: string): Promise<void> {
    const inputId = Number(id)
    try {
      const productorId = await this.productorService.getById(inputId)
      if (productorId) {
        this.productors = [productorId]
      } else {
        console.warn('No movie found with the given ID')
        this.productors = []
      }
    } catch (error) {
      console.error('Error finding productor by id:', error);
    }
  }
  onAddProductor() {
    this.isAddProductor = true
  }
  onCloseAddProductor() {
    this.isAddProductor = false;
  }
  onProductorAdded(newProductor: Productor) {
    this.productors.push(newProductor); // Ajoute le nouveau producteur à la liste
    this.onCloseAddProductor(); // Ferme le formulaire après l'ajout
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
