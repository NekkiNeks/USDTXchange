type unifiedResponse = {
  success: boolean;
  data: any;
  message: string | string[] | null;
  status: number;
};

export default unifiedResponse;
