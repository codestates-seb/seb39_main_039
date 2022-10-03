package com.albamung.wanted.entity;

import com.albamung.helper.audit.BaseEntityDate;
import com.albamung.pet.entity.Pet;
import com.albamung.walk.entity.Walk;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@DynamicInsert
@DynamicUpdate
public class Wanted extends BaseEntityDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wantedId;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "WALK_ID")
    private Walk walk;

    @ManyToOne
    @JoinColumn(name = "CITY_ID")
    private City city;

    private int pay;
    private boolean matched;
    @Column(nullable = false)
    private String title;

    @OneToMany(mappedBy = "wanted", cascade = CascadeType.REMOVE)
    private List<Comment> commentList;

    public List<Pet> getPetList() {
        return this.walk.getPetList();
    }

    public String getLocation() {
        return this.city.getRegionName() + " " + this.city.getName();
    }
    public Long getCityId() {
        return this.city.getCityId();
    }

    public int getCommentCount() {
        return this.commentList.size();
    }
}
