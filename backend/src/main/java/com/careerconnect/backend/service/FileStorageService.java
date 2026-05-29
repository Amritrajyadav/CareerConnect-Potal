package com.careerconnect.backend.service;
import org.springframework.beans.factory.annotation.Value; import org.springframework.stereotype.Service; import org.springframework.web.multipart.MultipartFile; import java.io.*; import java.nio.file.*;
@Service
public class FileStorageService{
 @Value("${app.upload.dir}") private String uploadDir;
 public String saveResume(MultipartFile file)throws IOException{File dir=new File(uploadDir); if(!dir.exists())dir.mkdirs(); String name=System.currentTimeMillis()+"_"+file.getOriginalFilename(); Path path=Paths.get(uploadDir,name); Files.copy(file.getInputStream(),path,StandardCopyOption.REPLACE_EXISTING); return path.toString();}
}
