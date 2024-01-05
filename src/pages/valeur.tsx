import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import mqtt, { MqttClient } from "mqtt";
import Simple from "~/components/navbar";

export default function Home() {
  const [mqttclient, setMqttclient] = useState<MqttClient | null>();
  const [etatBoutonBlue, setEtatBoutonBlue] = useState(0);
  const [etatBoutonGreen, setEtatBoutonGreen] = useState(0);
  const [etatBoutonRed, setEtatBoutonRed] = useState(0);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    let client2 = mqttclient;

    if (!mqttclient) {
      client2 = mqtt.connect('ws://helhatechniquecharleroi.xyz', {
        username: "groupe1",
        password: "groupe1",
        port: 9001
      });
      setMqttclient(client2);
    }

    client2?.on("connect", () => {
      console.log("connexion mqtt ok");
    });
  }, [mqttclient]);

  const handleClickBlue = () => {
    const nouvelEtat = etatBoutonBlue === 0 ? 1 : 0;
    setEtatBoutonBlue(nouvelEtat);
    mqttclient?.publish('/groupe1/evt/BlueTruck2', nouvelEtat.toString());
  };

  const handleClickGreen = () => {
    const nouvelEtat = etatBoutonGreen === 0 ? 1 : 0;
    setEtatBoutonGreen(nouvelEtat);
    mqttclient?.publish('/groupe1/evt/GreenTruck2', nouvelEtat.toString());
  };

  const handleClickRed = () => {
    const nouvelEtat = etatBoutonRed === 0 ? 1 : 0;
    setEtatBoutonRed(nouvelEtat);
    mqttclient?.publish('/groupe1/evt/RedTruck2', nouvelEtat.toString());
  };

  const handleClickYellow = () => {
    handleClickGreen();
    handleClickRed();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getTags();
    }, 1000);

    return () => clearInterval(interval);
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
        const filteredTags = tagsData.filter(tag => tag.topic === 'air' || tag.topic === 'sysup');
        setTags(filteredTags);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <>
      <Simple />
      <Box as="main" minH={"calc(100vh - 8rem)"} >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
          <Button onClick={handleClickBlue} style={{ background: 'blue', color: 'white', marginRight: '10px' }}>TEST bleu</Button>
          <Button onClick={handleClickGreen} style={{ background: 'green', color: 'white', marginRight: '10px' }}>TEST vert</Button>
          <Button onClick={handleClickRed} style={{ background: 'red', color: 'white', marginRight: '10px' }}>TEST rouge</Button>
          <Button onClick={handleClickYellow} style={{ background: 'yellow', color: 'black' }}>TEST jaune</Button>
        </div>

        <br />
        <br />
        <br />
        <br />
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
    </>
  );
}
