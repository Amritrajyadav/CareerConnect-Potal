package com.careerconnect.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        Path certificatePath = Paths.get("uploads/certificates");
        String certificateLocation = certificatePath.toFile().getAbsolutePath();

        registry.addResourceHandler("/certificates/**")
                .addResourceLocations("file:" + certificateLocation + "/");
    }
}