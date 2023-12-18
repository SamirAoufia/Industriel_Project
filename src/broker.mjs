import mqtt from "mqtt";

import { PrismaClient } from "@prisma/client";


const db = new PrismaClient();

const client = mqtt.connect("mqtt://helhatechniquecharleroi.xyz", {
    username: "groupe1",
    password: "groupe1",
    port: 1883,
})

client.on("connect", () => {
    console.log("connected");
    client.subscribe("/groupe1/#");
})



client.on("message",(topicMQTT, value) => {
    topicMQTT = topicMQTT.replace("/groupe1/", "");
    console.log(topicMQTT + "\t", value.toString());

    db.tag.upsert({

        where: {
            topic: topicMQTT
        },
        create: {
            topic: topicMQTT,
            value: value.toString(),
        },
        update: {
            value: value.toString(),
            lastseen: new Date(),
        }
    }).then(() => {
        console.log("done");
        
    }).catch((err) => {
        console.error("Erreur", err)
        
    });
});