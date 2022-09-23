package com.albamung.walk.repository;

import com.albamung.walk.entity.WalkCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface WalkCheckRepository extends JpaRepository<WalkCheck, Long> {
    @Modifying
    @Query(value = "UPDATE walk_check SET Content = ?2 WHERE walk_check_id = ?1 ", nativeQuery = true)
    void updateWalkCheckList(Long walkCheckId, String content);
}
