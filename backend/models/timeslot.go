package models

type Timeslot struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	StartTime string `json:"start_time"` // Format "HH:MM"
	EndTime   string `json:"end_time"`   // Format "HH:MM"
	Label     string `json:"label"`      // "08:00 - 09:00"
}
