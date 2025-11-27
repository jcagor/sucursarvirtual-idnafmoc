"use client";

import GetBusinessStatusUseCase from "domain/usecases/Business/getBusinessStatus.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { BUSINESS_STATUS } from "lib";
import { HomeTemplate, SidebarMenu } from "presentation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "presentation/store";
import { setBusinessStatus } from "presentation/store/slices/businessStatusSlice";

export default function TemporalPage() {
  const [isLoadingValidation, setIsLoadingValidation] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    GetBusinessStatus();
  }, []);

  const GetBusinessStatus = async () => {
    const GetBusinessStatus = appContainer.get<GetBusinessStatusUseCase>(
      USECASES_TYPES._GetBusinessStatus
    );
    const response = await GetBusinessStatus.execute();
    if (!response) {
      dispatch(setBusinessStatus(BUSINESS_STATUS.INVALIDATED));
      return;
    }
    dispatch(setBusinessStatus(response));
    setIsLoadingValidation(false);
  };

  if (isLoadingValidation) return null;

  return (
    <SidebarMenu>
      <HomeTemplate />
    </SidebarMenu>
  );
}
