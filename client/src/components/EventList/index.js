import React from "react";

import Event from "./Event";
import { List } from "./styles";

export default function EventList({ events }) {
  return (
    <List>
      {events.map(event => (
        <Event event={event} />
      ))}
    </List>
  );
}
