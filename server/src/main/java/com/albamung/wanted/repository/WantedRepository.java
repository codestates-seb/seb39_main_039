package com.albamung.wanted.repository;

import com.albamung.wanted.entity.Wanted;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WantedRepository extends JpaRepository<Wanted, Long> {
    Page<Wanted> findAllByMatched(boolean matched, PageRequest pageRequest);
}
