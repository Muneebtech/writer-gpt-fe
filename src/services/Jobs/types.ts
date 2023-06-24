export type createJob = {
  videoTopic: string;
  name: string;
  photoPath?: File | undefined;
  model: string;
  outro: string;
  // script?: string | undefined;
  // wordCount?: number | undefined;
  // voice?: string | undefined;
  channel: string;
};
