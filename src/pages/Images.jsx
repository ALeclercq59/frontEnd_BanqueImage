import React from "react";

const Images = () => {
  return (
    <div>
      Bonjour Images
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      SALUT
      <TextField
        id="outlined-multiline"
        label="Description"
        multiline
        rows={6}
        variant="outlined"
        fullWidth={true}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Switch
        onChange={(e) => setChecked(e.valueOf())}
        checked={checked}
        id="normal-switch"
      />
    </div>
  );
};

export default Images;
