package dev.pomyharry.stocksimulator.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.pomyharry.stocksimulator.back.model.entity.Account;

public interface AccountRepository extends JpaRepository<Account, String> {
    Account findByCustomerId(String id);
}
