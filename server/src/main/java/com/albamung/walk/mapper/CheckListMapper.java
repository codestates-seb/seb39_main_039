package com.albamung.walk.mapper;

import com.albamung.walk.dto.WalkCheckListDto;
import com.albamung.walk.entity.WalkCheck;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CheckListMapper {
    @Mapping(source = "walkCheckId", target = "checkListId")
    WalkCheckListDto.Response ToResponse(WalkCheck walkCheck);

    @Mapping(source = "checkListId", target = "walkCheckId")
    WalkCheck putToWalkCheck(WalkCheckListDto.Put put);

    List<WalkCheck> putListToWalkCheckList(List<WalkCheckListDto.Put> putList);

}
