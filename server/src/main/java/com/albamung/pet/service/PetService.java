package com.albamung.pet.service;

import com.albamung.exception.CustomException;
import com.albamung.helper.fileUpload.S3fileService;
import com.albamung.pet.entity.Pet;
import com.albamung.pet.repository.PetRepository;
import com.albamung.user.entity.User;
import com.albamung.user.service.UserService;
import org.springframework.beans.factory.annotation.Value;
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
    private final S3fileService s3fileService;
    private final String dirName = "image/pet/";
    @Value("${clientUri}")
    private String clientUrl;

    public PetService(PetRepository petRepository, UserService userService, S3fileService s3fileService) {
        this.petRepository = petRepository;
        this.userService = userService;
        this.s3fileService = s3fileService;
    }

    public Pet savePet(Pet pet, Long ownerId) {
        User owner = userService.verifyUser(ownerId);
        pet.setOwner(owner);

        return petRepository.save(pet);
    }
    public String savePetPicture(Long petId, Long ownerId){
        Pet targetPet = verifyPet(petId);
        verifyPetOwner(targetPet, ownerId);
        String UUIDFileName = s3fileService.createUUIDFileName(petId.toString(), dirName);
        targetPet.setPicture(clientUrl +"/"+ UUIDFileName);

        return s3fileService.save(UUIDFileName);
    }

    public Pet editPet(Pet pet, Long petId, Long ownerId) {
        Pet targetPet = verifyPet(petId);
        verifyPetOwner(targetPet, ownerId);
        Optional.ofNullable(pet.getBirthday()).ifPresent(targetPet::setBirthday);
        Optional.ofNullable(pet.getSex()).ifPresent(sex -> {
            if(sex.equals("암컷")) targetPet.setSex(true);
            else if(sex.equals("수컷")) targetPet.setSex(false);
        });
        Optional.ofNullable(pet.getSpecies()).ifPresent(targetPet::setSpecies);
        Optional.ofNullable(pet.getName()).ifPresent(targetPet::setName);
        Optional.ofNullable(pet.getAboutPet()).ifPresent(targetPet::setAboutPet);

        return targetPet;
    }
    public List<Pet> getPetList(Long ownerId) {
        User owner = userService.verifyUser(ownerId);
        return owner.getPetList();
    }

    public void deletePet(Long petId, Long ownerId) {
        Pet targetPet = verifyPet(petId);
        verifyPetOwner(targetPet, ownerId);
        petRepository.deleteById(petId);
    }


    public Pet verifyPet(Long petId) {
        return petRepository.findById(petId).orElseThrow(() -> new CustomException("반려견 ID가 잘못 되었거나 존재하지 않는 반려견 정보입니다", HttpStatus.NO_CONTENT));
    }

    public void verifyPetOwner(Pet pet, Long ownerId) {
        if(!pet.getOwner().getId().equals(ownerId)) throw new CustomException("해당 반려견의 주인이 아닙니다", HttpStatus.FORBIDDEN);
    }
}
