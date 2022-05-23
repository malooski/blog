export interface PostMetadata {
    title: string;
    plug: string;
    createdAt: Date;
    updatedAt?: Date;
    contentUrl: string;
    tags?: string[];
    wip?: boolean;
}

export const POSTS: PostMetadata[] = [
    {
        title: "Discord, Fix What You Broke!",
        plug: "discord-fix-what-you-broke",
        createdAt: new Date("2022-05-21T08:27:32.759Z"),
        contentUrl: require("./fix-it-discord.md"),
        tags: ["discord"],
        wip: true,
    },
    {
        title: "Coding your own blog site",
        plug: "coding-your-own-blog-site",
        createdAt: new Date("2022-05-21T08:27:32.759Z"),
        contentUrl: require("./blogging-for-free.md"),
        tags: ["dev"],
        wip: true,
    },
    {
        title: "VR's Future Is Endangered",
        plug: "vr-future-is-endangered",
        createdAt: new Date("2022-05-21T08:27:32.759Z"),
        contentUrl: require("./vr-endangered.md"),
        tags: ["vr"],
        wip: true,
    },
];
