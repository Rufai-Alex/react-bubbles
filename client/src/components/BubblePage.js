import React, { useState, useEffect } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import WithAuth from "./axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  // debugger

  useEffect(() => {
    WithAuth()
      .get("http://localhost:5000/api/colors")
      .then(rep => {
        setColorList(rep.data);
      })
      .catch(err => {
        debugger;
        // alert(err.response.data.error);
      });
  }, [colorList]);

  if (!colorList) {
    return <h1>loading</h1>;
  }
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
