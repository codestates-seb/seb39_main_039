package com.albamung.walk.repository;

import com.albamung.walk.entity.Walk;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface WalkRepository extends JpaRepository<Walk, Long> {
    @Modifying
    @Query(value = "UPDATE walk SET coord = CONCAT(coord, ?2) WHERE id = ?1 ", nativeQuery = true)
    void UpdateCoord(Long walkId, String coord);

    @Modifying
    @Query(value = "UPDATE walk SET distance = distance + ?2 WHERE id = ?1 ", nativeQuery = true)
    void UpdateDistance(Long walkId, int distance);

    Page<Walk> findAllByPetListIdAndEndTimeIsBefore(Long petId, LocalDateTime now, PageRequest pageRequest);
}
