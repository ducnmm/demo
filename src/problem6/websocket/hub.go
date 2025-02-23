package websocket

import (
	"sync"

	"github.com/gorilla/websocket"
)

type Hub struct {
	Clients   map[*websocket.Conn]bool
	Broadcast chan []byte
	Mutex     sync.Mutex
}

var WsHub = Hub{
	Clients:   make(map[*websocket.Conn]bool),
	Broadcast: make(chan []byte),
}

func (h *Hub) Run() {
	for {
		message := <-h.Broadcast
		h.Mutex.Lock()
		for client := range h.Clients {
			err := client.WriteMessage(websocket.TextMessage, message)
			if err != nil {
				client.Close()
				delete(h.Clients, client)
			}
		}
		h.Mutex.Unlock()
	}
}

func (h *Hub) RegisterClient(conn *websocket.Conn) {
	h.Mutex.Lock()
	h.Clients[conn] = true
	h.Mutex.Unlock()
}
