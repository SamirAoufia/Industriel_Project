import { Box, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import SmallWithLogoLeft from "~/components/footer";
import Simple from "~/components/navbar";
import BasicStatistics from "~/components/val";



export default function Home() {
  return (
    <><Simple/>
      <Box as="main" minH={"calc(100vh - 8rem)"} >
    <BasicStatistics/>
    <br />
    <br />
    <br />
    <br />
    <TableContainer>
  <Table variant='simple'>
    <TableCaption>
        <br />
        <br />
        <br />
        <br />
    </TableCaption>
    <Thead>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>


      </Box>


      <SmallWithLogoLeft/>
    </>
  );
}
