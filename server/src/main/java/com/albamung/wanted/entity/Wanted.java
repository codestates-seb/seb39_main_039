package com.albamung.wanted.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Wanted {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
}
