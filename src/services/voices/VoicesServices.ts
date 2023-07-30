import { generateVoice } from "@/components/Types/voice.types";
import { request } from "@/lib/axios";
export class VoiceServices {
  static getVoices() {
    return request({
      url: "/voices",
      method: "GET",
      params: "",
    });
  }
  static generateVoice(data: generateVoice) {
    return request({
      url: "/voices/text_to_speech",
      method: "POST",
      data: data,
    });
  }
}
