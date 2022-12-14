package com.albamung.wanted.mapper;

import com.albamung.pet.mapper.PetMapper;
import com.albamung.user.mapper.UserMapper;
import com.albamung.walk.mapper.WalkMapper;
import com.albamung.wanted.dto.WantedDto;
import com.albamung.wanted.entity.Wanted;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {WalkMapper.class, CommentMapper.class})
public interface WantedMapper {

    WantedDto.DetailResponse toDetailResponse(Wanted wanted);

    WantedDto.SimpleResponse toSimpleResponse(Wanted wanted);

    Wanted postToWanted(WantedDto.Post post);

    List<WantedDto.SimpleResponse> toSimpleResponseList(List<Wanted> wantedList);
}
