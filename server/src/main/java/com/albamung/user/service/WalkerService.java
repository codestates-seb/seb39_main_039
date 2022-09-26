package com.albamung.user.service;

import com.albamung.user.dto.WalkerDto;
import com.albamung.user.entity.User;
import com.albamung.user.mapper.UserMapper;
import com.albamung.user.repository.UserRepository;
import com.albamung.walk.entity.Walk;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class WalkerService {
    private final UserRepository userRepository;
    private final UserService userService;
    private final UserMapper userMapper;

    public WalkerService(UserRepository userRepository, UserService userService, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @Transactional(readOnly = true)
    public WalkerDto.DetailWalkerResponse getWalkerDetails(Long walkerId) {
        User walker = userService.verifyUser(walkerId);
        LocalDateTime now = LocalDateTime.now();
        List<Walk> walkList = walker.getWalkWalkerList();
        WalkerDto.DetailWalkerResponse walkerDto = userMapper.toDetailWalkerResponse(walker);
        walkerDto.setWalkDistance(walkList.stream().mapToInt(Walk::getDistance).sum());
        walkerDto.setWalkHistoryCount((int) walkList.stream().filter(s -> s.getEndTime().isBefore(now)).count());
        walkerDto.setWalkWaitingCount((int) walkList.stream().filter(s -> s.getStartTime().isAfter(now)).count());

        return walkerDto;
    }
}
