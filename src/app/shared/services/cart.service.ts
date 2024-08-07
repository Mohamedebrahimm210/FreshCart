import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  
  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: productId },
    );
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
    });
  }

  removeItem(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    );
  }

  updateCartProduct(productId: string, newCount: number): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count: newCount },
    );
  }

  checkOut(cartId: string, userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAddress: userData },
    );
  }
}
