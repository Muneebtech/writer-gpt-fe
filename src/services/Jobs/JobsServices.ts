import { request } from "@/lib/axios";
import { createJob } from "./types";
export class JobServices {
  static getJobs() {
    return request({
      url: "/job",
      method: "GET",
    });
  }
  static createJob(data: FormData) {
    return request({
      url: "/job",
      method: "POST",
      data: data,
    });
  }
  static rewriteJob(data: any) {
    return request({
      url: "/job/rewrite",
      method: "POST",
      data: data,
    });
  }
  static newCommandJob(data: any) {
    return request({
      url: "/job/newCommand",
      method: "POST",
      data: data,
    });
  }
}
