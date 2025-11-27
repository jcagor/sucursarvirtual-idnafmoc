import { TextInterface } from "lib";
import React, { FC } from "react";

export const BigTextBanner:FC<TextInterface> = ({text, className}) =>{

    return(
        <div className="w-full h-32 my-5 p-5 bg-[#05C3DD] rounded-lg">
            <p className="w-full text-[#FFF] text-center">Dirección Ingresada:</p>
            <p className="w-full text-[#FFF] text-center">
                <span className="text-[2rem] text-wrap">{text === "" ? "AV 6A # 28 NORTE - 09":text}</span>
            </p>
        </div>
    );
}