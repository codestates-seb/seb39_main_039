package com.albamung.walk.repository;

import com.albamung.checklist.entity.WalkCheckList;
import com.albamung.walk.entity.Walk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalkRepository extends JpaRepository<Walk, Long> {
}
