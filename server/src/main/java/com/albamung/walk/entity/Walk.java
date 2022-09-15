package com.albamung.walk.entity;

import com.albamung.checklist.entity.WalkCheckList;
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

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicUpdate
@DynamicInsert
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
    @Column(columnDefinition = "LONGTEXT")
    private String pictureList;

    private boolean ended;

    @ManyToOne
    @JoinColumn(name = "WALKER_ID")
    private User walker;

    @ManyToOne
    @JoinColumn(name = "OWNER_ID")
    private User owner;

    @OneToMany(mappedBy = "walk", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<WalkCheckList> checkList = new ArrayList<>();

    @ManyToMany(targetEntity = Pet.class)
    private List<Pet> petList = new ArrayList<>();

    public List<String> getCoord(){
        if(this.coord == null) return null;
        return Arrays.asList(this.coord.split(","));
    }

    public void addCoord(String str) {
        if(this.coord ==null) this.coord = str;
        else this.coord = this.coord +","+ str;
        //String Builder를 쓰는게 나을까?
    }

    public List<String> getPictureList(){
        if(this.pictureList ==null) return null;
        return Arrays.asList(this.pictureList.split(","));
    }
    public void addPictureList(String str) {
        if(this.pictureList ==null) this.pictureList = str;
        this.pictureList = this.pictureList +","+ str;
        //String Builder를 쓰는게 나을까?
    }

    public void setCheckListByContents(List<String> contentList){
        if(contentList.size()!=0) {
            List<WalkCheckList> checkList = new ArrayList<>();
            contentList.forEach(content -> {
                checkList.add(new WalkCheckList(this,content));
            });
            this.checkList = checkList;
        }
    }
    public void addPetList(Pet pet){
        List<Pet> newList = new ArrayList<>();
        if(this.petList==null){
            newList.add(pet);
            this.petList = newList;
        }
        else this.petList.add(pet);
        pet.addWalkList(this);
    }
}
