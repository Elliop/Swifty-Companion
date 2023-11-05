import React from "react";
import ModalSelector from "react-native-modal-selector";

export const Projects = ({ cursusList, setSelectedCursus }) => {
  const handleChange = (selected) => {
    setSelectedCursus(selected.key);
  };

  return (
    <ModalSelector
      data={cursusList}
      onChange={handleChange}
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "flex-end",
      }}
      initValue="Select Cursus..."
    />
  );
};

export default Projects;
