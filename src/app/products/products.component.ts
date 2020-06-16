import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: any;
  public size: number = 5;
  public currentPage: number = 0;
  public totalPages: number;
  public pages: Array<number>;
  public currentKeyword: string = "";

  data: any[] = [];
  constructor(private catalogService: CatalogService, private router: Router) { }

  ngOnInit(): void {

  }

  onGetProducts() {
    this.catalogService.getProducts(this.currentPage, this.size)
      .subscribe(data => {
        this.totalPages = data['page'].totalPages;
        this.pages = new Array<number>(this.totalPages);
        this.products = data; 
       console.log(this.pages);
		}, err => {
      console.log(err);
    });
  }

  onPageProduct(i) {
    this.currentPage = i;
    this.searchProducts();
  }

  onSearch(form: any) {
    this.currentPage = 0;
    this.currentKeyword = form.keyword;
    this.searchProducts();
  }

  searchProducts() {     
    this.catalogService.getProductsByKeyword(this.currentKeyword , this.currentPage, this.size)
      .subscribe(data => {
        this.totalPages = data['page'].totalPages;
        this.pages = new Array<number>(this.totalPages);
        this.products = data; 
       console.log(this.pages);
		}, err => {
      console.log(err);
    });
  }

  onDeleteProduct(p) {
    let conf = confirm("Are you sure you want to delete this product?");
    if(conf) {
      this.catalogService.deleteResource(p._links.self.href)
        .subscribe(data => {
          this.searchProducts();
        }, err => {
          console.log(err);
        });
    }
  }

  onEditProduct(p) {
    let url = p._links.self.href;
    this.router.navigateByUrl("/edit-product/"+btoa(url));
  }

}
