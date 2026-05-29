package com.careerconnect.backend.controller;

import com.careerconnect.backend.entity.Notification;
import com.careerconnect.backend.repository.NotificationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin
public class NotificationController {

    private final NotificationRepository repo;

    public NotificationController(NotificationRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/{userId}")
    public List<Notification> userNotifications(@PathVariable Long userId) {
        return repo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @GetMapping("/{userId}/unread-count")
    public Map<String, Long> unreadCount(@PathVariable Long userId) {
        Map<String, Long> data = new HashMap<>();
        data.put("count", repo.countByUserIdAndReadStatusFalse(userId));
        return data;
    }

    @PatchMapping("/{id}/read")
    public Notification markRead(@PathVariable Long id) {
        Notification notification = repo.findById(id).orElseThrow();
        notification.setReadStatus(true);
        return repo.save(notification);
    }

    @PostMapping
    public Notification create(@RequestBody Notification notification) {
        return repo.save(notification);
    }
}