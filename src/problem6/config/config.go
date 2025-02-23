package config

import (
    "os"
)

type Config struct {
    RedisAddr string
    RedisPwd  string
    GoogleClientID string
}

func LoadConfig() *Config {
    return &Config{
        RedisAddr:      os.Getenv("REDIS_ADDR"),
        RedisPwd:       os.Getenv("REDIS_PWD"),
        GoogleClientID: os.Getenv("GOOGLE_CLIENT_ID"),
    }
}
