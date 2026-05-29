package com.careerconnect.backend.dto;
import com.careerconnect.backend.enums.Role;
public class RegisterRequest {
 private String fullName,email,password,phone; private Role role;
 public String getFullName(){return fullName;} public void setFullName(String v){fullName=v;} public String getEmail(){return email;} public void setEmail(String v){email=v;}
 public String getPassword(){return password;} public void setPassword(String v){password=v;} public String getPhone(){return phone;} public void setPhone(String v){phone=v;}
 public Role getRole(){return role;} public void setRole(Role v){role=v;}
}
