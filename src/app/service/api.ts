import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  server_URL = "http://localhost:4000"
  http = inject(HttpClient)

  // add Product
  addProductAPI(reqBody: any) {
    return this.http.post(`${this.server_URL}/addproduct`, reqBody)
  }

  // get all products
  getAllProductAPI() {
    return this.http.get(`${this.server_URL}/getAllProducts`)
  }

  // get a particuular products
  getAProductAPI(id: string) {
    return this.http.get(`${this.server_URL}/getAProduct/${id}`)
  }

  // update product
  updateProductAPI(id: string, reqBody: any) {
    return this.http.put(`${this.server_URL}/updateProduct/${id}`, reqBody)
  }

  // delete
  removeProductAPI(id: string) {
    return this.http.delete(`${this.server_URL}/delete/${id}`)
  }

}
