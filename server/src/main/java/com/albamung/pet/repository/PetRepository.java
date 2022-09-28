package com.albamung.pet.repository;

import com.albamung.pet.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet,Long> {
    @Modifying
    @Query(value = "DELETE FROM walk_pet_list WHERE pet_list_id = ?1", nativeQuery = true)
    void deleteWalkPet(Long petId);
}
