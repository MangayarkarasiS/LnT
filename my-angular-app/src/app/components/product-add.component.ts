import { Component } from '@angular/core';
import { CanComponentDeactivate } from '../guards/can-component-deactivate';

@Component({
  selector: 'app-product-add',
  standalone: true,
  template: `
    <h2>Add Product (Admin Only)</h2>
    <p>Product add form goes here.</p>
  `,
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements CanComponentDeactivate {
  canDeactivate(): boolean {
    return confirm('Do you really want to leave? Unsaved changes will be lost.');
  }
}
