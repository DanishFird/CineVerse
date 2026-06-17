package com.cineverse.booking.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class SeatLockService {

    private final RedisTemplate<String, Object> redisTemplate;

    public SeatLockService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    private String getKey(Long showId, String seatNumber) {
        return "seat:" + showId + ":" + seatNumber;
    }

    public boolean lockSeat(Long showId, String seatNumber) {
        String key = getKey(showId, seatNumber);
        Boolean success = redisTemplate.opsForValue()
                .setIfAbsent(key, "LOCKED", Duration.ofMinutes(5));
        return Boolean.TRUE.equals(success);
    }

    public boolean isSeatLocked(Long showId, String seatNumber) {
        String key = getKey(showId, seatNumber);
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    public void releaseSeat(Long showId, String seatNumber) {
        String key = getKey(showId, seatNumber);
        redisTemplate.delete(key);
    }
}
