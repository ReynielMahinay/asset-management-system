import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

export const typeOptions = [
  { id: 1, value: "laptop", label: "Laptop" },
  { id: 2, value: "charger", label: "Charger" },
  { id: 3, value: "laptop-bag", label: "Laptop bag" },
  { id: 4, value: "mouse", label: "Mouse" },
  { id: 5, value: "keyboard", label: "Keyboard" },
  { id: 6, value: "monitor", label: "Monitor" },
  { id: 7, value: "", label: "None" },
];

export const brandOptions = [
  { id: 1, value: "dell", label: "Dell" },
  { id: 2, value: "logitech", label: "Logitech" },
  { id: 3, value: "hp", label: "HP" },
  { id: 4, value: "samsung", label: "Samsung" },
  { id: 5, value: "kingston", label: "Kingston" },
  { id: 6, value: "razer", label: "Razer" },
  { id: 7, value: "ubiquiti", label: "Ubiquiti" },
  { id: 8, value: "canon", label: "Canon" },
  { id: 9, value: "apple", label: "Apple" },
  { id: 10, value: "seagate", label: "Seagate" },
  { id: 11, value: "", label: "None" },
];

export const statusOptions = [
  { value: "assigned", label: "Assigned" },
  { value: "unassigned", label: "Unassigned" },
];

export const assetTypeOptions = [
  {
    id: 1,
    value: "laptop",
    label: "Laptop",
  },
  {
    id: 2,
    value: "monitor",
    label: "Monitor",
  },
  {
    id: 3,
    value: "mouse",
    label: "Mouse",
  },
  {
    id: 4,
    value: "ssd",
    label: "SSD",
  },
  {
    id: 5,
    value: "headset",
    label: "Headset",
  },
];

export const roleOptions = [
  { id: 1, value: "techinical", label: "Technical" },
  { id: 2, value: "Pre-sales", label: "Pre-sales" },
];

export const userRoleOptions = [
  { id: 1, value: "admin", label: "Admin" },
  { id: 2, value: "manager", label: "Manager" },
];

export const departmentOptions = [
  { id: 1, value: "it", label: "IT" },
  { id: 2, value: "finance", label: "Finance" },
  { id: 3, value: "hr", label: "HR" },
  { id: 4, value: "marketing", label: "Marketing" },
  { id: 5, value: "operations", label: "Operations" },
  { id: 7, value: "sales", label: "Sales" },
  { id: 8, value: "engineering", label: "Engineering" },
  { id: 10, value: "support", label: "Support" },
  { id: 13, value: "", label: "None" },
];

export const AssetAcionIcon = [
  {
    id: "view",
    Icon: FaRegEye,
  },
  {
    id: "edit",
    Icon: FaRegEdit,
  },
  {
    id: "delete",
    Icon: RiDeleteBinLine,
  },
];

export const UserAcionIcon = [
  {
    id: "view",
    Icon: FaRegEye,
  },
  {
    id: "edit",
    Icon: FaRegEdit,
  },
  {
    id: "delete",
    Icon: RiDeleteBinLine,
  },
];
