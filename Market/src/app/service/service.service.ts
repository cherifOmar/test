import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {



  constructor(private http: HttpClient) { }

  addProduct(data:any, vendorId:any):Observable<Product>{
    return this.http.post<Product>("http://localhost:9090/product/venodrProduct/"+vendorId,data)
  }

  getProduct(){
    return this.http.get<Product[]>("http://localhost:9090/product/")
  }

  putProduct(data:any, id:number){
    return this.http.put<Product>("http://localhost:9090/product/"+id, data)
  }

  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:9090/product/"+id)

  }

  createAcount(data:any){
    return this.http.post<User>("http://localhost:9090/api/signup",data)
  }


  signIn(data:any){
    return this.http.post<User>("http://localhost:9090/api/signin",data)
  }

  updateProfile(data:any,id:any){
    return  this.http.put('http://localhost:3000/users/'+id,data)
  }

  getUserById(id:any){
    return  this.http.get('http://localhost:3000/users/'+id)
  }

  // getAllProducts(limit='12'): Observable<Array<Product>>{
  //   return this.http.get<Array<Product>>(`http://fakestoreapi.com/products?limits=${limit}`)
  // }

  getAllProducts(): Observable<Array<Product>>{
    return this.http.get<Array<Product>>('http://localhost:9090/product')
  }

  getAllCategories(): Observable<Array<String>>{
    return this.http.get<Array<String>>(
      'http://localhost:9090/product/categories'
    )
  }

  fetchannonce():Observable<Product[]>{
    return this.http.get<Product[]>('http://fakestoreapi.com/products')
  }

  getProductsById(id:any) {
    return this.http.get('http://localhost:9090/product/'+id)
  }

  getProductsByvendor(id: string): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:9090/product/vendorproduct/' + id);
  }

  getProductsByCategory(keyword:string) {
    return this.http.get('http://fakestoreapi.com/products/category/'+keyword)
  }

  addImages(formdata:any) {
    return this.http.post<any>('http://localhost:9090/product/file', formdata)
  }



}
