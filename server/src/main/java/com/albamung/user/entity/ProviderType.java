package com.albamung.user.entity;

public enum ProviderType {
    GOOGLE("GOOGLE"),
    KAKAO("KAKAO");

    private final String name;

    ProviderType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
