package dev.pomyharry.stocksimulator.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;
import dev.pomyharry.stocksimulator.back.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public CustomerDTO findId(String email, String pw) {
        Customer customer = customerRepository.findByEmail(email);

        System.out.println(customer);

        if (customer == null || !customer.getPassword().equals(pw)) {
            return null;
        }

        System.out.println("pw : " + pw);
        System.out.println("password : " + customer.getPassword());

        return new CustomerDTO(customer.getId(), customer.getName(), customer.getEmail(), customer.getPassword());
    }

}
