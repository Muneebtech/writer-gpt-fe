export type Job ={
    topic: string;
    name: string;
    photoPath?: File;
    model: string;
    outro: string | number;
    script?: string;
    wordCount?: number;
    voice?: string;
    channel: string;
  }