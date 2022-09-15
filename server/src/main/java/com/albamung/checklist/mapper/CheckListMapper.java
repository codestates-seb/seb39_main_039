package com.albamung.checklist.mapper;

import com.albamung.checklist.dto.SavedCheckListDto;
import com.albamung.checklist.dto.WalkCheckListDto;
import com.albamung.checklist.entity.SavedCheckList;
import com.albamung.checklist.entity.WalkCheckList;
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
