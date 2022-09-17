package com.albamung.walk.mapper;

import com.albamung.walk.dto.SavedCheckListDto;
import com.albamung.walk.dto.WalkCheckListDto;
import com.albamung.walk.entity.SavedCheckList;
import com.albamung.walk.entity.WalkCheckList;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CheckListMapper {
    @Mapping(source = "id", target = "checkListId")
    WalkCheckListDto.Response walkCheckListToResponse(WalkCheckList walkCheckList);

    @Mapping(source = "id", target = "checkListId")
    SavedCheckListDto.Response savedCheckListToResponse(SavedCheckList savedCheckList);
}
