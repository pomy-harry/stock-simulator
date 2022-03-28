package dev.pomyharry.stocksimulator.back.exception;

public class IdNotFoundException extends RuntimeException {
    public IdNotFoundException(String errMsg) {
        super(errMsg);
    }
}
