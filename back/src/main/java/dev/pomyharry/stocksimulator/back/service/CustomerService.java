package dev.pomyharry.stocksimulator.back.service;

import org.springframework.security.crypto.password.PasswordEncoder;

import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;

public interface CustomerService {

    CustomerDTO login(CustomerDTO customer, PasswordEncoder passwordEncoder);

    Customer create(Customer customer);

    Customer findById(String id);

    Customer updateCustomerInfo(CustomerDTO customer);

    void deleteCustomerInfO(String customerId);
}
