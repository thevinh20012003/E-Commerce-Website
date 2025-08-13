package com.vinhtt.ecommerce.dto;

import com.vinhtt.ecommerce.entity.Address;
import com.vinhtt.ecommerce.entity.Customer;
import com.vinhtt.ecommerce.entity.OrderItem;
import com.vinhtt.ecommerce.entity.Order;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
