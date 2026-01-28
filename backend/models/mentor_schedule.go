package models

type MentorSchedule struct {
	ID         uint     `gorm:"primaryKey" json:"id"`
	MentorID   uint     `json:"mentor_id"`
	Mentor     Mentor   `gorm:"foreignKey:MentorID" json:"mentor,omitempty"`
	CourtID    uint     `json:"court_id"`
	Court      Court    `gorm:"foreignKey:CourtID" json:"court,omitempty"`
	DayOfWeek  int      `json:"day_of_week"` // 0=Sunday, 1=Monday...
	TimeslotID uint     `json:"timeslot_id"`
	Timeslot   Timeslot `gorm:"foreignKey:TimeslotID" json:"timeslot,omitempty"`
}
