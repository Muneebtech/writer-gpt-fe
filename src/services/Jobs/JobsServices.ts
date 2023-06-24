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
}
