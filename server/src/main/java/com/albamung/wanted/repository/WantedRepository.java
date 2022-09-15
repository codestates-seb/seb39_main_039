package com.albamung.wanted.repository;

import com.albamung.wanted.entity.Wanted;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WantedRepository extends JpaRepository<Wanted, Long> {
}
