import { Box } from "@chakra-ui/react";
import SmallWithLogoLeft from "~/components/footer";
import Simple from "~/components/navbar";



export default function Home() {
  return (
    <><Simple/>
      <Box as="main" minH={"calc(100vh - 8rem)"} >
    Historique
      </Box>
      <SmallWithLogoLeft/>
    </>
  );
}
