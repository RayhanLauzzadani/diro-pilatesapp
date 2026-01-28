package services

import (
	"backend/config"

	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
)

type MidtransService struct {
	Client snap.Client
}

func NewMidtransService(cfg *config.Config) *MidtransService {
	var client snap.Client
	client.New(cfg.MidtransServerKey, midtrans.Sandbox)
	return &MidtransService{Client: client}
}

func (s *MidtransService) GenerateSnapToken(orderID string, amount int64, customerName, customerEmail string) (string, error) {
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  orderID,
			GrossAmt: amount,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: customerName,
			Email: customerEmail,
		},
	}

	resp, err := s.Client.CreateTransaction(req)
	if err != nil {
		return "", err
	}
	return resp.Token, nil
}
