import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../service/api';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  productName: string = ""
  productRate: string = ""
  productDescription: string = ""
  api = inject(Api)
  productData: any = signal([])
  isEdit : boolean = false
  editResponse : any = []

  ngOnInit() {
    this.getAllProduct()
  }

  addProduct() {
    this.isEdit = false
    if (!this.productName || !this.productRate || !this.productDescription) {
      alert(`Fill all the Fields!!!`)
    } else {
      this.api.addProductAPI({ productName: this.productName, productRate: this.productRate, productDescription: this.productDescription }).subscribe({
        next: (res: any) => {
          console.log(res);
          alert(`Product Added Successfully`)
        },
        error: (reason: any) => {
          alert(`Something Went Wrong!!!`)
        }
      })
    }
    this.clear()
  }

  clear() {
    this.productName = ""
    this.productRate = ""
    this.productDescription = ""
  }

  getAllProduct() {
    this.api.getAllProductAPI().subscribe({
      next: (res: any) => {
        this.productData.set(res)
        console.log(res);
      },
      error: (reason: any) => {
        console.log(reason);
      }
    })
  }

  getAProduct(id: any) {
    this.isEdit = true
    if (id) {
      this.api.getAProductAPI(id).subscribe((res: any) => {
        this.editResponse = res
        console.log(this.editResponse)
        this.productName = this.editResponse[0].productName
        this.productRate = this.editResponse[0].productRate
        this.productDescription = this.editResponse[0].productDescription
      })
    }
  }
}
