import mqtt from "mqtt";

// import { Prisma } from "@prisma/client";
// import { db } from "./server/db";

// const prisma = new Prisma()

const client = mqtt.connect("mqtt://helhatechniquecharleroi.xyz", {
    username: "groupe5",
    password: "groupe5",
    port: 1883
})

client.on("connect", () => {
    console.log("connected");
    client.subscribe("/groupe5/#");
})


// client.on("message", async (topicMQTT, value) => {
//     console.log(topicMQTT + "\t", value.toString());

//     const tag = await db.tag.upsert({
//         where: {
//             topic: topicMQTT
//         },
//         create: { 
//             topic: topicMQTT
//             value: value.toString()

//         }
//     })

// }