package dev.pomyharry.stocksimulator.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import dev.pomyharry.stocksimulator.back.model.entity.Account;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;

public interface AccountRepository extends JpaRepository<Account, String> {
    Account findByCustomerId(String id);

    @Transactional
    void deleteAllByCustomer(Customer customer);
}
