package com.careerconnect.backend.dto;
import com.careerconnect.backend.enums.Role;
public class AuthResponse {
 private String token,fullName,email; private Long id; private Role role; private boolean approved;
 public AuthResponse(String token,Long id,String fullName,String email,Role role,boolean approved){this.token=token;this.id=id;this.fullName=fullName;this.email=email;this.role=role;this.approved=approved;}
 public String getToken(){return token;} public Long getId(){return id;} public String getFullName(){return fullName;} public String getEmail(){return email;} public Role getRole(){return role;} public boolean isApproved(){return approved;}
}
