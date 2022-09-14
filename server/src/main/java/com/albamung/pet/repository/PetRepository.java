package com.albamung.pet.repository;

import com.albamung.pet.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet,Long> {

}
