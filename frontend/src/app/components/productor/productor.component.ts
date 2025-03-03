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
}
