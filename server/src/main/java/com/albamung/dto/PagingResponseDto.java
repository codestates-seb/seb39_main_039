package com.albamung.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;


@Getter
public class PagingResponseDto<T> {
    private List<T> items;
    private PageInfo page;

    public PagingResponseDto(List<T> items, Page page) {
        this.items = items;
        this.page = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
