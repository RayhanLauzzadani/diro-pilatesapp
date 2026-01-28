const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

interface ReservationPayload {
    court_id: number;
    timeslot_id: number;
    date: string;
    payment_method: string;
    bank_id?: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
}

interface ReservationResponse {
    message: string;
    data: {
        id: number;
        booking_code: string;
        court_id: number;
        timeslot_id: number;
        reservation_date: string;
        customer_name: string;
        customer_email: string;
        payment_status: string;
        amount: number;
    };
    snap_token?: string;
}

export async function createReservation(payload: ReservationPayload): Promise<ReservationResponse> {
    const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create reservation");
    }

    return response.json();
}

export async function getCourts() {
    const response = await fetch(`${API_BASE_URL}/courts`);
    if (!response.ok) {
        throw new Error("Failed to fetch courts");
    }
    return response.json();
}

export async function getCourtById(id: number) {
    const response = await fetch(`${API_BASE_URL}/courts/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch court");
    }
    return response.json();
}

export async function getTimeslots() {
    const response = await fetch(`${API_BASE_URL}/timeslots`);
    if (!response.ok) {
        throw new Error("Failed to fetch timeslots");
    }
    return response.json();
}

export async function getMentors() {
    const response = await fetch(`${API_BASE_URL}/mentors`);
    if (!response.ok) {
        throw new Error("Failed to fetch mentors");
    }
    return response.json();
}
