package routes

import (
	"net/http"
	"scoreboard-app/controllers"
	"scoreboard-app/websocket" // Import your custom WebSocket Hub

	"github.com/gin-gonic/gin"
	ws "github.com/gorilla/websocket" // Alias to avoid naming conflict
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.POST("/api/scores/increment", controllers.IncrementScore)
	r.GET("/api/scores/top10", controllers.GetTop10)

	r.GET("/api/scores/ws", func(c *gin.Context) {
		upgrader := ws.Upgrader{ // Use the alias "ws" here
			CheckOrigin: func(r *http.Request) bool {
				return true // Allow all origins (for testing only, secure this in production)
			},
		}

		conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to establish WebSocket connection"})
			return
		}

		// Register the client to the WebSocket Hub
		websocket.WsHub.RegisterClient(conn)
	})

	return r
}
