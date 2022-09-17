package com.albamung.wanted.mapper;

import com.albamung.user.mapper.UserMapper;
import com.albamung.walk.mapper.WalkMapper;
import com.albamung.wanted.dto.CommentDto;
import com.albamung.wanted.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {UserMapper.class})
public interface CommentMapper {
    CommentDto.Response toResponse(Comment comment);
    Comment postToComment(CommentDto.Post post);
    Comment putToComment(CommentDto.Put put);
}
