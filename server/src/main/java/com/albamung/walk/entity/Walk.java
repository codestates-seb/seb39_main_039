package com.albamung.walk.entity;

import com.albamung.helper.audit.BaseEntityDate;
import com.albamung.pet.entity.Pet;
import com.albamung.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.locationtech.jts.geom.LineString;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicInsert
@DynamicUpdate
public class Walk extends BaseEntityDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(columnDefinition = "LONGTEXT")
    private String coord;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @ColumnDefault("0")
    private int distance;

    private boolean ended;

    @ManyToOne
    @JoinColumn(name = "WALKER_ID")
    private User walker;

    @ManyToOne
    @JoinColumn(name = "OWNER_ID", nullable = false)
    private User owner;

    @Column(columnDefinition = "TEXT")
    private String caution;

    @ColumnDefault("0")
    private int progress;

    private Time actualWalkTime;

    @ColumnDefault("0")
    private int pooCount;
    @ColumnDefault("0")
    private int snackCount;
    @ColumnDefault("0")
    private int mealCount;
    @ColumnDefault("0")
    private int walkCount;

    @OneToMany(mappedBy = "walk", cascade = {CascadeType.REMOVE, CascadeType.PERSIST}, orphanRemoval = true)
    private List<WalkCheck> checkList = new ArrayList<>();

    @ManyToMany(targetEntity = Pet.class)
    private List<Pet> petList = new ArrayList<>();

    @OneToMany(mappedBy = "walk", cascade = {CascadeType.REMOVE})
    private List<Coord> coordList = new ArrayList<>();
    private LineString route;

    @OneToMany(mappedBy = "walk", cascade = {CascadeType.REMOVE})
    private List<WalkPicture> pictureList = new ArrayList<>();

    public List<String> getCoord() {
        if (this.coordList == null) return null;
        return this.coordList.stream().map(s -> String.format("%s %s", s.getPoint().getX(), s.getPoint().getY())).collect(Collectors.toList());
    }

    public void setCheckListByContents(List<String> contentList) {
        List<WalkCheck> checkList;
        if (this.checkList == null) checkList = new ArrayList<>();
        else checkList = this.checkList;

        if (contentList != null) {
            contentList.forEach(content -> {
                checkList.add(WalkCheck.builder().walk(this).content(content).build());
            });
            this.checkList = checkList;
        }
    }

    public List<String> getPictureList() {
        return this.pictureList.stream().map(WalkPicture::getLink).collect(Collectors.toList());
    }

    public void addPetList(Pet pet) {
        List<Pet> newList = new ArrayList<>();
        if (this.petList == null) {
            newList.add(pet);
            this.petList = newList;
        } else this.petList.add(pet);
        pet.addWalkList(this);
    }

    public void increasePoo(int count) {
        this.pooCount += count;
    }

    public void increaseSnack(int count) {
        this.snackCount += count;
    }

    public void increaseMeal(int count) {
        this.mealCount += count;
    }

    public void increaseWalk(int count) {
        this.walkCount += count;
    }
}
