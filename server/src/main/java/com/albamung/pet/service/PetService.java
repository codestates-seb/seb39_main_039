package com.albamung.pet.service;

import com.albamung.exception.CustomException;
import com.albamung.pet.dto.PetDto;
import com.albamung.pet.entity.Pet;
import com.albamung.pet.repository.PetRepository;
import com.albamung.user.entity.User;
import com.albamung.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PetService {

    private final PetRepository petRepository;
    private final UserService userService;

    public PetService(PetRepository petRepository, UserService userService) {
        this.petRepository = petRepository;
        this.userService = userService;
    }

    public Pet savePet(Pet pet, Long ownerId){
        User owner = userService.verifyUser(ownerId);
        pet.setOwner(owner);
        return petRepository.save(pet);
    }

    public Pet editPet(Pet pet, Long petId, Long ownerId){
        Pet targetPet = verifyPet(petId);
        Optional.ofNullable(pet.getBirthday()).ifPresent(targetPet::setBirthday);
        Optional.ofNullable(pet.getSex()).ifPresent(targetPet::setSex);
        Optional.ofNullable(pet.getSpecies()).ifPresent(targetPet::setSpecies);
        Optional.ofNullable(pet.getName()).ifPresent(targetPet::setName);

        return targetPet;
    }
    public Pet verifyPet(Long petId){
        return petRepository.findById(petId).orElseThrow(()->new CustomException("반려견 ID가 잘못 되었거나 존재하지 않는 반려견 정보입니다",HttpStatus.NO_CONTENT));
    }

    public List<Pet> getPetList(Long ownerId) {
        User owner = userService.verifyUser(ownerId);
        return owner.getPetList();
    }
}
