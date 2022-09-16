package com.albamung.user.entity;

import org.springframework.security.core.GrantedAuthority;

public enum RoleType implements GrantedAuthority {
    ADMIN("ROLE_ADMIN"),
    USER("ROLE_USER"),
    GUEST("GUEST");

    RoleType(String name) {
    }

    public String getAuthority() {
        return name();
    }
}
