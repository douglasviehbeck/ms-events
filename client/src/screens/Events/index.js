import React from "react";

import Header from "../../components/Header";
import EventList from "../../components/EventList";
import { Container } from "./styles";

export default function Events({ navigation }) {
  const data = new Array(50);
  data.fill(true);

  return (
    <Container>
      <Header />
      <EventList events={data} />
    </Container>
  );
}
