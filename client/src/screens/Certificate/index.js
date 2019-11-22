import React, { useEffect } from "react";

import { Container } from "./styles";

export default function Certificate({ match }) {
  useEffect(() => {
    const {
      params: { certificateId }
    } = match;

    alert(certificateId);
  }, []);

  return <Container>oi</Container>;
}
