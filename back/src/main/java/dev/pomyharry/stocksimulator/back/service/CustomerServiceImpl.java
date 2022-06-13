package dev.pomyharry.stocksimulator.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;
import dev.pomyharry.stocksimulator.back.repository.CustomerRepository;
import dev.pomyharry.stocksimulator.back.exception.IdNotFoundException;
import dev.pomyharry.stocksimulator.back.exception.DuplicationException;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public CustomerDTO login(CustomerDTO c, PasswordEncoder passwordEncoder) {
        // ID 조회
        Customer customer = customerRepository.findByEmail(c.getEmail());

        if (customer == null || !passwordEncoder.matches(c.getPassword(), customer.getPassword())) {
            throw new IdNotFoundException("Id cannot be found");
        }

        return new CustomerDTO(customer.getId(), customer.getName(), customer.getEmail(), customer.getPassword());
    }

    @Override
    public Customer create(Customer c) {
        Customer customer = customerRepository.findByEmail(c.getEmail());

        // ID 중복 검사
        if (customer != null) {
            throw new DuplicationException("Id is Duplicated");
        }

        return customerRepository.save(c);
    }

    @Override
    public Customer findById(String id) {
        Customer customer = customerRepository.findById(id).get();

        if (customer == null) {
            throw new IdNotFoundException("아이디가 존재하지 않습니다.");
        }

        return customer;
    }

    @Override
    public Customer updateCustomerInfo(CustomerDTO customer) {
        Customer c = customerRepository.findById(customer.getId()).get();
        c.setName(customer.getName());
        customerRepository.save(c);

        return c;
    }

    @Override
    public void deleteCustomerInfO(CustomerDTO customer) {
        customerRepository.deleteById(customer.getId());
    }

}
