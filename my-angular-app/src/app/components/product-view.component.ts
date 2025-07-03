import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-view',
  standalone: true,
  template: `
    <h2>Product List</h2>
    <a routerLink="/products/add">Add Product</a> |
    <a routerLink="/products/delete">Delete Product</a>
  `,
  imports: [RouterModule],
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {

}
