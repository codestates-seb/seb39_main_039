package com.albamung.pet.mapper;

import com.albamung.pet.dto.PetDto;
import com.albamung.pet.entity.Pet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PetMapper {
    @Mapping(source = "id", target = "petId")
    @Mapping(source = "name", target = "petName")
    @Mapping(source = "picture", target = "petPicture")
    PetDto.SimpleResponse toSimpleResponse(Pet pet);

    Pet postToPet(PetDto.Post post);


}