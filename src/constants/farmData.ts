export type ActivityType = "Pemupukan" | "Penyiraman" | "Pengendalian Hama" | "Panen" | "Olah Tanah";

export interface FarmLog {
  id: string;
  plotName: string;
  cropName: string;
  activity: ActivityType;
  date: string;
  cost: number;
  note: string;
}

export const INITIAL_LOGS: FarmLog[] = [
  {
    id: "1",
    plotName: "Lahan A (Utara)",
    cropName: "Padi Inpari 32",
    activity: "Olah Tanah",
    date: "2023-10-01",
    cost: 500000,
    note: "Sewa traktor untuk bajak sawah",
  },
  {
    id: "2",
    plotName: "Lahan B (Selatan)",
    cropName: "Jagung Manis",
    activity: "Pemupukan",
    date: "2023-10-05",
    cost: 250000,
    note: "Pupuk Urea dan NPK 50kg",
  },
  {
    id: "3",
    plotName: "Lahan C (Samping Rumah)",
    cropName: "Cabai Rawit",
    activity: "Pengendalian Hama",
    date: "2023-10-08",
    cost: 150000,
    note: "Penyemprotan pestisida nabati",
  },
  {
    id: "4",
    plotName: "Lahan A (Utara)",
    cropName: "Padi Inpari 32",
    activity: "Penyiraman",
    date: "2023-10-09",
    cost: 50000,
    note: "BBM untuk pompa air irigasi",
  }
];
