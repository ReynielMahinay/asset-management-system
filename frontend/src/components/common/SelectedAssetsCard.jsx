import { IoClose } from "react-icons/io5";

function SelectedAssetsCard() {
  return (
    <div className="flex flex-row font-poppins justify-between items-center bg-[#f5f7f9] border-[#99a1af] border-1 rounded-[10px] h-[60px] px-3">
      <div>
        <p className="font-semibold">HP EliteDesk 800 G6</p>
        <p className="text-xs">HD-004</p>
      </div>
      <div>
        <IoClose />
      </div>
    </div>
  );
}

export default SelectedAssetsCard;
