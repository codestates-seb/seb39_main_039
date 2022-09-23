package com.albamung.walk.service;

import com.albamung.walk.entity.Walk;
import com.albamung.walk.entity.WalkCheck;
import com.albamung.walk.repository.WalkCheckRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional

public class CheckListService {
    private final WalkCheckRepository walkCheckRepository;

    public CheckListService(WalkCheckRepository walkCheckRepository) {
        this.walkCheckRepository = walkCheckRepository;
    }

    public WalkCheck saveWalkCheckByContent(String content, Walk walk) {
        WalkCheck walkCheck = WalkCheck.builder().content(content).walk(walk).build();
        return walkCheckRepository.save(walkCheck);
    }


    public List<WalkCheck> saveWalkCheckListByContentList(List<String> contentList, Walk walk) {
        List<WalkCheck> checkList = new ArrayList<>();
        if (contentList != null) {
            contentList.forEach(content -> {
                checkList.add(WalkCheck.builder().content(content).walk(walk).build());
            });
        }
        return walkCheckRepository.saveAll(checkList);
    }

    public void deleteCheckList(List<Long> checkListIdToDelete) {
        walkCheckRepository.deleteAllById(checkListIdToDelete);
    }
}
