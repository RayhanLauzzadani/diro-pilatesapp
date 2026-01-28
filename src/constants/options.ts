export const LOCATIONS = [
    { value: "jakarta-selatan", label: "Jakarta Selatan" },
    { value: "jakarta-pusat", label: "Jakarta Pusat" },
    { value: "bandung", label: "Bandung" },
    { value: "surabaya", label: "Surabaya" },
] as const;

export const TIMES = [
    { value: "07:00", label: "07:00" },
    { value: "08:00", label: "08:00" },
    { value: "09:00", label: "09:00" },
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "14:00", label: "14:00" },
    { value: "15:00", label: "15:00" },
    { value: "16:00", label: "16:00" },
    { value: "17:00", label: "17:00" },
    { value: "18:00", label: "18:00" },
] as const;

export const PARTICIPANTS = [
    { value: "1", label: "1 Person" },
    { value: "2", label: "2 People" },
    { value: "3", label: "3 People" },
    { value: "4", label: "4 People" },
    { value: "5", label: "5 People" },
] as const;

export const CLASS_TYPES = [
    "Reformer",
    "Mat Pilates",
    "Private",
    "Group",
    "Yoga",
] as const;

export const PRICE_RANGES = [
    { label: "Under Rp 100.000", min: 0, max: 100000 },
    { label: "Rp 100.000 - Rp 150.000", min: 100000, max: 150000 },
    { label: "Rp 150.000 - Rp 200.000", min: 150000, max: 200000 },
    { label: "Above Rp 200.000", min: 200000, max: Infinity },
] as const;
