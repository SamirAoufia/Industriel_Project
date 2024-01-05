import { Box, Switch, Table, TableContainer,Tbody, Td, Th, Thead,Tr} from "@chakra-ui/react";
import SmallWithLogoLeft from "~/components/footer";
import Simple from "~/components/navbar";
import { useEffect, useState } from "react";



export default function Home() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setInterval(() => {
      getTags();
    }
      , 1000);

  }, []);

  function getTags() {
    fetch("/api/getAllTags", {
      method: 'POST'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP! Statut: ${res.status}`);
        }
        return res.json();
      })
      .then(tagsData => {
        //console.log(tagsData);
        setTags(tagsData);
      })
      .catch(err => {
        //console.log(err);
      });
  }

  return (
    <><Simple/>
      <Box as="main" minH={"calc(100vh - 8rem)"} >

        
      <TableContainer>
          <Table variant='simple'>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Topic</Th>
                <Th>Lastseen</Th>
                <Th isNumeric>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tags.map((tag) => (
                <Tr key={tag.id}>
                  <Td>{tag.id}</Td>
                  <Td>{tag.topic}</Td>
                  <Td>{tag.lastseen}</Td>
                  <Td isNumeric>{tag.value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
    
      </Box>
      <SmallWithLogoLeft/>
    </>
  );
}
