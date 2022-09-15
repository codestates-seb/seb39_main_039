package com.albamung.walk.repository;

import com.albamung.walk.entity.Walk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WalkRepository extends JpaRepository<Walk, Long> {
    @Query(value = "UPDATE walk SET coord = CONCAT(coord, ?2) WHERE id=?1 ", nativeQuery = true)
    void UpdateCoord(Long id,String coord);
}
