import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../service/api';

declare var bootstrap: any;

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
  isEdit: boolean = false
  editResponse: any = []
  editId: any

  isData = signal(Boolean)

  ngOnInit() {
    this.getAllProduct()
  }

  clear() {
    const modalElement = document.getElementById('exampleModal');

    if (modalElement) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.hide();
    }

    this.productName = ""
    this.productRate = ""
    this.productDescription = ""
    this.editId = ""
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

  addProduct() {
    this.isEdit = false
    if (!this.productName || !this.productRate || !this.productDescription) {
      alert(`Fill all the Fields!!!`)
    } else {
      this.api.addProductAPI({ productName: this.productName, productRate: this.productRate, productDescription: this.productDescription }).subscribe({
        next: (res: any) => {
          console.log(res);
          alert(`Product Added Successfully`)
          this.getAllProduct()
        },
        error: (reason: any) => {
          alert(`Something Went Wrong!!!`)
        }
      })
    }
    this.clear()
  }

  getAProduct(id: any) {
    this.isEdit = true
    if (id) {
      this.api.getAProductAPI(id).subscribe((res: any) => {
        this.editResponse = res
        console.log(this.editResponse)
        this.productName = this.editResponse.productName
        this.productRate = this.editResponse.productRate
        this.productDescription = this.editResponse.productDescription
        this.editId = this.editResponse._id
      })
    }
  }

  editProduct() {
    if (!this.productName || !this.productRate || !this.productDescription) {
      alert(`Fill all the Fields!!!`)
    } else {
      this.api.updateProductAPI(this.editId, { productName: this.productName, productRate: this.productRate, productDescription: this.productDescription }).subscribe({
        next: (res: any) => {
          console.log(res);
          alert(`Product Updated Successfully`)
          this.getAllProduct()
        },
        error: (reason: any) => {
          alert(`Something Went Wrong!!!`)
        }
      })
    }
    this.clear()
  }

  deleteData(id: any) {
    if (id) {
      this.api.removeProductAPI(id).subscribe({
        next: (res: any) => {
          console.log(res);
          alert("Data Deleted Successfully")
          this.getAllProduct()
        },
        error: (reason: any) => {
          alert(`Something Went Wrong!!!`)
        }
      })
    }
    else {
      alert(`Something Went Wrong!!!`)
    }
  }
}
