package main

import (
	"scoreboard-app/config"
	redisdb "scoreboard-app/redis"
	"scoreboard-app/routes"
	"scoreboard-app/websocket"
)

func main() {
	cfg := config.LoadConfig()
	redisdb.InitRedis(cfg)

	go websocket.WsHub.Run()

	// Subscribe to Redis Pub/Sub channel
	redisdb.Subscribe("scoreboard_updates")

	r := routes.SetupRouter()
	r.Run(":8080")
}
