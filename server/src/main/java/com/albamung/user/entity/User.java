package com.albamung.user.entity;

import com.albamung.exception.CustomException;
import com.albamung.helper.audit.BaseEntityDate;
import com.albamung.pet.entity.Pet;
import com.albamung.walk.entity.SavedCheckList;
import com.albamung.walk.entity.Walk;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.http.HttpStatus;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Entity(name = "Users")
@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
@DynamicUpdate
@DynamicInsert
public class User extends BaseEntityDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String provider;

    private String providerId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = false, unique = true)
    private String nickName;

    @Column(nullable = false)
    private String roles;

    @Column(length = 512)
    private String profileImage;

    @Column(nullable = true, length = 20)
    private String fullName;

    @Column(nullable = true, length = 30)
    private String location;

    private String refreshToken;

    private String phone;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE)
    private List<SavedCheckList> savedCheckList;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE)
    private List<Walk> walkOwnerList;

    @OneToMany(mappedBy = "walker", cascade = CascadeType.REMOVE)
    private List<Walk> walkWalkerList;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE)
    private List<Pet> petList;


    public List<RoleType> getRoleList() {
        List<RoleType> roleList = new ArrayList<>();
        if (this.roles.length() == 0) return new ArrayList<>();
        for (String s : this.roles.split(",")) {
            roleList.add(RoleType.valueOf(s));
        }
        return roleList;
    }

    public Walk getCurrentWalk(){
        LocalDateTime now = LocalDateTime.now();
        return this.walkWalkerList.stream().filter(s->s.getStartTime().isBefore(now)&&s.getEndTime().isAfter(now) && !s.isEnded()).findFirst().orElse(null);
    }

    public static User of(ProviderType providerType, Map<String, Object> attributes) {
        switch (providerType) {
            case GOOGLE:
                return User.builder()
                        .email((String) attributes.get("email"))
                        .nickName((String) attributes.get("given_name"))
                        .fullName((String) attributes.get("name"))
                        .provider(providerType.name())
                        .providerId((String) attributes.get("sub"))
                        .profileImage((String) attributes.get("picture"))
                        .roles("ROLE_USER")
                        .password("12345678")
                        .build();
//            {id=2433567214, connected_at=2022-09-17T13:01:32Z, properties={nickname=이재현, profile_image=http://k.kakaocdn.net/dn/bm7n9B/btrp6QMPHU1/06EfUzfBTA5cvtQbiB76tK/img_640x640.jpg, thumbnail_image=http://k.kakaocdn.net/dn/bm7n9B/btrp6QMPHU1/06EfUzfBTA5cvtQbiB76tK/img_110x110.jpg}, kakao_account={profile_nickname_needs_agreement=false, profile_image_needs_agreement=false, profile={nickname=이재현, thumbnail_image_url=http://k.kakaocdn.net/dn/bm7n9B/btrp6QMPHU1/06EfUzfBTA5cvtQbiB76tK/img_110x110.jpg, profile_image_url=http://k.kakaocdn.net/dn/bm7n9B/btrp6QMPHU1/06EfUzfBTA5cvtQbiB76tK/img_640x640.jpg, is_default_image=false}, has_email=true, email_needs_agreement=false, is_email_valid=true, is_email_verified=true, email=jaehyun618@naver.com}}
            case KAKAO:
                Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
                Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
                return User.builder()
                        .email(Optional.ofNullable(account.get("email")).orElse("KAKAO" + attributes.get("id").toString()).toString())
                        .nickName((String) properties.get("nickname"))
                        .profileImage((String) properties.get("profile_image"))
                        .provider("KAKAO")
                        .providerId(String.valueOf(attributes.get("id")))
                        .password("12345678")
                        .roles("ROLE_USER")
                        .build();

            default:
                throw new CustomException("잘못된 Provider 입니다.", HttpStatus.FORBIDDEN);
        }
    }
}
