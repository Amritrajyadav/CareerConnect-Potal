package com.careerconnect.backend.entity;
import com.careerconnect.backend.enums.Role;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity @Table(name="users")
public class User {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 private String fullName;
 @Column(unique=true, nullable=false) private String email;
 private String password;
 @Enumerated(EnumType.STRING) private Role role;
 private String phone; private boolean active=true; private boolean approved=false;
 private LocalDateTime createdAt=LocalDateTime.now();
 public User(){}
 public User(String fullName,String email,String password,Role role,String phone,boolean approved){this.fullName=fullName;this.email=email;this.password=password;this.role=role;this.phone=phone;this.approved=approved;}
 public Long getId(){return id;} public String getFullName(){return fullName;} public void setFullName(String v){fullName=v;}
 public String getEmail(){return email;} public void setEmail(String v){email=v;} public String getPassword(){return password;} public void setPassword(String v){password=v;}
 public Role getRole(){return role;} public void setRole(Role v){role=v;} public String getPhone(){return phone;} public void setPhone(String v){phone=v;}
 public boolean isActive(){return active;} public void setActive(boolean v){active=v;} public boolean isApproved(){return approved;} public void setApproved(boolean v){approved=v;}
}
