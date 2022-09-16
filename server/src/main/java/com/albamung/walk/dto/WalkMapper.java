package com.albamung.walk.dto;

import com.albamung.checklist.mapper.CheckListMapper;
import com.albamung.pet.mapper.PetMapper;
import com.albamung.user.mapper.UserMapper;
import com.albamung.walk.entity.Walk;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,  uses = {UserMapper.class, CheckListMapper.class, PetMapper.class})
public interface WalkMapper {
    @Mapping(source = "id", target = "walkId")
    WalkDto.DetailResponse walkToDetailResponse(Walk walk);
    @Mapping(source = "id", target = "walkId")
    WalkDto.SimpleResponse walkToSimpleResponse(Walk walk);
}
