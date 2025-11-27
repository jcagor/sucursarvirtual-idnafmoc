interface ExtrasStatusInterface {
  IdState: number;
}

interface DataStatusInterface {
  Extras: ExtrasStatusInterface;
}

interface StatusInterface {
  idState: number;
}

export const dataTransactionStatus = (data: DataStatusInterface) => {
  const { IdState } = data.Extras;
  const status: StatusInterface = {
    idState: IdState,
  };
  return status;
};
