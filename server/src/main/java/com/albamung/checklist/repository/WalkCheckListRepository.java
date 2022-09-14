package com.albamung.checklist.repository;

import com.albamung.checklist.entity.WalkCheckList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalkCheckListRepository extends JpaRepository<WalkCheckList, Long> {
}
