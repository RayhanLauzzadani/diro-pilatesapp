package handlers

import (
	"backend/database"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetTimeslots(c *gin.Context) {
	var timeslots []models.Timeslot
	result := database.DB.Find(&timeslots)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, timeslots)
}
