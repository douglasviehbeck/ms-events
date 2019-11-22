import React, { useState } from "react";
import { Item } from "./styles";

export default function Event() {
  const [active, setActive] = useState(false);

  return (
    <li>
      <Item>
        <span>Meetup Node.js | Porto Alegre, RS | 20/12/2019 20h</span>
        <button onClick={() => setActive(!active)}>
          {active ? "Desinscrever-se" : "Inscrever-se"}
        </button>
      </Item>
    </li>
  );
}
