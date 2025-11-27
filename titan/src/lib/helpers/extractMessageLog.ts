import {
  CAMPAIGN_APROVED_RETRAIT_AFFILIATION_CODE,
  CAMPAIGN_INDIVIDUAL_AFFILIATION_CODE,
  CAMPAIGN_WHITOUT_APROVED_RETRAIT_AFFILIATION_CODE,
  SAP_RESPONSE_INDIVIDUAL_AFFILIATION_SUCCESS_CODE,
  SAP_RESPONSE_INDIVIDUAL_WITHDRAWAL_SUCCESS_CODE,
} from "lib/config";
import { MessageLog } from "/domain/models";
import { Log } from "/lib/types";

export const formatMessageLogString = (
  messageLogs?: MessageLog[] | Log[]
): string => {
  if (messageLogs == undefined) return "No se obtuvo respuesta SAP";

  const auxMessageLog = messageLogs[0] as MessageLog;
  const isMessageLogType = Boolean(auxMessageLog?.desc);
  if (isMessageLogType) {
    const messageLogValues = messageLogs as MessageLog[];
    const messageLogFormat = messageLogValues?.map(
      (log, index) =>
        `[ ${log.codigo} - ${log.desc} ] ${
          messageLogValues.length - 1 == index ? "" : ", "
        }`
    );
    let messageLogsString = "";

    messageLogFormat?.forEach((log) => {
      messageLogsString += log;
    });

    return messageLogsString;
  } else {
    const messageLogValues = messageLogs as Log[];

    const messageLogFormat = messageLogValues?.map(
      (log, index) =>
        `[ ${log.NumeroMensaje} - ${log.TextoMensaje} ] ${
          messageLogValues.length - 1 == index ? "" : ", "
        }`
    );
    let messageLogsString = "";

    messageLogFormat?.forEach((log) => {
      messageLogsString += log;
    });

    return messageLogsString;
  }
};

export const getIfIsSapSuccess = (
  flow: number,
  messageLogs: MessageLog[]
): boolean => {
  // ======================================== INDIVIDUAL AFFILIATION FLOW ========================================
  if (flow == CAMPAIGN_INDIVIDUAL_AFFILIATION_CODE) {
    // ============================== SEARCH SAP LOGS LOOKING FOR ERRORS ==============================
    // const findSapError = messageLogs.find(
    //   (log) =>
    //     log.codigo == SAP_RESPONSE_DISTRIBUTION_DOCUMENT ||
    //     log.codigo == SAP_RESPONSE_REJECTED ||
    //     log.codigo == SAP_RESPONSE_GENERAL_REJECTED
    // );

    // ============================== SEARCH SAP LOGS LOOKING FOR SUCCESS ==============================
    const findSapSuccess = messageLogs.find(
      (log) => log.codigo == SAP_RESPONSE_INDIVIDUAL_AFFILIATION_SUCCESS_CODE
    );

    const isSapSuccess = Boolean(findSapSuccess);
    return isSapSuccess;
  }
  // ======================================== INDIVIDUAL WITHDRAWALFLOW ========================================
  if (
    flow == CAMPAIGN_APROVED_RETRAIT_AFFILIATION_CODE ||
    flow == CAMPAIGN_WHITOUT_APROVED_RETRAIT_AFFILIATION_CODE
  ) {
    // ============================== SEARCH SAP LOGS LOOKING FOR ERRORS ==============================
    // const findSapError = messageLogs.find(
    //   (log) =>
    //     log.codigo == SAP_RESPONSE_DISTRIBUTION_DOCUMENT ||
    //     log.codigo == SAP_RESPONSE_REJECTED ||
    //     log.codigo == SAP_RESPONSE_GENERAL_REJECTED
    // );

    // ============================== SEARCH SAP LOGS LOOKING FOR SUCCESS ==============================
    const findSapSuccess = messageLogs.find(
      (log) => log.codigo == SAP_RESPONSE_INDIVIDUAL_WITHDRAWAL_SUCCESS_CODE
    );

    // ============================== IF FOUND SUCCESS ==============================
    // const isSapSuccess = Boolean(findSapSuccess) && !Boolean(findSapError);
    const isSapSuccess = Boolean(findSapSuccess);
    return isSapSuccess;
  }
  return false;
};
