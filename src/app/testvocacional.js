import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Radio,
  RadioGroup,
  Spinner,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import MyButton from "./mybutton";
import Image from "next/image";
import { FaBook } from "react-icons/fa";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_PUBLIC;

// components/TestVocacional.js
const TestVocacional = ({ setUserData, userData }) => {
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [respuestas, setRespuestas] = useState({});
  const [carreraResultado, setCarreraResultado] = useState("");
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRadioChange = (index, value) => {
    setRespuestas({ ...respuestas, [index]: value });
    // console.log("respuestas:", respuestas);
  };
  const imagenesCarrera = {
    Derecho: "/images/DALL-E-DERECHO.jpg",
    Contabilidad: "/images/DALL-E-CONTABILIDAD.png",
    "Ingeniería Industrial": "/images/DALL-E-INDUSTRIAL.png",
    "Ingeniería en Energías Renovables": "/images/DALL-E-RENOVABLE.png",
    "Desarrollo de Software": "/images/DALL-E-SOFTWARE.png",
    Criminología: "/images/DALL-E-CRIMINOLOGIA.png",
    "Marketing Digital": "/images/DALL-E-MARKETING.png",
    "Comercio Exterior": "/images/DALL-E-COMERCIO.png",
    // Añade más carreras e imágenes según sea necesario
  };

  const preguntas = [
    {
      texto:
        "Cuando te enfrentas a un problema, ¿cuál es tu enfoque preferido?",
      opciones: {
        "Analizar todas las leyes y normas aplicables": { Derecho: 1 },
        "Evaluar los números y datos financieros": { Contabilidad: 1 },
        "Diseñar soluciones técnicas y prácticas": {
          "Ingeniería Industrial": 1,
        },
        "Explorar soluciones innovadoras y sostenibles": {
          "Ingeniería en Energías Renovables": 1,
        },
      },
    },
    {
      texto: "¿Qué tipo de proyectos te interesan más?",
      opciones: {
        "Desarrollar aplicaciones o software": { "Desarrollo de Software": 1 },
        "Investigar casos y resolver misterios": { Criminología: 1 },
        "Crear estrategias de marketing y publicidad": {
          "Marketing Digital": 1,
        },
        "Gestionar negocios internacionales y acuerdos comerciales": {
          "Comercio Exterior": 1,
        },
      },
    },
    {
      texto: "¿Qué actividad te parece más atractiva?",
      opciones: {
        "Debatir y argumentar un punto de vista": { Derecho: 1 },
        "Analizar y organizar información financiera": { Contabilidad: 1 },
        "Trabajar en proyectos de mejora de procesos": {
          "Ingeniería Industrial": 1,
        },
        "Investigar sobre nuevas tecnologías ambientales": {
          "Ingeniería en Energías Renovables": 1,
        },
      },
    },
    {
      texto: "¿En cuál de estas actividades te destacarías?",
      opciones: {
        "Programar y diseñar software": { "Desarrollo de Software": 1 },
        "Investigar y analizar escenas de crimen": { Criminología: 1 },
        "Crear campañas publicitarias en redes sociales": {
          "Marketing Digital": 1,
        },
        "Negociar acuerdos con proveedores internacionales": {
          "Comercio Exterior": 1,
        },
      },
    },
    {
      texto: "Prefieres trabajar...",
      opciones: {
        "En un ambiente estructurado y basado en reglas": {
          Derecho: 1,
          Contabilidad: 1,
        },
        "En proyectos variados con retos técnicos": {
          "Ingeniería Industrial": 1,
          "Ingeniería en Energías Renovables": 1,
        },
        "En un entorno creativo y dinámico": {
          "Desarrollo de Software": 1,
          "Marketing Digital": 1,
        },
        "En un campo que involucre viajes y relaciones internacionales": {
          Criminología: 1,
          "Comercio Exterior": 1,
        },
      },
    },
    {
      texto: "¿Qué es más importante para ti en una carrera?",
      opciones: {
        "Justicia y ética": { Derecho: 1 },
        "Precisión y organización ": { Contabilidad: 1 },
        "Innovación y eficiencia": {
          "Ingeniería Industrial": 1,
          "Ingeniería en Energías Renovables": 1,
        },
        "Creatividad y autonomía": {
          "Desarrollo de Software": 1,
          "Marketing Digital": 1,
        },
        "Seguridad y orden": { Criminología: 1 },
        "Diversidad cultural y oportunidades globales": {
          "Comercio Exterior": 1,
        },
      },
    },
    // Añade más preguntas aquí
  ];

  useEffect(() => {
    const todasRespondidas = preguntas.every(
      (_, index) => respuestas[index] !== undefined
    );
    setBotonDeshabilitado(!todasRespondidas);
  }, [respuestas]);

  const calcularResultados = async () => {
    let puntuaciones = {};

    preguntas.forEach((pregunta, index) => {
      const respuestaSeleccionada = respuestas[index];
      if (respuestaSeleccionada) {
        const carreras = pregunta.opciones[respuestaSeleccionada];
        Object.keys(carreras).forEach((carrera) => {
          if (!puntuaciones[carrera]) {
            puntuaciones[carrera] = 0;
          }
          puntuaciones[carrera] += carreras[carrera];
        });
      }
    });

    // Encuentra la carrera con la puntuación más alta
    let carreraMax = "";
    let maxPuntuacion = 0;
    Object.keys(puntuaciones).forEach((carrera) => {
      if (puntuaciones[carrera] > maxPuntuacion) {
        maxPuntuacion = puntuaciones[carrera];
        carreraMax = carrera;
      }
    });

    console.log(
      "Carrera recomendada:",
      carreraMax,
      "con puntuación:",
      maxPuntuacion
    );
    setCarreraResultado(carreraMax);
    setMostrarResultado(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    const { error } = await supabase.from("usuarios").insert({
      nombre: userData.nombre,
      apellido: userData.apellido,
      genero: userData.genero,
      edad: userData.edad,
      email: userData.email,
      telefono: userData.telefono,
      carrera_resultado: carreraMax,
    });
    console.log("Supabase error: ", error);
  };

  console.log(carreraResultado);
  if (mostrarResultado) {
    const imagenCarrera =
      imagenesCarrera[carreraResultado] || "/images/default.jpg";
    return (
      <div className="flex items-center justify-center h-screen">
        {isLoading ? (
          <Card className="max-w-md text-center p-4">
            <CardBody className="overflow-visible py-2 flex flex-col gap-5">
              <Spinner color="danger"/>
              <p>Cargando...</p>
            </CardBody>
          </Card>
        ) : (
          <Card className="max-w-md text-center p-4 ">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">
                Gracias por participar!
              </p>
              <small className="text-default-500">Resultados test..</small>
              <h4 className="font-bold text-large">{carreraResultado}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt={`Imagen de la carrera ${carreraResultado}`}
                className="object-cover rounded-xl"
                src={imagenCarrera}
                width={400}
                height={400}
              />
            </CardBody>
          </Card>
        )}
      </div>
    );
  }

  return (
    <Card className="max-w-[800px] w-1/2 p-8 flex-col flex gap-5 h-2/3 ">
      <CardHeader className="flex justify-start items-center gap-3 font-bold">
        <FaBook size={30} />
        <p>Bienvenido {userData.nombre} al Test de Orientación Vocacional</p>
      </CardHeader>
      <CardBody className="overflow-y-scroll">
        <div className="flex gap-8 flex-col my-5">
          {preguntas.map((pregunta, index) => (
            <div key={index} className="flex gap-2 flex-col">
              <h3 className="font-semibold">{pregunta.texto}</h3>
              <RadioGroup
                onChange={(e) => handleRadioChange(index, e.target.value)}
                className="ml-8"
              >
                {Object.keys(pregunta.opciones).map((opcion, idx) => (
                  <Radio key={idx} value={opcion}>
                    {opcion}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      </CardBody>
      <CardFooter className="flex justify-end items-center p-6">
        <MyButton
          onClick={calcularResultados}
          disabled={botonDeshabilitado}
          title={
            botonDeshabilitado
              ? "Por favor, responde todas las preguntas antes de continuar."
              : ""
          }
        >
          Calcular Resultados
        </MyButton>
      </CardFooter>
    </Card>
  );
};

export default TestVocacional;
