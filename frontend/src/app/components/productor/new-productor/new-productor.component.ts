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
  enteredLastname = '';
  enteredFirstname = '';
  enteredAge: number = 0;
  enteredNow: boolean = true;
  constructor(private productorService: ProductorService) { }

  onCancel() {
    this.close.emit();
  }

  onSubmit(): void {
    const newProductor: Productor = {
      id: this.enteredId,
      lastname: this.enteredLastname,
      firstname: this.enteredFirstname,
      age: this.enteredAge,
      now: this.enteredNow,
    }
    this.productorService.addProductor(newProductor)
    // .then(savedProductor => {
    //   if (savedProductor) {
    //     this.productorAdded.emit(savedProductor);

    //   } else {
    //     console.log(newProductor)
    //     console.error('Le producteur n\'a pas été ajouté correctement');
    //   }
    // })
    // .catch(error => {
    //   console.error(error);
    // });
    window.location.reload();
    this.close.emit();

  }
}
