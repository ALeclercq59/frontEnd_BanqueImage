import React, { useState } from "react";
import FormAfterUpload from "../components/FormAfterUpload";

import FormUpload from "../components/FormUpload";

const Upload = () => {
  const [upload, setUpload] = useState(false);
  const [dataImage, setDataImage] = useState([]);

  const checkUpload = (dataImage) => {
    setDataImage(dataImage);
    setUpload(true);
  };

  console.log(dataImage);

  if (!upload) {
    return <FormUpload checkUpload={(data) => checkUpload(data)} />;
  } else {
    return <FormAfterUpload />;
  }
};

export default Upload;
