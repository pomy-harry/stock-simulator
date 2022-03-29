package dev.pomyharry.stocksimulator.back.service;

import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;

public interface CustomerService {

    CustomerDTO login(CustomerDTO customer);

    Customer create(Customer customer);

    Customer findById(String id);
}
