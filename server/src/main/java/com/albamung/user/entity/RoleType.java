package com.albamung.user.entity;

import org.springframework.security.core.GrantedAuthority;

public enum RoleType implements GrantedAuthority {
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_USER("ROLE_USER"),
    ROLE_GUEST("GUEST");

    RoleType(String name) {
    }

    public String getAuthority() {
        return name();
    }
}
