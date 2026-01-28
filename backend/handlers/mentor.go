package handlers

import (
	"backend/database"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMentors(c *gin.Context) {
	var mentors []models.Mentor
	result := database.DB.Find(&mentors)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, mentors)
}
