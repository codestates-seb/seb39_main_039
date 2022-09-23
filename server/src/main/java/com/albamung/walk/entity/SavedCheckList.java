package com.albamung.walk.entity;

import com.albamung.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Entity(name = "saved_check")
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class SavedCheckList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long savedCheckId;

    private String content;

    @ManyToOne
    @JoinColumn(name = "OWNER_ID")
    private User owner;
}
