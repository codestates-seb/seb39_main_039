//package com.albamung.user.controller;
//
//import com.preproject39.bookmark.entity.BookmarkQuestion;
//import com.preproject39.dto.PagingResponseDto;
//import com.preproject39.dto.SingleResponseDto;
//import com.preproject39.exception.CustomException;
//import com.preproject39.question.dto.QuestionDto;
//import com.preproject39.question.mapper.QuestionMapper;
//import com.preproject39.user.dto.UserDto;
//import com.preproject39.user.entity.User;
//import com.preproject39.user.mapper.UserMapper;
//import com.preproject39.user.service.UserService;
//import io.swagger.annotations.Api;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.*;
//import springfox.documentation.annotations.ApiIgnore;
//
//import javax.validation.Valid;
//import javax.validation.constraints.Positive;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//@Api(tags = {"3.User"})
//@RestController
//@RequestMapping("/users")
//@Validated
//@Slf4j
//public class UserController {
//    private final UserService userService;
//    private final UserMapper mapper;
//
//    private final QuestionMapper questionMapper;
//
//    public UserController(UserService userService, UserMapper mapper, QuestionMapper questionMapper) {
//        this.userService = userService;
//        this.mapper = mapper;
//        this.questionMapper = questionMapper;
//    }
//
//    @PostMapping("/signup")
//    public ResponseEntity signup(@RequestBody @Valid UserDto.Signup signUpInfo) {
//        User user = mapper.signupToUser(signUpInfo);
//        String displayName = userService.signup(user);
//        return new ResponseEntity<>(displayName, HttpStatus.CREATED);
//    }
//
//    @GetMapping("/ologin")
//    public String loginTest2(@AuthenticationPrincipal User user) {
//        System.out.println("============/loginTest2===========");
//        System.out.println("userDetails : " + user.getEmail());
//        return "세션 정보 확인2";
//    }
//
//    @PostMapping("/refresh")
//    public ResponseEntity refreshToken(@RequestHeader("Authorization") String accessToken, @RequestBody String refreshToken) {
//        return new ResponseEntity<>(userService.refreshToken(accessToken, refreshToken), HttpStatus.CREATED);
//    }
//
//    @GetMapping
//    public ResponseEntity getUsers(@RequestParam(value = "page", required = false) Integer page) {
//        if (page == null) page = 1;
//        Page<User> users = userService.getUserList(page - 1);
//        return new ResponseEntity<>(new PagingResponseDto<>(mapper.usersToResponses(users.getContent()), users), HttpStatus.OK);
//    }
//
//    @GetMapping("/status")
//    public ResponseEntity getUserStatus() {
//        Map<String, Boolean> response = new HashMap<>();
//        response.put("isLogin", true);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
//
//    @GetMapping("/{user_id}")
//    public ResponseEntity getUserInfo(@PathVariable("user_id") @Positive Long userId) {
//        User user = userService.getUserInfo(userId);
//        return new ResponseEntity<>(new SingleResponseDto<>(mapper.userToResponse(user)), HttpStatus.OK);
//    }
//
//    @PutMapping("/edit")
//    public ResponseEntity putUserInfo(@RequestBody UserDto.Put requestBody, @AuthenticationPrincipal @ApiIgnore User user) {
//        Long loginUserId = user.getId();
//
//        requestBody.setId(loginUserId);
//        User putUser = mapper.putToUser(requestBody);
//        String link = userService.putUserInfo(putUser, loginUserId);
//
//        return new ResponseEntity<>(link, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/{user_id}/delete")
//    public ResponseEntity deleteUser(@PathVariable("user_id") @Positive Long userId, @AuthenticationPrincipal @ApiIgnore User user) {
//        userService.deleteUser(userId, user.getId());
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
//
//    @GetMapping("/myinfo")
//    public ResponseEntity getMyInfo(@AuthenticationPrincipal @ApiIgnore User loginUser) {
//        if (loginUser == null) throw new CustomException("Please Login First", HttpStatus.FORBIDDEN);
//        UserDto.Response response = mapper.userToResponse(userService.getUserInfo(loginUser.getId()));
//        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
//    }
//
//    @GetMapping("/myinfo/bookmarks")
//    public ResponseEntity getMyBookmarks(@AuthenticationPrincipal @ApiIgnore User loginUser) {
//        if (loginUser == null) throw new CustomException("Please Login First", HttpStatus.FORBIDDEN);
//        User user = userService.verifyUser(loginUser.getId());
//
//        List<QuestionDto.Response> bookmarkedQuestionList = questionMapper.questionsToReponses(user.getBookmarkQuestionList().stream().map(BookmarkQuestion::getQuestion).collect(Collectors.toList()));
//
//        return new ResponseEntity<>(new PagingResponseDto<>(bookmarkedQuestionList, new PageImpl(bookmarkedQuestionList)),HttpStatus.OK);
//    }
//
//
////    @GetMapping("/{user_id}")
////    public ResponseEntity getUserQuestions(@PathVariable("user_id") @Positive Long userId) {
////        List<Question> questionList = userService.getUserQuestions(userId);
////        return new ResponseEntity<>(questionMapper.questionsToReponses(questionList), HttpStatus.OK);
////    }
//}
