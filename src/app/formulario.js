import React, { useState } from "react";
import {
  Card,
  SelectItem,
  Select,
  Input,
  CardHeader,
  Button,
  CardFooter,
  CardBody,
} from "@nextui-org/react";
import TestVocacional from "./testvocacional";
import MyButton from "./mybutton";

// components/Formulario.js
const Formulario = ({ setUserData, userData }) => {
  const [mostrarTestVocacional, setMostrarTestVocacional] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [genero, setGenero] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [camposEnAdvertencia, setCamposEnAdvertencia] = useState({});

  const handleIrAlTest = () => {
    const camposFaltantes = [];

    if (!nombre) {
      camposFaltantes.push("Nombre");
    }
    if (!apellido) {
      camposFaltantes.push("Apellido");
    }
    if (!genero) {
      camposFaltantes.push("Genero");
    }
    if (!edad) {
      camposFaltantes.push("Edad");
    }
    if (!email) {
      camposFaltantes.push("Email");
    }
    if (!telefono) {
      camposFaltantes.push("Telefono");
    }

    if (camposFaltantes.length === 0) {
      setUserData({ nombre, apellido, genero, edad, email, telefono });
      setMostrarTestVocacional(true);
    } else {
      // Establecer los campos en estado de advertencia
      const camposEnAdvertenciaTemp = {};
      camposFaltantes.forEach((campo) => {
        camposEnAdvertenciaTemp[campo.toLowerCase()] = true;
      });
      setCamposEnAdvertencia(camposEnAdvertenciaTemp);
    }
  };
  const handleEdadChange = (e) => {
    const newEdad = e.target.value;
    // Convertir el valor a número y comprobar si está en el rango
    const edadNum = Number(newEdad);
    if (edadNum >= 1 && edadNum <= 100) {
      setEdad(newEdad);
    }
  };

  if (mostrarTestVocacional) {
    return <TestVocacional setUserData={setUserData} userData={userData} />;
  }

  return (
    <>
      <Card className=" max-w-[800px]  w-1/2 p-8 flex-col flex gap-5 ">
        <CardHeader className="flex gap-3 font-sans">
          <h1>Registrate Aqui!</h1>
        </CardHeader>
        <div className="w-full flex flex-col gap-4 font-sans">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              size="md"
              type="text"
              label="Nombre"
              placeholder="Ingrese su nombre"
              color={camposEnAdvertencia.nombre ? "danger" : "default"}
              onBlur={() =>
                setCamposEnAdvertencia({
                  ...camposEnAdvertencia,
                  nombre: false,
                })
              }
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              size="md"
              type="text"
              label="Apellido"
              placeholder="Ingrese su apellido"
              color={camposEnAdvertencia.apellido ? "danger" : "default"}
              onBlur={() =>
                setCamposEnAdvertencia({
                  ...camposEnAdvertencia,
                  apellido: false,
                })
              }
            />
          </div>
          <Select
            value={genero}
            onChange={(e) => {
              setGenero(e.target.value);
            }}
            label="Genero"
            placeholder="Ingrese genero"
            className="w-full dark:p-20"
            color={camposEnAdvertencia.genero ? "danger" : "default"}
            onBlur={() =>
              setCamposEnAdvertencia({
                ...camposEnAdvertencia,
                genero: false,
              })
            }
          >
            <SelectItem key="masculino" value="masculino">
              Masculino
            </SelectItem>
            <SelectItem key="femenino" value="femenino">
              Femenino
            </SelectItem>
            <SelectItem key="otro" value="otro">
              Otro
            </SelectItem>
            <SelectItem key="prefiero-no-decirlo" value="prefiero-no-decirlo">
              Prefiero No Decirlo
            </SelectItem>
          </Select>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              value={edad}
              onChange={handleEdadChange}
              size="md"
              type="number"
              label="Edad"
              placeholder="Ingrese Su Edad"
              max={100}
              min={1}
              color={camposEnAdvertencia.edad ? "danger" : "default"}
              onBlur={() =>
                setCamposEnAdvertencia({
                  ...camposEnAdvertencia,
                  edad: false,
                })
              }
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="md"
              type="email"
              label="Email"
              placeholder="Enter your email"
              color={camposEnAdvertencia.email ? "danger" : "default"}
              onBlur={() =>
                setCamposEnAdvertencia({
                  ...camposEnAdvertencia,
                  email: false,
                })
              }
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              size="md"
              type="tel"
              label="Telefono"
              placeholder="Ingrese su numero"
              color={camposEnAdvertencia.telefono ? "danger" : "default"}
              onBlur={() =>
                setCamposEnAdvertencia({
                  ...camposEnAdvertencia,
                  telefono: false,
                })
              }
            />
          </div>
        </div>
        <CardFooter className="flex justify-end items-center p-8 font-sans">
          <MyButton onClick={handleIrAlTest}>Enviar</MyButton>
        </CardFooter>
      </Card>
    </>
  );
};

export default Formulario;
