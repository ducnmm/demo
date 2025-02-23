package services

import (
	"encoding/json"
	"scoreboard-app/models"
	redisdb "scoreboard-app/redis"
)

const LeaderboardKey = "leaderboard"

func IncrementScore(userId string, displayName string) (int64, error) {
	// Store DisplayName in a Redis Hash
	err := redisdb.Rdb.HSet(redisdb.Ctx, "user_display_names", userId, displayName).Err()
	if err != nil {
		return 0, err
	}

	// Increment score atomically
	newScore, err := redisdb.Rdb.ZIncrBy(redisdb.Ctx, LeaderboardKey, 1, userId).Result()
	if err != nil {
		return 0, err
	}

	// Publish update
	scoreUpdate := models.User{
		ID:          userId,
		DisplayName: displayName,
		Score:       int(newScore),
	}
	message, _ := json.Marshal(scoreUpdate)
	redisdb.Publish("scoreboard_updates", string(message))

	return int64(newScore), nil
}

func GetTop10() ([]models.User, error) {
	users := []models.User{}
	result, err := redisdb.Rdb.ZRevRangeWithScores(redisdb.Ctx, LeaderboardKey, 0, 9).Result()
	if err != nil {
		return users, err
	}
	for _, score := range result {
		userId := score.Member.(string)

		// Get DisplayName from Redis Hash
		displayName, err := redisdb.Rdb.HGet(redisdb.Ctx, "user_display_names", userId).Result()
		if err != nil {
			displayName = "Unknown" // Default value if not found
		}

		users = append(users, models.User{
			ID:          userId,
			DisplayName: displayName,
			Score:       int(score.Score),
		})
	}
	return users, nil
}
