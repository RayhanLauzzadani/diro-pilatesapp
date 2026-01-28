package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port              string
	DatabaseURL       string
	XenditSecretKey   string
	MidtransServerKey string
	MidtransClientKey string
	FrontendURL       string
}

func LoadConfig() *Config {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using system environment variables")
	}

	cfg := &Config{
		Port:              getEnv("PORT", "8080"),
		DatabaseURL:       getEnv("DATABASE_URL", ""),
		XenditSecretKey:   getEnv("XENDIT_SECRET_KEY", ""),
		MidtransServerKey: getEnv("MIDTRANS_SERVER_KEY", ""),
		MidtransClientKey: getEnv("MIDTRANS_CLIENT_KEY", ""),
		FrontendURL:       getEnv("FRONTEND_URL", "http://localhost:3000"),
	}
	log.Printf("Loaded Config - Database URL: %s", cfg.DatabaseURL)
	return cfg
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
