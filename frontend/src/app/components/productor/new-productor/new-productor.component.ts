import { Component, EventEmitter, Output } from '@angular/core';
import { Productor } from '../../../models/productor.model';
import { ProductorService } from '../../../services/productor/productor.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-productor',
  imports: [FormsModule],
  templateUrl: './new-productor.component.html',
  styleUrl: './new-productor.component.css'
})
export class NewProductorComponent {
  @Output() close = new EventEmitter<void>();
  @Output() productorAdded = new EventEmitter<Productor>();
  enteredId: number = 0;
  enteredLastname: string = '';
  enteredFirstname: string = '';
  enteredAge: number = 0;
  enteredNow: boolean = true;
  constructor(private productorService: ProductorService) { }

  onCancel() {
    this.close.emit();
  }

  async onSubmit(): Promise<void> {
    const newProductor: Productor = {
      id: this.enteredId,
      lastname: this.enteredLastname,
      firstname: this.enteredFirstname,
      age: this.enteredAge,
      now: this.enteredNow,
    };

    try {
      const savedProductor = await this.productorService.addProductor(newProductor);

      if (savedProductor) {
        this.productorAdded.emit(savedProductor);
        // window.location.reload(); // Recharge la page après un ajout réussi
        this.close.emit(); // Ferme le formulaire
      } else {
        console.log(newProductor);
        console.error('Le producteur n\'a pas été ajouté correctement');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du producteur:', error);
    }
  }

}
