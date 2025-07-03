import { Component } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  standalone: true,
  template: `
    <h2>Delete Product (Admin Only)</h2>
    <p>Product delete form goes here.</p>
  `,
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {}
