import React, { useEffect, useState } from "react";

// import api from '../../services/api';

import { IFrame } from "./styles";

export default function Certificate({ match }) {
  const [source, setSource] = useState();

  useEffect(() => {
    async function downloadCertificate() {
      const {
        params: { certificateId }
      } = match;

      // const response = await api.get(`/certificates/${certificateId}`);
      // setSource(response);

      setSource("https://www.univates.br");

      console.log(certificateId);
    }

    downloadCertificate();
  }, [match]);

  return <IFrame title="Certificado" src={source} />;
}
