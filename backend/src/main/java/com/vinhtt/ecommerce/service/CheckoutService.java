package com.vinhtt.ecommerce.service;

import com.vinhtt.ecommerce.dto.Purchase;
import com.vinhtt.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
