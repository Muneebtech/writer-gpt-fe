export const tableData = [
  {
    id: 1,
    videoName: "Video 1",
    language: "English",
    model: "Model 1",
    topic: "Topic 1",
    outro: "Outro 1",
    gptLogs: "Logs 1",
    wordCount: "100",
    script: "Script 1",
    voiceover: "Voiceover 1",
    date: "2023-05-26",
  },
  {
    id: 2,
    videoName: "Video 2",
    language: "English",
    model: "Model 2",
    topic: "Topic 2",
    outro: "Outro 2",
    gptLogs: "Logs 2",
    wordCount: "200",
    script: "Script 2",
    voiceover: "Voiceover 2",
    date: "2023-05-27",
  },
  {
    id: 3,
    videoName: "Video 3",
    language: "English",
    model: "Model 3",
    topic: "Topic 3",
    outro: "Outro 3",
    gptLogs: "Logs 3",
    wordCount: "300",
    script: "Script 3",
    voiceover: "Voiceover 3",
    date: "2023-05-28",
  },
  {
    id: 4,
    videoName: "Video 4",
    language: "English",
    model: "Model 4",
    topic: "Topic 4",
    outro: "Outro 4",
    gptLogs: "Logs 4",
    wordCount: "400",
    script: "Script 4",
    voiceover: "Voiceover 4",
    date: "2023-05-29",
  },
  {
    id: 5,
    videoName: "Video 5",
    language: "English",
    model: "Model 5",
    topic: "Topic 5",
    outro: "Outro 5",
    gptLogs: "Logs 5",
    wordCount: "500",
    script: "Script 5",
    voiceover: "Voiceover 5",
    date: "2023-05-30",
  },
  {
    id: 6,
    videoName: "Video 6",
    language: "English",
    model: "Model 6",
    topic: "Topic 6",
    outro: "Outro 6",
    gptLogs: "Logs 6",
    wordCount: "600",
    script: "Script 6",
    voiceover: "Voiceover 6",
    date: "2023-05-31",
  },
  {
    id: 7,
    videoName: "Video 7",
    language: "English",
    model: "Model 7",
    topic: "Topic 7",
    outro: "Outro 7",
    gptLogs: "Logs 7",
    wordCount: "700",
    script: "Script 7",
    voiceover: "Voiceover 7",
    date: "2023-06-01",
  },
  {
    id: 8,
    videoName: "Video 8",
    language: "English",
    model: "Model 8",
    topic: "Topic 8",
    outro: "Outro 8",
    gptLogs: "Logs 8",
    wordCount: "800",
    script: "Script 8",
    voiceover: "Voiceover 8",
    date: "2023-06-02",
  },
  {
    id: 9,
    videoName: "Video 9",
    language: "English",
    model: "Model 9",
    topic: "Topic 9",
    outro: "Outro 9",
    gptLogs: "Logs 9",
    wordCount: "900",
    script: "Script 9",
    voiceover: "Voiceover 9",
    date: "2023-06-03",
  },
  {
    id: 10,
    videoName: "Video 10",
    language: "English",
    model: "Model 10",
    topic: "Topic 10",
    outro: "Outro 10",
    gptLogs: "Logs 10",
    wordCount: "1000",
    script: "Script 10",
    voiceover: "Voiceover 10",
    date: "2023-06-04",
  },
];

export type TableListData = {
  id: string;
  photoPath: string;
  channel: {
    channel: string;
    subscribers: number;
    photoPath: null | string;
    youtubeUrl: string;
    discordUrl: string;
    category: string;
    id: string;
  };
  language: string;
  model: {
    id: string;
    model: string;
    description: string;
  };
  topic: { id: string; topic: string; description: string };
  outro: {
    id: string;
    outro: string;
    description: string;
  };
  gptLogs: string;
  wordCount: string;
  script: string;
  // voiceover: string;
  date: string;
};
