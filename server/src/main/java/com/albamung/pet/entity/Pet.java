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
import java.time.LocalDate;
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

    @Column(nullable = false, columnDefinition = "DATE")
    private LocalDate birthday;

    @Column(nullable = false)
    private boolean sex;

    @Column(nullable = false, length = 20)
    private String species;

    @Column(columnDefinition = "TEXT")
    private String aboutPet;

    @ManyToMany(targetEntity = Walk.class, mappedBy = "petList")
    private List<Walk> walkList;

    @ManyToOne
    @JoinColumn(name = "OWNER_ID", nullable = false)
    private User owner;

    public String getSex() {
        if (sex) return "암컷";
        else return "수컷";
    }

    public void addWalkList(Walk walk) {
        this.walkList.add(walk);
    }

    public int getWalkHistoryCount() {
        if (this.walkList == null) return 0;
        return (int) this.walkList.stream().filter(s -> s.getEndTime().isBefore(LocalDateTime.now())).count();
    }

    public int getWalkWaitingCount() {
        if (this.walkList == null) return 0;
        return (int) this.walkList.stream().filter(s -> s.getStartTime().isAfter(LocalDateTime.now())).count();
    }

    public int getWalkDistance() {
        if (this.walkList == null) return 0;
        return this.walkList.stream().mapToInt(Walk::getDistance).sum();
    }

    public Walk getCurrentWalk() {
        LocalDateTime now = LocalDateTime.now();
        return this.walkList.stream().filter(s -> (s.getEndTime().isAfter(now) && s.getStartTime().isBefore(now) && s.getWalker() != null)).findFirst().orElse(null);
    }
}
