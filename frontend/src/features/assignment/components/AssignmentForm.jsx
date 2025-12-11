import DatePickerComponent from "../../../components/common/DatePickerComponent";
import SelectAssignment from "./SelectAssignment";
import { Divider } from "antd";
import { statusOptions } from "../../../data/options";
import TextAreaComponent from "../../../components/common/TextAreaComponent";
import SelectedAssetContainer from "../../../components/common/SelectedAssetContainer";
import Button from "../../../components/common/Button";
function AssignmentForm({ data = [], value, label, onChange, getOptionLabel }) {
  return (
    <div className="flex flex-col">
      <form action="" className="space-y-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 justify-start items-center">
            <div className="w-[50%]">
              <SelectAssignment
                options={statusOptions}
                bg_color="#f5f7f9"
                placeholder="Select user"
              />
            </div>
            <div className="w-[50%]">
              <DatePickerComponent bg_color="#f5f7f9" />
            </div>
          </div>
          <div>
            <TextAreaComponent />
          </div>
        </div>

        <Divider />

        <div className="w-full h-[230px]">
          <SelectedAssetContainer />
        </div>

        <div className="flex justify-center items-center">
          <Button title="Assigned Asset" variant="modal_primary" />
        </div>
      </form>
    </div>
  );
}

export default AssignmentForm;
