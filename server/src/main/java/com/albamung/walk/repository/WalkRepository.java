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
    @Query(value = "UPDATE walk SET distance = distance + ?2 WHERE id = ?1 ", nativeQuery = true)
    void increaseDistance(Long walkId, int distance);

    @Query(value = "Select u from Walk u join u.petList p where p.id = ?1 AND (u.endTime < ?2 OR u.ended = true)")
    Page<Walk> findPetWalkHistory(Long petId, LocalDateTime now, PageRequest pageRequest);
    Page<Walk> findAllByPetListIdAndStartTimeIsAfter(Long petId, LocalDateTime now, PageRequest pageRequest);

    @Query(value = "Select u from Walk u where u.walker.id = ?1 AND (u.endTime < ?2 OR u.ended = true)")
    Page<Walk> findWalkerWalkHistory(Long walkerId, LocalDateTime now, PageRequest pageRequest);
    Page<Walk> findAllByWalkerIdAndStartTimeIsAfter(Long walkerId, LocalDateTime now, PageRequest pageRequest);
}
