import { FC, InputHTMLAttributes, RefAttributes } from "react";
import { NeutralBlackText } from "../text";
import { TimePicker, TimePickerProps } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

type CustomInputOneProps = {
  id?: string;
  title?: string;
  errors?: React.ReactNode;
  placeholder?: string;
  ClassNameContainer?: string;
  onValueUpdate:Function;
  formValue:string;
};

export const TimePikerGray: FC<
  TimePickerProps<Dayjs, false> &
    RefAttributes<HTMLDivElement> &
    CustomInputOneProps
> = (
  props: TimePickerProps<Dayjs, false> &
    RefAttributes<HTMLDivElement> &
    CustomInputOneProps
) => {
  const {
    id,
    name,
    value,
    disabled,
    onChange,
    onValueUpdate,
    formValue,
    errors,
    title = "",
    placeholder,
    ClassNameContainer: ClassName,
    minTime="08:00 AM",
    maxTime="06:00 PM"
  } = props;

  const handleChange = (e:dayjs.Dayjs | null) =>{
    const dbFormat = e?.format("hh:mm A")
    console.log("Change Time:", e);
    console.log("Change Time DB:", dbFormat);
    onValueUpdate(name, dbFormat);
  }

  const getTimeFormatted = (input:string | null | undefined) =>{
    try {
      
      if (input !== ""){
        return dayjs(input, "hh:mm A")
      }
      else{
        return dayjs().hour(0).minute(0).second(0)
      }
    } catch (error) {
      console.log("invalid time received:", input, error) 
    }
    return dayjs().hour(0).minute(0).second(0)
  }

  return (
    <div
      className={` ${
        errors ? " h-[calc(108px)]" : " h-[calc(68px)]"
      } ${ClassName}`}
    >
      <div className="w-full h-full">
        <NeutralBlackText
          className={"text-principal-450 h-[calc(20px)]"}
          text={title}
        />
        <div className="h-[48px] bg-[#FFF]">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={getTimeFormatted(formValue)}
              name={name}
              disabled={disabled}
              className=" border-principal-400 w-full"
              slotProps={{ textField: { size: 'small', style:{backgroundColor:"#FFF"} } }}              
              //label={placeholder}
              onChange={handleChange}
              sx={{
                ".MuiInputBase-root": {
                  //color: "#bbdefb",
                  //borderRadius: "2px",
                  //borderWidth: "1px",
                  //borderColor: "#C7D2E6",
                  //border: "1px solid",
                  backgroundColor: "#FFF",                  
                } as const,              
                ".MuiOutlinedInput-notchedOutline": {                  
                  border: "2px solid #C7D2E6",
                  //backgroundColor: "#FFF",
                  //outerHeight: "48px",
                  height:"52px", // mayor from parent to stretch
                  minHeight:"52px",                  
                } as const,
              }}
              views={['hours', 'minutes']}
              minutesStep={60}
              minTime={getTimeFormatted(minTime.toString())}
              maxTime={getTimeFormatted(maxTime.toString())}
              closeOnSelect={false}
            />
          </LocalizationProvider>
        </div>
        <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
          {errors}
        </div>
      </div>
    </div>
  );
};
