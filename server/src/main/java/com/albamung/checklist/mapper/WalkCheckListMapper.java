package com.albamung.checklist.mapper;

import com.albamung.checklist.dto.WalkCheckListDto;
import com.albamung.checklist.entity.WalkCheckList;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface WalkCheckListMapper {
    @Mapping(source = "id", target = "checkListId")
    WalkCheckListDto.Response WalkCheckListToResponse(WalkCheckList walkCheckList);
}
