import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _EcomdataService: EcomdataService,
    private _CartService: CartService
  ) {}

  productSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['Next', 'Previous'],
    autoplay: true,
    items: 1,
    nav: false,
  };

  productDetails: Product = {} as Product;
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let idProduct: any = params.get('id');
        this._EcomdataService.getProductById(idProduct).subscribe({
          next: (response) => {
            this.productDetails = response.data;
          },
        });
      },
    });
  }

  addCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (Response) => {
        console.log(Response.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
