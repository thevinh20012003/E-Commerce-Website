import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  currentCategoryId: number = 1;

  searchMode: boolean = false;

  constructor(private productService: ProductService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.router.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const theKeyword: string = this.router.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }
  handleListProducts() {
    // check if id parameter is available
    const hasCategoryId: boolean = this.router.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using "+" symbol
      this.currentCategoryId = +this.router.snapshot.paramMap.get('id')!;
    } else {
      // not category id available... default to category id 1
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
