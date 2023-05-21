import { RpcError } from "wagmi";

export function getErrorReason(error: any){
    const message = error.message ?? "";
    const reason = message
      .split('(reason="execution reverted: ')
      .pop()
      .split('", method=')[0];

    return reason;


}