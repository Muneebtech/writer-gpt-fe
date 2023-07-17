import { ManagerType } from "@/components/Types/manager.type";
import { request } from "@/lib/axios";


export class getManagersServices {
    static getManagers(){
        return request({
            url:"/users",
            method:"GET",
        })
    }
    static addManager(data:ManagerType){
        return request({
            url:"/users",
            method:"POST",
            params:data
        })
    }
}
// ?role=Manage