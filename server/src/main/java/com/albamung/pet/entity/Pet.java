package com.albamung.pet.entity;

import com.albamung.user.entity.User;
import com.albamung.walk.entity.Walk;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String name;

    @ColumnDefault("\"https://image.shutterstock.com/image-photo/adorable-cute-puppy-welsh-corgi-600w-1814695991.jpg\"")
    private String picture;
    @ColumnDefault("CURRENT_TIMESTAMP")
    private LocalDateTime birthday;
    private char sex;
    private String species;

    @ManyToMany(targetEntity = Walk.class, mappedBy = "petList")
    private List<Walk> walkList;

    @ManyToOne
    @JoinColumn(name = "OWNER_ID")
    private User owner;

    public void addWalkList(Walk walk){
        this.walkList.add(walk);
    }
}
