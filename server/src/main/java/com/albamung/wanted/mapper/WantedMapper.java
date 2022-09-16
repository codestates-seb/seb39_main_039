package com.albamung.wanted.mapper;

import com.albamung.user.mapper.UserMapper;
import com.albamung.walk.dto.WalkMapper;
import com.albamung.wanted.dto.WantedDto;
import com.albamung.wanted.entity.Wanted;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {WalkMapper.class, UserMapper.class})
public interface WantedMapper {
    @Mapping(source = "id", target = "wantedId")
    WantedDto.DetailResponse toDetailResponse(Wanted wanted);

    Wanted postToWanted(WantedDto.Post post);

    List<WantedDto.DetailResponse> toDetailResponseList(List<Wanted> wantedList);
}
