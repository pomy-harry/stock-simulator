package dev.pomyharry.stocksimulator.back.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;
import dev.pomyharry.stocksimulator.back.repository.CustomerRepository;
import dev.pomyharry.stocksimulator.back.security.TokenProvider;
import dev.pomyharry.stocksimulator.back.repository.OAuthRepository;
import dev.pomyharry.stocksimulator.back.exception.IdNotFoundException;
import dev.pomyharry.stocksimulator.back.exception.DuplicationException;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TokenProvider tokenManager;
    
    @Autowired
    private OAuthRepository kakaoRepository;

    @Override
    public CustomerDTO login(CustomerDTO c, PasswordEncoder passwordEncoder) {
        // ID 조회
        Customer customer = customerRepository.findByEmail(c.getEmail());

        if (customer == null || !passwordEncoder.matches(c.getPassword(), customer.getPassword())) {
            throw new IdNotFoundException("Id cannot be found");
        }

        final String token = tokenManager.createToken(customer.getId());

        return CustomerDTO.builder()
                .token(token)
                .build();
    }

    @Override
    public CustomerDTO create(CustomerDTO c, PasswordEncoder passwordEncoder) {
        Customer customer = customerRepository.findByEmail(c.getEmail());

        // ID 중복 검사
        if (customer != null) {
            throw new DuplicationException("Id is Duplicated");
        }

        customer = customerRepository.save(new Customer(c.getName(), c.getEmail(),
                passwordEncoder.encode(c.getPassword())));

        final String token = tokenManager.createToken(customer.getId());

        return CustomerDTO.builder().token(token).build();
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
    public void deleteCustomerInfO(String customerId) {
        customerRepository.deleteById(customerId);
        kakaoRepository.deleteById(customerId);
    }

}
