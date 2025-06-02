export type Message = {
  id: string
  role: "user" | "bot"
  content: string
}

export type Session = {
  step: string
  question_index?: number
  answers?: Record<string, string>
  diagnosis?: string
  registration_data?: {
    owner_name: string
    address: string
    phone: string
    pet_name: string
    animal_type: string
    age: string
    gender: string
  }
  reg_field_index?: number
  selected_schedule?: JadwalData
}

export type JadwalData = {
  id?: number // Assuming an ID might be present for selection
  nama_dokter: string
  tanggal: string
  jam_mulai: string
  jam_selesai: string
  kuota_total: number
  kuota_terpakai: number
}

export type AgentResponse = {
  reply: string
  session: Session
  jadwal_data?: JadwalData[]
  registration_data?: Session["registration_data"] // Redundant but for clarity
}

export type ResetResponse = {
  reply: string
  session: Session
}
