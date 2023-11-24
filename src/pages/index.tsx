import { Box } from "@chakra-ui/react";
import SmallWithLogoLeft from "~/components/footer";
import CallToActionWithVideo from "~/components/hero";
import Simple from "~/components/navbar";
import mqtt from "mqtt";




export default function Home() {

  // const client = mqtt.connect("ws://helhatechniquecharleroi.xyz:9001", {
  //   username: "groupe5",
  //   password: "groupe5",
  // });

  // client.on("connect", function () {
  //   console.log("Connecté au serveur MQTT");
  //   client.subscribe("/#");
  // });

  // client.on("error", function (error) {
  //   console.error("Erreur de connexion MQTT:", error);
  // });




  return (
    <><Simple />
      <Box as="main" minH={"calc(100vh - 8rem)"} >
        <CallToActionWithVideo />
        <br />
      </Box>
      <SmallWithLogoLeft />
    </>
  );
}
