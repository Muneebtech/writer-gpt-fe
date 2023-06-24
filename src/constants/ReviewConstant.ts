import { StringLiteralType } from "typescript";

export const CreateReviewData = [{
    id: 1,
    VideoScriptName: "A Morning Prayer To Break Through Every Obstacle",
    Channel: "Morning Prayer",
    Category: "Category",
    Religion: "Religion",
    Topic: "OvercomingObstacles",
    Languagemodal: "Main",
    Outros: "Outro 1",
    Voice: "Male (peaceful)"

}]

export type ReviewDataTypes = {
    id: number
    VideoScriptName: string;
    Channel: string;
    Category: string;
    Religion: string;
    Topic: string;
    Languagemodal: string;
    Outros: string;
    Voice: string

}