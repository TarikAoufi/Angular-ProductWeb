import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogService } from '../services/catalog.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public currentProduct: Product;
  public url: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
    private catService: CatalogService) { }

  ngOnInit(): void {
    this.url=atob(this.activatedRoute.snapshot.params.id);
    this.catService.getResource(this.url)
      .subscribe(data => {
        this.currentProduct=data;
      }, err => {
        console.log(err);
      })
  }

  onUpdateProduct(value: any) {
    this.catService.updateResource(this.url, value)
      .subscribe(data => {
        alert("Update successfully completed");
        this.router.navigateByUrl("/products");
      }, err => {
        console.log(err);
      })
  }

}
