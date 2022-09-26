package com.albamung.walk.repository;

import com.albamung.walk.entity.WalkPicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

public interface WalkPictureRepository extends JpaRepository<WalkPicture, Long> {
    @Modifying
    void deleteByLink(String link);
}
