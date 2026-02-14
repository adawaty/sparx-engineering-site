// Mock Service simulating a Neon Database Connection
// In a real backend environment (Node.js/Next.js/Serverless), you would import:
// import { neon } from "@neondatabase/serverless";

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  projectType: string;
  status: 'new' | 'read' | 'contacted';
  created_at: string;
}

// Simulated delay to mimic network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const db = {
  // Simulate SELECT * FROM contact_messages ORDER BY created_at DESC
  async getMessages(): Promise<ContactMessage[]> {
    await delay(800);
    return [
      {
        id: 104,
        name: "Mahmoud El-Sayed",
        email: "m.elsayed@tech-park.eg",
        phone: "+20 100 555 1234",
        message: "Requesting a site survey for a new warehouse in 10th of Ramadan. Need sprinkler system design.",
        projectType: "Warehouse Firefighting",
        status: "new",
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 mins ago
      },
      {
        id: 103,
        name: "Eng. Rania Kamal",
        email: "r.kamal@consultants.com",
        phone: "+20 122 333 4444",
        message: "Please send the datasheet for Meteory CO2 5kg extinguishers. We are preparing a tender.",
        projectType: "Supply Tender",
        status: "read",
        created_at: "2026-02-12T14:20:00Z"
      },
      {
        id: 102,
        name: "Hotel Manager",
        email: "manager@grandhotel.com",
        phone: "+20 111 222 3333",
        message: "Kitchen hood system (Wet Chemical) maintenance required ASAP.",
        projectType: "Maintenance",
        status: "contacted",
        created_at: "2026-02-11T09:00:00Z"
      }
    ];
  },

  // Simulate INSERT INTO contact_messages ...
  async createMessage(data: Omit<ContactMessage, 'id' | 'status' | 'created_at'>): Promise<boolean> {
    await delay(1200);
    console.log("[Neon DB] Inserted row:", data);
    return true;
  }
};
