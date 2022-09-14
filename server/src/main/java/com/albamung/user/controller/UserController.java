package com.albamung.user.controller;

import com.albamung.exception.CustomException;
import com.albamung.user.dto.UserDto;
import com.albamung.user.entity.User;
import com.albamung.user.mapper.UserMapper;
import com.albamung.user.service.UserService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Api(tags = {"3.User"})
@RestController
@RequestMapping("/users")
@Validated
@Slf4j
public class UserController {
    private final UserService userService;
    private final UserMapper mapper;

    public UserController(UserService userService, UserMapper mapper) {
        this.userService = userService;
        this.mapper = mapper;
    }

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody @Valid UserDto.Signup signUpInfo) {
        User user = mapper.signupToUser(signUpInfo);
        String displayName = userService.signup(user);
        return new ResponseEntity<>(displayName, HttpStatus.CREATED);
    }

//    @PostMapping("/refresh")
//    public ResponseEntity refreshToken(@RequestHeader("Authorization") String accessToken, @RequestBody String refreshToken) {
//        return new ResponseEntity<>(userService.refreshToken(accessToken, refreshToken), HttpStatus.CREATED);
//    }

//    @GetMapping
//    public ResponseEntity getUsers(@RequestParam(value = "page", required = false) Integer page) {
//        if (page == null) page = 1;
//        Page<User> users = userService.getUserList(page - 1);
//        return new ResponseEntity<>(new PagingResponseDto<>(mapper.usersToResponses(users.getContent()), users), HttpStatus.OK);
//    }

    @GetMapping("/{user_id}")
    public ResponseEntity getUserInfo(@PathVariable("user_id") @Positive Long userId) {
        User user = userService.getUserInfo(userId);
        return new ResponseEntity<>(mapper.userToResponse(user), HttpStatus.OK);
    }

    @PutMapping("/edit")
    public ResponseEntity putUserInfo(@RequestBody UserDto.Put requestBody, @AuthenticationPrincipal @ApiIgnore User user) {
        Long loginUserId = user.getId();

        requestBody.setId(loginUserId);
        User putUser = mapper.putToUser(requestBody);
        String link = userService.putUserInfo(putUser, loginUserId);

        return new ResponseEntity<>(link, HttpStatus.OK);
    }

    @DeleteMapping("/{user_id}/delete")
    public ResponseEntity deleteUser(@PathVariable("user_id") @Positive Long userId, @AuthenticationPrincipal @ApiIgnore User user) {
        userService.deleteUser(userId, user.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/myinfo")
    public ResponseEntity getMyInfo(@AuthenticationPrincipal @ApiIgnore User loginUser) {
        if (loginUser == null) throw new CustomException("Please Login First", HttpStatus.FORBIDDEN);
        UserDto.Response response = mapper.userToResponse(userService.getUserInfo(loginUser.getId()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @GetMapping("/myinfo/bookmarks")
//    public ResponseEntity getMyBookmarks(@AuthenticationPrincipal @ApiIgnore User loginUser) {
//        if (loginUser == null) throw new CustomException("Please Login First", HttpStatus.FORBIDDEN);
//        User user = userService.verifyUser(loginUser.getId());
//
//        List<QuestionDto.Response> bookmarkedQuestionList = questionMapper.questionsToReponses(user.getBookmarkQuestionList().stream().map(BookmarkQuestion::getQuestion).collect(Collectors.toList()));
//
//        return new ResponseEntity<>(new PagingResponseDto<>(bookmarkedQuestionList, new PageImpl(bookmarkedQuestionList)), HttpStatus.OK);
//    }


//    @GetMapping("/{user_id}")
//    public ResponseEntity getUserQuestions(@PathVariable("user_id") @Positive Long userId) {
//        List<Question> questionList = userService.getUserQuestions(userId);
//        return new ResponseEntity<>(questionMapper.questionsToReponses(questionList), HttpStatus.OK);
//    }
}