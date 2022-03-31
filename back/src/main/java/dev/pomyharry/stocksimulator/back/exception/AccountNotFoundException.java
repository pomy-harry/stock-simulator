package dev.pomyharry.stocksimulator.back.exception;

public class AccountNotFoundException extends RuntimeException {
    public AccountNotFoundException(String errMsg) {
        super(errMsg);
    }
}
