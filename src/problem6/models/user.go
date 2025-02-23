package models

type User struct {
    ID          string `json:"id"`
    DisplayName string `json:"displayName"`
    Score       int    `json:"score"`
}
