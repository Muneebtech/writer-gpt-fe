export type createChannelTypes = {
    channel: string;
    category: string;
    youtubeLink: string;
    discordLink: string;
    photoPath: File | any;
}

export type getChannelTypes = {
        id: string;
        channel: string;
        category: {
          category: string;
          id: string;
        };
        youtubeLink: string;
        discordLink: string;
        photoPath: File | any;
        subscribers:string
      
}