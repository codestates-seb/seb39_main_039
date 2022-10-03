package com.albamung.wanted.entity;

public enum SortBy {
    recent("creationDate"),
    pay("pay");

    private final String value;

    SortBy(String value) {
        this.value = value;
    }
    public String getValue() {
        return value;
    }
}
