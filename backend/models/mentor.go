package models

import "time"

type Mentor struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `json:"name"`
	PhotoURL  string    `json:"photo_url"`
	Specialty string    `json:"specialty"`
	Bio       string    `json:"bio"`
	IsActive  bool      `json:"is_active" gorm:"default:true"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
