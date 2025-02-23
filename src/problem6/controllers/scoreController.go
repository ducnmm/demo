package controllers

import (
    "net/http"
    "scoreboard-app/services"
    "github.com/gin-gonic/gin"
)

// Capitalize to export the struct
type IncrementRequest struct {
    UserId      string `json:"userId" binding:"required"`
    DisplayName string `json:"displayName" binding:"required"`
}

func IncrementScore(c *gin.Context) {
    var req IncrementRequest
    // Bind JSON request body to struct
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
        return
    }

    // Use the values from the request body
    newScore, err := services.IncrementScore(req.UserId, req.DisplayName)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to increment score"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"newScore": newScore})
}

func GetTop10(c *gin.Context) {
    top10, err := services.GetTop10()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get top 10"})
        return
    }

    c.JSON(http.StatusOK, top10)
}
