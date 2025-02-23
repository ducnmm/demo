package redisdb

import (
	"context"
	"scoreboard-app/config"
	"scoreboard-app/websocket"

	"github.com/redis/go-redis/v9"
)

var Rdb *redis.Client
var Ctx = context.Background()

func InitRedis(cfg *config.Config) {
	Rdb = redis.NewClient(&redis.Options{
		Addr:     cfg.RedisAddr,
		Password: cfg.RedisPwd,
		DB:       0,
	})
}

func Publish(channel string, message string) error {
	return Rdb.Publish(Ctx, channel, message).Err()
}

func Subscribe(channel string) {
	pubsub := Rdb.Subscribe(Ctx, channel)
	ch := pubsub.Channel()

	// Listen for messages on the Redis channel
	go func() {
		for msg := range ch {
			// Send message to WebSocket Hub for broadcasting
			websocket.WsHub.Broadcast <- []byte(msg.Payload)
		}
	}()
}
