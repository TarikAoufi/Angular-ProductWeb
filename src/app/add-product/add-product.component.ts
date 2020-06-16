import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public currentProduct: Product;
  public mode: number=1;

  constructor(private catService: CatalogService, private router: Router) { }

  ngOnInit(): void {
  }

  onSaveProduct(data: any) {
    this.catService.saveResource(this.catService.REST_API_SERVER+"/products",data)
      .subscribe(res => {
    // this.router.navigateByUrl("/products");
        this.currentProduct = res;
        this.mode=2;
      }, err => {
        console.log(err);
      })
  }

  onAddProduct() {
    this.mode=1;   
  }

  onFindProducts() {
    this.router.navigateByUrl("/products");
  }

}
