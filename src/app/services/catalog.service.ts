import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  
  // public host:string = "http://localhost:8080";
  public REST_API_SERVER = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  public getProducts(page:number, size:number) {
    return this.httpClient.get(this.REST_API_SERVER + "/products?page="+page+"&size="+size);
  }

  public getProductsByKeyword(kw:string, page:number, size:number) {
    return this.httpClient.get(this.REST_API_SERVER + "/products/search/byDesignationPage?kw="+kw+"&page="+page+"&size="+size);
  }

  public deleteResource(url: string) { 
    return this.httpClient.delete(url);
  }

  public saveResource(url: string, data): Observable<Product> {
    return this.httpClient.post<Product>(url, data);
  }

  public getResource(url: string): Observable<Product> { 
    return this.httpClient.get<Product>(url);
  }

  public updateResource(url: string, data): Observable<Product> { 
    return this.httpClient.put<Product>(url, data);
  }

}
