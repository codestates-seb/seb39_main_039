package com.albamung.wanted.repository;

import com.albamung.wanted.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityRepository extends JpaRepository<City, Long> {
    City findByNameAndRegionName(String locationName, City.Region regionName);
    List<City> findAllByRegionName(City.Region regionName);
}
