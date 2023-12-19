import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Historial from "./components/Historial";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

const opciones = {
  marcas: ["Toyota", "Honda", "Ford"],
  modelos: [
    "Corolla",
    "Etios",
    "Hilux",
    "Fix",
    "Civic",
    "Fiesta",
    "Focus",
    "EcoSport",
    "Ranger",
  ],
  anios: [2023, 2022, 2021, 2020],
  combustibles: ["Nafta", "Diésel", "Gas"],
  tiposSeguro: ["Básico", "Intermedio", "Completo"],
};

function App() {
  const [marcas, setMarcas] = useState(opciones.marcas);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [combustible, setCombustible] = useState("");
  const [tipoSeguro, setTipoSeguro] = useState("");
  const [cotizacion, setCotizacion] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [error, setError] = useState(null);

  const mostrarHistorialHandler = () => {
    setMostrarHistorial(true);
  };

  const mostrarCotizacionHandler = () => {
    setMostrarHistorial(false);
  };

  const mostrarError = (mensaje) => {
    setError(mensaje);
  };

  const limpiarError = () => {
    setError(null);
  };

  const calcularCotizacion = () => {
    if (!(marca && modelo && anio && combustible && tipoSeguro)) {
      mostrarError(
        "Por favor, seleccione todas las opciones antes de calcular la cotización."
      );
      return;
    }

    let cotizacionCalculada = 9000;

    switch (combustible) {
      case "Nafta":
        cotizacionCalculada *= 1.2;
        break;
      case "Diésel":
        cotizacionCalculada *= 1.5;
        break;
      case "Gas":
        cotizacionCalculada *= 1.7;
        break;
      default:
        break;
    }

    switch (tipoSeguro) {
      case "Básico":
        cotizacionCalculada *= 1.3;
        break;
      case "Intermedio":
        cotizacionCalculada *= 1.5;
        break;
      case "Completo":
        cotizacionCalculada *= 1.7;
        break;
      default:
        break;
    }

    setCotizacion(cotizacionCalculada);

    const consulta = `${marca} ${modelo} ${anio} ${combustible} ${tipoSeguro}`;
    const cotizacionTexto = `Cotización: $${cotizacionCalculada}`;

    const nuevaEntrada = `${cotizacionTexto} - ${consulta}`;
    // Verificar si la entrada ya existe en el historial
    if (!historial.includes(nuevaEntrada)) {
      // Agregar al historial si no existe
      setHistorial((prevHistorial) => [nuevaEntrada, ...prevHistorial]);
      localStorage.setItem(
        "historial",
        JSON.stringify([nuevaEntrada, ...prevHistorial])
      );
    } else {
      mostrarError("Esta cotización ya existe en el historial.");
    }
  };

  const limpiarHistorialHandler = () => {
    setHistorial([]);
    localStorage.removeItem("historial");
  };

  return (
    <Router>
      <div className="App">
        {error && <ErrorMessage message={error} />}
        <div>
          <nav>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ display: "inline", marginRight: "10px" }}>
                <Link to="/">Home</Link>
              </li>
              <li style={{ display: "inline" }}>
                <Link to="/historial">Historial</Link>
              </li>
            </ul>
          </nav>
          <h1 className="titulo">Seguros MJM</h1>

          <Routes>
            <Route
              path="/historial"
              element={
                <Historial
                  historial={historial}
                  limpiarHistorial={limpiarHistorialHandler}
                />
              }
            />
          </Routes>
        </div>
        <div>
          <label>
            Marca:
            <select value={marca} onChange={(e) => setMarca(e.target.value)}>
              <option value="" disabled>
                Seleccione marca
              </option>
              {marcas.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Modelo:
            <select value={modelo} onChange={(e) => setModelo(e.target.value)}>
              <option value="">Seleccione modelo</option>
              {opciones.modelos.map((mod) => (
                <option key={mod} value={mod}>
                  {mod}
                </option>
              ))}
            </select>
          </label>
        </div>
        <br />
        <div>
          <label>
            Año:
            <select value={anio} onChange={(e) => setAnio(e.target.value)}>
              <option value="">Seleccione año</option>
              {opciones.anios.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
        </div>
        <br />
        <div>
          <label>
            Combustible:
            <select
              value={combustible}
              onChange={(e) => setCombustible(e.target.value)}
            >
              <option value="">Tipo de combustible</option>
              {opciones.combustibles.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
        <br />
        <div>
          <label>
            Tipo de Seguro:
            <select
              value={tipoSeguro}
              onChange={(e) => setTipoSeguro(e.target.value)}
            >
              <option value="">Tipo de seguro</option>
              {opciones.tiposSeguro.map((ts) => (
                <option key={ts} value={ts}>
                  {ts}
                </option>
              ))}
            </select>
          </label>
        </div>

        <br />
        <button onClick={calcularCotizacion}>Calcular Cotización</button>
        {cotizacion && (
          <div className="cotizacion">
            <h2>Cotización: ${cotizacion}</h2>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
