package dev.pomyharry.stocksimulator.back.exception;

public class DuplicationException extends RuntimeException {
    public DuplicationException(String errMsg) {
        super(errMsg);
    }
}
