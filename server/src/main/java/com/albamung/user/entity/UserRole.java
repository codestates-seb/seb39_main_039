package com.albamung.user.entity;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    ROLE_ADMIN("ROLE_ADMIN"), ROLE_USER("ROLE_USER");

    UserRole(String name) {
    }

    public String getAuthority() {
        return name();
    }
}
