import Image from "next/image"
export const ChannelCategoryDataMap = [
    {
        id: 1,
        title: "Morning Prayer",
        descrp: "Religion,  Chemistry"
    },
    {
        id: 2,
        title: "Morning Prayer",
        descrp: "Religion,  Chemistry"
    },
    {
        id: 3,
        title: "Morning Prayer",
        descrp: "Religion,  Chemistry"
    },
    {
        id: 4,
        title: "Morning Prayer",
        descrp: "Religion,  Chemistry"
    },
    {
        id: 5,
        title: "Morning Prayer",
        descrp: "Religion,  Chemistry"
    },
    {
        id: 6,
        title: "Morning Prayer",
        descrp: "Religion,  Chemistry"
    },
    {
        id: 7,
        title: "Morning Prayer",
        descrp: "Religion,  Chemistry"
    },
    {
        id: 8,
        title: "Morning Prayer",
        descrp: "Religion,  Chemistry"
    },
    {
        id: 9,
        title: "Morning Prayer",
        descrp: "Religion,  Chemistry"
    },
    {
        id: 10,
        title: "Morning Prayer",
        descrp: "Religion,  Chemistry"
    },
    {
        id: 11,
        title: "Morning Prayer",
        descrp: "Religion,  Chemistry"
    },
    {
        id: 12,
        title: "Morning Prayer",
        descrp: "Religion,  Chemistry"
    },


]
export type VoiceData = {
    name: string;
    preview_url: string
    voice_id: string
    labels: {
        accent: string
        age: string
        description: string
        gender: string
        usecase: string
    }

}
export type Channel = {
    channel: string;
    subscribers: number;
    photoPath: string;
    description: string;
    youtubeUrl: string;
    discordUrl: string;
    category: {
        category: string;
        id: string;
    };
    id: string;
}
