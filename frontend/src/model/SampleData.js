import { MdOutlineInventory2 } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";

import { MdAssignmentTurnedIn } from "react-icons/md";
import { MdAssignmentLate } from "react-icons/md";


export const dashboardData = [
    {
       title: 'Total Asset',
        number: 1040,
        icon: MdOutlineInventory2,
        key: "assets",
        text_color: "#3B82F6"
    },
    {
        title: 'Recently Added',
        number: 40,
        icon: BiAddToQueue ,
        key: "recently",
        text_color: "#22C55E"
    },
    {
        title: 'Assigned Asset',
        number: 940,
        icon: MdAssignmentTurnedIn ,
        key: "assigned",
        text_color: "#6366F1"
    },
    {
        title: 'Unassigned Asset',
        number: 300,
        icon: MdAssignmentLate,
        key: "unassigned",
        text_color: "#F59E0B"
    }
]

export const dashboardchartdata = [
  {
    name: 'Total Asset',
    value: 1040,
  },
  {
    name: 'Recently Added',
    value: 40,
  },
  {
    name: 'Assigned Asset',
    value: 940,
  },
  {
    name: 'Unassigned Asset',
    value: 300,
  },
];

export const assetData = [
  { id: 1, serialNumber: "SN-0001", name: "Dell Latitude 5420", type: "Laptop", brand: "Dell", status: "Assigned", timeCreated: "2025-02-01 09:23 AM" },
  { id: 2, serialNumber: "SN-0002", name: "Logitech MX Master 3", type: "Mouse", brand: "Logitech", status: "Unassigned", timeCreated: "2025-01-15 02:45 PM" },
  { id: 3, serialNumber: "SN-0003", name: "HP ProDesk 600 G5", type: "Desktop", brand: "HP", status: "Assigned", timeCreated: "2025-01-30 11:10 AM" },
  { id: 4, serialNumber: "SN-0004", name: "Samsung 27\" Curved Monitor", type: "Monitor", brand: "Samsung", status: "Assigned", timeCreated: "2025-02-05 04:05 PM" },
  { id: 5, serialNumber: "SN-0005", name: "Kingston 512GB SSD", type: "Storage", brand: "Kingston", status: "In Repair", timeCreated: "2025-01-20 10:32 AM" },
  { id: 6, serialNumber: "SN-0006", name: "Razer BlackWidow V3", type: "Keyboard", brand: "Razer", status: "Unassigned", timeCreated: "2025-02-07 01:25 PM" },
  { id: 7, serialNumber: "SN-0007", name: "Ubiquiti UniFi AP AC Pro", type: "Network Device", brand: "Ubiquiti", status: "Assigned", timeCreated: "2025-01-25 08:47 AM" },
  { id: 8, serialNumber: "SN-0008", name: "Canon LBP2900 Printer", type: "Printer", brand: "Canon", status: "In Repair", timeCreated: "2025-02-03 03:12 PM" },
  { id: 9, serialNumber: "SN-0009", name: "Apple MacBook Pro 14", type: "Laptop", brand: "Apple", status: "Assigned", timeCreated: "2025-01-28 09:15 AM" },
  { id: 10, serialNumber: "SN-0010", name: "Seagate 2TB External HDD", type: "Storage", brand: "Seagate", status: "Unassigned", timeCreated: "2025-01-18 05:22 PM" },
  { id: 11, serialNumber: "SN-0011", name: "Lenovo ThinkPad X1 Carbon", type: "Laptop", brand: "Lenovo", status: "Assigned", timeCreated: "2025-02-08 10:15 AM" },
  { id: 12, serialNumber: "SN-0012", name: "Asus ROG Strix G15", type: "Laptop", brand: "Asus", status: "Unassigned", timeCreated: "2025-02-09 02:40 PM" },
  { id: 13, serialNumber: "SN-0013", name: "Epson EcoTank L3250", type: "Printer", brand: "Epson", status: "In Repair", timeCreated: "2025-01-29 11:05 AM" },
  { id: 14, serialNumber: "SN-0014", name: "Corsair K95 RGB Platinum", type: "Keyboard", brand: "Corsair", status: "Assigned", timeCreated: "2025-02-10 04:20 PM" },
  { id: 15, serialNumber: "SN-0015", name: "WD Black 1TB NVMe SSD", type: "Storage", brand: "Western Digital", status: "Unassigned", timeCreated: "2025-01-22 03:33 PM" },
  { id: 16, serialNumber: "SN-0016", name: "MikroTik hAP ac²", type: "Network Device", brand: "MikroTik", status: "Assigned", timeCreated: "2025-02-04 09:10 AM" },
  { id: 17, serialNumber: "SN-0017", name: "ViewSonic 24\" IPS Monitor", type: "Monitor", brand: "ViewSonic", status: "Assigned", timeCreated: "2025-02-06 01:50 PM" },
  { id: 18, serialNumber: "SN-0018", name: "SteelSeries Rival 600", type: "Mouse", brand: "SteelSeries", status: "Unassigned", timeCreated: "2025-01-26 06:45 PM" },
  { id: 19, serialNumber: "SN-0019", name: "Synology DS220+", type: "Network Device", brand: "Synology", status: "Assigned", timeCreated: "2025-01-19 07:55 AM" },
  { id: 20, serialNumber: "SN-0020", name: "LG UltraWide 34\" Monitor", type: "Monitor", brand: "LG", status: "In Repair", timeCreated: "2025-02-02 12:05 PM" }
];


export const userData = [
  {
    id: 1,
    fullName: "John Doe",
    email: "johndoe@example.com",
    department: "IT",
    role: "Admin",
    contactNumber: "+63 912 345 6789",
    status: "Active",
    timeCreated: "2024-12-01 08:30 AM",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "janesmith@example.com",
    department: "Finance",
    role: "User",
    contactNumber: "+63 923 456 7890",
    status: "Active",
    timeCreated: "2024-12-03 02:15 PM",
  },
  {
    id: 3,
    fullName: "Michael Reyes",
    email: "mreyes@example.com",
    department: "HR",
    role: "User",
    contactNumber: "+63 934 567 8901",
    status: "Inactive",
    timeCreated: "2024-12-10 11:05 AM",
  },
  {
    id: 4,
    fullName: "Anna Lopez",
    email: "alopez@example.com",
    department: "Marketing",
    role: "User",
    contactNumber: "+63 945 678 9012",
    status: "Active",
    timeCreated: "2024-12-15 04:40 PM",
  },
  {
    id: 5,
    fullName: "Carlos Mendoza",
    email: "cmendoza@example.com",
    department: "Operations",
    role: "User",
    contactNumber: "+63 956 789 0123",
    status: "Active",
    timeCreated: "2024-12-20 09:55 AM",
  },
  {
    id: 6,
    fullName: "Emily Santos",
    email: "esantos@example.com",
    department: "IT",
    role: "User",
    contactNumber: "+63 967 890 1234",
    status: "Active",
    timeCreated: "2024-12-22 10:20 AM",
  },
  {
    id: 7,
    fullName: "Robert Cruz",
    email: "rcruz@example.com",
    department: "Logistics",
    role: "User",
    contactNumber: "+63 978 901 2345",
    status: "Inactive",
    timeCreated: "2024-12-25 03:50 PM",
  },
  {
    id: 8,
    fullName: "Sophia Garcia",
    email: "sgarcia@example.com",
    department: "Sales",
    role: "User",
    contactNumber: "+63 989 012 3456",
    status: "Active",
    timeCreated: "2024-12-28 02:25 PM",
  },
  {
    id: 9,
    fullName: "David Lim",
    email: "dlim@example.com",
    department: "Engineering",
    role: "Admin",
    contactNumber: "+63 990 123 4567",
    status: "Active",
    timeCreated: "2025-01-02 09:40 AM",
  },
  {
    id: 10,
    fullName: "Patricia Torres",
    email: "ptorres@example.com",
    department: "Procurement",
    role: "User",
    contactNumber: "+63 991 234 5678",
    status: "Active",
    timeCreated: "2025-01-05 01:15 PM",
  },
  {
    id: 11,
    fullName: "Daniel Vega",
    email: "dvega@example.com",
    department: "Support",
    role: "User",
    contactNumber: "+63 992 345 6789",
    status: "Active",
    timeCreated: "2025-01-07 10:55 AM",
  },
  {
    id: 12,
    fullName: "Isabella Ramos",
    email: "iramos@example.com",
    department: "Legal",
    role: "User",
    contactNumber: "+63 993 456 7890",
    status: "Inactive",
    timeCreated: "2025-01-10 04:20 PM",
  },
  {
    id: 13,
    fullName: "Kevin Bautista",
    email: "kbautista@example.com",
    department: "Research",
    role: "User",
    contactNumber: "+63 994 567 8901",
    status: "Active",
    timeCreated: "2025-01-12 03:45 PM",
  },
  {
    id: 14,
    fullName: "Maria Fernandez",
    email: "mfernandez@example.com",
    department: "Finance",
    role: "User",
    contactNumber: "+63 995 678 9012",
    status: "Active",
    timeCreated: "2025-01-15 11:30 AM",
  },
  {
    id: 15,
    fullName: "Thomas Young",
    email: "tyoung@example.com",
    department: "IT",
    role: "User",
    contactNumber: "+63 996 789 0123",
    status: "Active",
    timeCreated: "2025-01-18 08:10 AM",
  },
];





