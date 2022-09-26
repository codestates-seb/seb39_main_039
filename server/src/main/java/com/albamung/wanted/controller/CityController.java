package com.albamung.wanted.controller;


import com.albamung.wanted.entity.City;
import com.albamung.wanted.repository.CityRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/city")
@Api(tags = {"6. 지역(city) 관련"})
@Slf4j
@Validated
public class CityController {
    private final CityRepository cityRepository;

    public CityController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @GetMapping("/{regionName}")
    @ApiOperation(value = "광역시도 별 군구 불러오기", notes = "서울(1), 경기(2), 인천(3), 강원(4),대전(5),세종(6),충남(7),충북(8), 부산(9), 울산(10), 경남(11), 경북(12),대구(13), 광주(14), 전남(15), 전북(16), 제주(17) \n" +
            "Path에 이름을 입력하면 해당 광역시도의 군구를 불러옵니다. ID나 이름을 사용하시면 됩니다.")
    public ResponseEntity getCitiesByRegionName(@PathVariable City.Region regionName){
        return new ResponseEntity<>(cityRepository.findAllByRegionName(regionName), HttpStatus.OK);
    }

}