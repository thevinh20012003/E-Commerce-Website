package com.vinhtt.ecommerce.service;

import com.vinhtt.ecommerce.dao.CustomerRepository;
import com.vinhtt.ecommerce.dto.Purchase;
import com.vinhtt.ecommerce.dto.PurchaseResponse;
import com.vinhtt.ecommerce.entity.Order;
import com.vinhtt.ecommerce.entity.Customer;
import com.vinhtt.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {
    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        // Retrieve the order info from DTO
        Order order = purchase.getOrder();
        // Generate a tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        // populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        for (OrderItem item : orderItems) {
            order.add(item);
        }
        // populate order with billingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        // populate order with shippingAddress
        order.setShippingAddress(purchase.getShippingAddress());
        // populate order with customer
        Customer customer = purchase.getCustomer();
        customer.add(order);
        // Save to the database
        customerRepository.save(customer);
        // Return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        // Generate a random UUID as the tracking number
        return UUID.randomUUID().toString();
    }
}
