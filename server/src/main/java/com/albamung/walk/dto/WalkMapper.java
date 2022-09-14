package com.albamung.walk.dto;

import com.albamung.checklist.mapper.WalkCheckListMapper;
import com.albamung.pet.mapper.PetMapper;
import com.albamung.user.mapper.UserMapper;
import com.albamung.walk.entity.Walk;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,  uses = {UserMapper.class, WalkCheckListMapper.class, PetMapper.class})
public interface WalkMapper {
    @Mapping(source = "id", target = "walkId")
    WalkDto.DetailResponse walkToDetailResponse(Walk walk);

    Walk postToWalk(WalkDto.Post post);
}
