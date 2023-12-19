import React from "react";

const Historial = ({ historial, limpiarHistorial }) => {
  const styles = {
    container: {
      marginBottom: "20px",
      border: "2px solid grey",
      color:"white",
      fontSize:"20px",
      padding:"20px",
    },
    title: {
      fontSize: "1.5em",
      marginBottom: "10px",
    },
    list: {
      listStyleType: "none",
      padding: "0",
    },
    listItem: {
      marginBottom: "5px",
    },
    button: {
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <ul style={styles.list}>
        {historial.map((item, index) => (
          <li key={index} style={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
      <button style={styles.button} onClick={limpiarHistorial}>
        Limpiar Historial
      </button>
    </div>
  );
};

export default Historial;
