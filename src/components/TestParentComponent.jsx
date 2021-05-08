import React, { useState, useEffect } from "react";

import Child from "./ChildList";

const Parent = () => {
  const [listChoice, setListChoice] = useState([]);

  useEffect(() => {
    console.log(listChoice);
  }, [listChoice]);

  const addListChoice = (data) => {
    console.log(data);
    setListChoice(listChoice.concat(data));
  };

  const removeListChoice = (data) => {
    console.log(data);
    setListChoice(listChoice.filter((item) => item !== data));
  };

  return (
    <div>
      Bonjour Parent ici
      <Child
        listChoice={listChoice}
        addListChoice={(data) => addListChoice(data)}
        removeListChoice={(data) => removeListChoice(data)}
      />
    </div>
  );
};

export default Parent;
