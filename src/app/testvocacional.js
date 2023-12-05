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
import ResultadoTestVocacional from "./resultadoTest";

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
    "Comercio Exterior": "/images/DALL-E-COMERCIO.jpg",
    "Administración de Empresas": "/images/DALL-E-EMPRESAS.png",
    Diseño: "/images/DALL-E-DISEÑO.png",
    "Trabajo Social": "/images/DALL-E-SOCIAL.png",
    Educación: "/images/DALL-E-EDUCACION.png",
    // Añade más carreras e imágenes según sea necesario
  };

  const descripcionesCarrera = {
    "Derecho":
"Tu integridad y tu firme creencia en la justicia son el faro que guía tu camino hacia el Derecho. Como defensor innato de la equidad y la verdad, te sientes llamado a ser la voz de aquellos que buscan justicia. En ti se combinan la pasión por el bien común y la precisión en el manejo de la ley, lo que te convierte en un baluarte de la legalidad y un agente de cambio en la sociedad.",

"Contabilidad":
"Tu mundo es uno donde cada detalle cuenta y cada cifra tiene su lugar perfecto. En la Contabilidad, encuentras el equilibrio perfecto entre el orden y la claridad. Eres el artesano de los números, el estratega detrás de las finanzas, y tu habilidad para desentrañar los más complejos laberintos financieros es tan natural como tu respirar.",

"Ingeniería Industrial":
"Tu mente analítica y tu visión para la eficiencia te llevan naturalmente a la Ingeniería Industrial. Eres el maestro de la optimización, el arquitecto de sistemas fluidos y efectivos. Tu capacidad para ver más allá de los procesos, para rediseñar y mejorar, te convierte en un revolucionario de la industria moderna.",

"Ingeniería en Energías Renovables":
"Eres un visionario, alguien que mira al futuro y ve un mundo impulsado por energías limpias y sostenibles. La Ingeniería en Energías Renovables es tu campo de juego; en él, tu creatividad y compromiso con el medio ambiente te llevan a innovar y a buscar soluciones que respeten nuestro planeta y aseguren un mañana más verde.",

"Desarrollo de Software":
"En el vasto mundo digital, encuentras tu vocación en el Desarrollo de Software. Tienes la capacidad única de hablar el lenguaje de las máquinas y de transformar ideas abstractas en realidades concretas. Tu curiosidad por la tecnología y tu habilidad para resolver problemas complejos te convierten en un creador de mundos digitales sin par.",

"Criminología":
"Posees una mente inquisitiva que no descansa hasta encontrar la verdad. La Criminología te llama, ofreciéndote la oportunidad de explorar los misterios del comportamiento humano y de contribuir a un entorno más seguro. Eres un detective en el ámbito social, buscando siempre las claves para prevenir y entender el crimen.",

"Marketing Digital":
"Con un pulso firme en las tendencias actuales y un ojo crítico para las oportunidades, el Marketing Digital es tu escenario ideal. Eres un narrador de historias en la era digital, conectando marcas con corazones y mentes a través de la vasta red de la comunicación en línea.",

"Comercio Exterior":
"Tu curiosidad por las diferentes culturas y tu interés en la economía global te hacen sobresalir en el Comercio Exterior. Como puente entre naciones, facilitas el intercambio de bienes y servicios, y tu habilidad para negociar y comprender las complejidades del mercado internacional te destaca como un jugador clave en el tablero del comercio mundial.",

"Administración de Empresas":
"Líder nato, tu visión estratégica y tu capacidad para inspirar a otros hacen de la Administración de Empresas tu dominio natural. En ti, la toma de decisiones y la dirección de equipos fluyen con autoridad y sabiduría, y tu habilidad para convertir los retos en oportunidades es la fuerza motriz que impulsa al éxito empresarial.",

"Diseño":
"Tu mundo es uno donde la forma y la función bailan en armonía perfecta. Como diseñador, tienes el don de capturar la belleza y plasmarla en cada creación. Tu creatividad no conoce límites, y cada uno de tus proyectos es un testimonio de tu capacidad para ver el mundo no solo como es, sino como podría ser.",

"Trabajo Social":
"Con un corazón grande y una dedicación incansable, encuentras tu llamado en el Trabajo Social. Eres el defensor de los marginados, el soporte de los olvidados y el mentor de quienes buscan un futuro mejor. Tu labor es un reflejo de tu compromiso con la justicia y la igualdad, y cada día marcas la diferencia en la vida de las personas.",

"Educación":
"Tu amor por el conocimiento y tu deseo de compartirlo te definen como educador. Eres el guía que ilumina el camino del aprendizaje, el maestro que inspira a las mentes jóvenes a alcanzar su potencial. En cada lección impartida, en cada curiosidad despertada, resides en el corazón de la transformación educativa.",
  };

  const dptsCarrera = {
    Derecho:
      "El Derecho implica el estudio y aplicación de leyes y regulaciones para garantizar y facilitar la justicia en la sociedad. Los profesionales del Derecho trabajan en diversos campos, desde la abogacía hasta la consultoría legal, pasando por roles en el sector público y corporativo, y se enfocan en interpretar y aplicar la ley para resolver conflictos y asesorar sobre cuestiones legales.",
    Contabilidad:
      "La Contabilidad es una disciplina profesional que se ocupa de la medición, procesamiento, comunicación y análisis de información financiera sobre entidades económicas. Los contadores no solo mantienen y auditan registros, sino que también pueden asesorar en cuestiones de impuestos, realizar análisis financieros y ayudar en la toma de decisiones estratégicas para empresas y particulares.",
    "Ingeniería Industrial":
      "La Ingeniería Industrial se centra en el diseño, mejora y establecimiento de sistemas integrados de personas, materiales, información, equipos y energía. Los ingenieros industriales buscan optimizar estos sistemas para aumentar la productividad, eficiencia y seguridad, a la vez que reducen costos y desperdicios.",
    "Ingeniería en Energías Renovables":
      "Esta rama de la ingeniería se especializa en el desarrollo y utilización de tecnologías sostenibles para la producción de energía. Involucra el diseño, implementación y gestión de sistemas que generan energía a partir de fuentes renovables como el sol, el viento y el agua, con el objetivo de minimizar el impacto ambiental y crear soluciones energéticas más limpias y eficientes.",
    "Desarrollo de Software":
      "Es el campo profesional dedicado a la creación, diseño, despliegue y soporte de software. Los desarrolladores de software construyen aplicaciones y sistemas que permiten a los usuarios realizar tareas específicas en computadoras y dispositivos móviles. Trabajan en una variedad de entornos, desde empresas tecnológicas hasta organizaciones gubernamentales y startups, creando soluciones que pueden variar desde aplicaciones simples hasta sistemas operativos complejos.",
    Criminología:
      "La criminología es el estudio del crimen, las causas del comportamiento delictivo, las respuestas sociales a él y los métodos de prevención. Los criminólogos realizan investigaciones para entender y prevenir la criminalidad y trabajan en conjunto con el sistema judicial y los cuerpos de seguridad.",
    "Marketing Digital":
      "Es una rama del marketing que utiliza plataformas digitales para promover productos y servicios. Los profesionales del marketing digital desarrollan estrategias para alcanzar al público a través de medios como redes sociales, SEO, email marketing y publicidad en línea. Su rol es fundamental en la construcción de la presencia en línea de marcas y empresas.",
    "Comercio Exterior":
      "Se especializa en las transacciones comerciales internacionales. Los profesionales del comercio exterior gestionan la exportación e importación de bienes y servicios, negociando acuerdos, conociendo regulaciones aduaneras y mercados extranjeros. Facilitan el flujo de bienes a través de fronteras y contribuyen al crecimiento económico.",
    "Administración de Empresas":
      "La administración de empresas se ocupa de la gestión y dirección de las organizaciones. Los administradores planifican, organizan, dirigen y controlan los recursos humanos, financieros y materiales para alcanzar los objetivos de la entidad. Son clave para el buen funcionamiento y el éxito de cualquier negocio o empresa.",
    Diseño:
      "El diseño abarca la creación y planificación de objetos, sistemas o interacciones. Incluye diferentes áreas como el diseño gráfico, de modas, industrial, entre otros. Los diseñadores combinan aspectos técnicos y creativos para crear productos que sean funcionales y estéticamente atractivos.",
    "Trabajo Social":
      "Esta profesión se enfoca en ayudar a individuos, familias y comunidades a mejorar su bienestar y resolver problemas sociales. Los trabajadores sociales evalúan las necesidades de las personas, proveen apoyo y recursos, y abogan por servicios y políticas que promuevan la justicia social.",
    Educación:
      "Los profesionales de la educación, como maestros y pedagogos, se dedican a enseñar y facilitar el aprendizaje en diversas materias y niveles. Trabajan en la planificación e implementación de currículos educativos, evaluación del progreso de los estudiantes y desarrollo de estrategias pedagógicas para un aprendizaje efectivo.",
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
      texto: "¿Qué papel prefieres en un trabajo en equipo?",
      opciones: {
        "Líder, guiando y tomando decisiones clave": {
          "Administración de Empresas": 1,
        },
        "Especialista, aportando conocimientos específicos": {
          Criminología: 1,
        },
        "Coordinador, asegurando que todos trabajen juntos eficientemente": {
          "Comercio Exterior": 1,
        },
        "Innovador, aportando ideas creativas y nuevas perspectivas": {
          "Marketing Digital": 1,
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
      texto: "¿Cuál de estas actividades te resulta más fácil y gratificante?",
      opciones: {
        "Interpretar y aplicar leyes o normativas": { Derecho: 1 },
        "Analizar datos financieros": { Contabilidad: 1 },
        "Solucionar problemas técnicos": { "Ingeniería Industrial": 1 },
        "Innovar en proyectos de sostenibilidad": {
          "Ingeniería en Energías Renovables": 1,
        },
      },
    },
    {
      texto: "¿Qué te atrae más en un desafío intelectual?",
      opciones: {
        "Resolver enigmas o casos complicados": { Criminología: 1 },
        "Encontrar soluciones creativas y originales": {
          "Marketing Digital": 1,
        },
        "Analizar situaciones y prever resultados": { Contabilidad: 1 },
        "Trabajar en proyectos con impacto global": { "Comercio Exterior": 1 },
      },
    },
    {
      texto:
        "¿Cómo te sientes trabajando con tecnología y nuevas herramientas?",
      opciones: {
        "Muy cómodo, siempre busco aprender sobre tecnología": {
          "Desarrollo de Software": 1,
        },
        "Interesado, especialmente si es aplicable a mi campo": {
          "Ingeniería Industrial": 1,
        },
        "Prefiero métodos tradicionales, aunque no descarto la tecnología": {
          Derecho: 1,
        },
        "Curioso, me gusta ver cómo la tecnología puede ayudar a la sociedad": {
          "Ingeniería en Energías Renovables": 1,
        },
      },
    },
    {
      texto: "¿Cuál de estas actividades te resulta más fácil y satisfactoria?",
      opciones: {
        "Organizar y planificar estrategias legales": { Derecho: 1 },
        "Manejar cuentas y realizar análisis financiero": { Contabilidad: 1 },
        "Diseñar y ejecutar planes de ingeniería": {
          "Ingeniería Industrial": 1,
        },
        "Desarrollar y aplicar tecnologías sostenibles": {
          "Ingeniería en Energías Renovables": 1,
        },
      },
    },
    {
      texto: "¿Qué te atrae más en un desafío intelectual?",
      opciones: {
        "Resolver casos y puzzles complejos": { Criminología: 1 },
        "Generar ideas y estrategias de marketing innovadoras": {
          "Marketing Digital": 1,
        },
        "Manejar y solucionar desafíos en el comercio internacional": {
          "Comercio Exterior": 1,
        },
        "Crear y programar nuevas soluciones de software": {
          "Desarrollo de Software": 1,
        },
      },
    },
    {
      texto: "¿Cuándo enfrentas un desafío, cómo te gusta abordarlo?",
      opciones: {
        "Con un enfoque sistemático y detallado": { Contabilidad: 1 },
        "Con creatividad y pensamiento fuera de lo común": { Diseño: 1 },
        "Trabajando en equipo y compartiendo ideas": {
          "Administración de Empresas": 1,
        },
        "Con un enfoque práctico, basado en la experiencia": {
          "Ingeniería Industrial": 1,
        },
      },
    },
    {
      texto: "¿Qué actividad prefieres?",
      opciones: {
        "Argumentar y debatir casos": { Derecho: 1 },
        "Organizar y analizar información financiera": { Contabilidad: 1 },
        "Mejorar procesos y sistemas": { "Ingeniería Industrial": 1 },
        "Investigar sobre tecnologías sostenibles": {
          "Ingeniería en Energías Renovables": 1,
        },
      },
    },
    {
      texto: "¿En cuál de estas actividades te destacas más?",
      opciones: {
        "Programación y desarrollo tecnológico": {
          "Desarrollo de Software": 1,
        },
        "Análisis criminológico y resolución de casos": { Criminología: 1 },
        "Creación de estrategias de marketing digital": {
          "Marketing Digital": 1,
        },
        "Gestión de operaciones comerciales internacionales": {
          "Comercio Exterior": 1,
        },
      },
    },
    {
      texto:
        "¿Qué tipo de libros, artículos o programas prefieres en tu tiempo libre?",
      opciones: {
        "Temas legales o históricos": { Derecho: 1 },
        "Publicaciones financieras y económicas": { Contabilidad: 1 },
        "Revistas de ciencia y tecnología": { "Ingeniería Industrial": 1 },
        "Contenido sobre innovación y emprendimiento": {
          "Administración de Empresas": 1,
        },
      },
    },
    {
      texto:
        "¿En qué tipo de actividades extracurriculares disfrutas participando?",
      opciones: {
        "Debate o modelo de Naciones Unidas": { Derecho: 1 },
        "Clubes de matemáticas o finanzas": { Contabilidad: 1 },
        "Equipos de robótica o tecnología": { "Ingeniería Industrial": 1 },
        "Grupos de emprendimiento o startups": {
          "Administración de Empresas": 1,
        },
      },
    },
    {
      texto:
        "¿Qué temas te resultan más interesantes para un proyecto de investigación?",
      opciones: {
        "Justicia, ley y orden": { Derecho: 1 },
        "Economía, mercado y finanzas": { Contabilidad: 1 },
        "Avances tecnológicos y sus aplicaciones": {
          "Ingeniería Industrial": 1,
        },
        "Energías renovables y sostenibilidad": {
          "Ingeniería en Energías Renovables": 1,
        },
      },
    },
    {
      texto: "¿Qué tipo de problema prefieres resolver?",
      opciones: {
        "Casos legales y dilemas éticos": { Derecho: 1 },
        "Desafíos numéricos y financieros": { Contabilidad: 1 },
        "Cuestiones técnicas y de ingeniería": { "Ingeniería Industrial": 1 },
        "Problemas ambientales y de sostenibilidad": {
          "Ingeniería en Energías Renovables": 1,
        },
      },
    },
    {
      texto: "¿Cuál de estas áreas te gustaría explorar más?",
      opciones: {
        "Derecho internacional y derechos humanos": { Derecho: 1 },
        "Auditoría, impuestos y regulaciones financieras": { Contabilidad: 1 },
        "Desarrollo de software y nuevas tecnologías": {
          "Desarrollo de Software": 1,
        },
        "Marketing digital y tendencias de mercado": { "Marketing Digital": 1 },
      },
    },
    {
      texto:
        "¿En qué tipo de proyecto te sentirías más involucrado y motivado?",
      opciones: {
        "Organizar una campaña de concienciación social": {
          "Trabajo Social": 1,
        },
        "Desarrollar un plan de negocio o estrategia comercial": {
          "Administración de Empresas": 1,
        },
        "Investigar y analizar el comportamiento del consumidor": {
          "Marketing Digital": 1,
        },
        "Crear una aplicación o programa informático": {
          "Desarrollo de Software": 1,
        },
      },
    },
    {
      texto: "¿Prefieres trabajar...",
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
      texto: "¿Qué factor te motivaría más en tu carrera?",
      opciones: {
        "El reconocimiento por tu habilidad y conocimiento": {
          Derecho: 1,
          Contabilidad: 1,
        },
        "La posibilidad de innovar y explorar nuevas ideas": {
          "Ingeniería Industrial": 1,
          "Ingeniería en Energías Renovables": 1,
        },
        "La oportunidad de liderar y tomar decisiones importantes": {
          "Administración de Empresas": 1,
          "Comercio Exterior": 1,
        },
        "La capacidad de trabajar en una variedad de proyectos y desafíos": {
          "Desarrollo de Software": 1,
          "Marketing Digital": 1,
        },
      },
    },
    {
      texto:
        "¿Cómo describirías tu método ideal de organización y gestión del tiempo?",
      opciones: {
        "Metódico y detallado, con un plan claro": {
          Contabilidad: 1,
          "Ingeniería Industrial": 1,
        },
        "Flexible y adaptable, con espacio para la creatividad": {
          "Marketing Digital": 1,
          Diseño: 1,
        },
        "Enfocado en objetivos, con prioridades claras": {
          "Administración de Empresas": 1,
          Derecho: 1,
        },
        "Colaborativo, compartiendo tareas y responsabilidades": {
          "Trabajo Social": 1,
          Educación: 1,
        },
      },
    },
    {
      texto: "¿Cómo prefieres abordar las tareas y los desafíos?",
      opciones: {
        "De manera individual, confiando en mi juicio y habilidades": {
          Derecho: 1,
          Criminología: 1,
        },
        "En un equipo, colaborando y compartiendo ideas": {
          "Comercio Exterior": 1,
          "Administración de Empresas": 1,
        },
        "Con un enfoque práctico y orientado a soluciones": {
          "Ingeniería Industrial": 1,
          "Ingeniería en Energías Renovables": 1,
        },
        "De manera creativa, buscando nuevas perspectivas": {
          "Marketing Digital": 1,
          Diseño: 1,
        },
      },
    },
    {
      texto: "¿Qué ambiente de trabajo prefieres?",
      opciones: {
        "Un ambiente competitivo y orientado a resultados": {
          "Administración de Empresas": 1,
          Derecho: 1,
        },
        "Un entorno colaborativo y de apoyo": {
          "Trabajo Social": 1,
          Educación: 1,
        },
        "Un espacio innovador y en constante cambio": {
          "Desarrollo de Software": 1,
          "Ingeniería en Energías Renovables": 1,
        },
        "Un lugar estructurado con procedimientos claros": {
          Contabilidad: 1,
          "Ingeniería Industrial": 1,
        },
      },
    },
    {
      texto: "¿Qué tipo de liderazgo te representa mejor?",
      opciones: {
        "Directivo y decisivo, tomando el control": {
          "Administración de Empresas": 1,
          Derecho: 1,
        },
        "Participativo y motivador, inspirando al equipo": {
          Educación: 1,
          "Trabajo Social": 1,
        },
        "Innovador y visionario, guiando hacia nuevas ideas": {
          "Marketing Digital": 1,
          Diseño: 1,
        },
        "Práctico y metódico, enfocado en los detalles": {
          "Ingeniería Industrial": 1,
          Contabilidad: 1,
        },
      },
    },
    {
      texto: "¿Cómo manejas el trabajo bajo presión?",
      opciones: {
        "Manteniendo la calma y organizando mis prioridades": {
          Contabilidad: 1,
          Derecho: 1,
        },
        "Con flexibilidad y adaptación a los cambios": {
          "Marketing Digital": 1,
          Diseño: 1,
        },
        "Enfocándome en la solución y avanzando paso a paso": {
          "Ingeniería Industrial": 1,
          "Ingeniería en Energías Renovables": 1,
        },
        "Buscando apoyo y colaboración del equipo": {
          "Administración de Empresas": 1,
          "Trabajo Social": 1,
        },
      },
    },
    {
      texto: "¿Cómo prefieres recibir feedback en tu trabajo?",
      opciones: {
        "De manera directa y clara, para mejorar rápidamente": {
          Derecho: 1,
          "Ingeniería Industrial": 1,
        },
        "De forma constructiva, con sugerencias creativas": {
          "Marketing Digital": 1,
          Diseño: 1,
        },
        "En un entorno de apoyo, centrado en el desarrollo personal": {
          "Trabajo Social": 1,
          Educación: 1,
        },
        "Regularmente y orientado a objetivos y resultados": {
          "Administración de Empresas": 1,
          Contabilidad: 1,
        },
      },
    },
    {
      texto: "¿Qué tipo de tareas disfrutas más?",
      opciones: {
        "Aquellas que requieren análisis detallado y concentración": {
          Contabilidad: 1,
          Derecho: 1,
        },
        "Tareas creativas y que me permitan expresar ideas": {
          Diseño: 1,
          "Marketing Digital": 1,
        },
        "Proyectos que involucren planificación y organización": {
          "Administración de Empresas": 1,
          "Comercio Exterior": 1,
        },
        "Trabajos que requieran solución de problemas y aplicación práctica": {
          "Ingeniería Industrial": 1,
          "Ingeniería en Energías Renovables": 1,
        },
      },
    },
    {
      texto: "¿Qué te motiva a mejorar en tu trabajo?",
      opciones: {
        "El deseo de ser un experto en mi campo": {
          Derecho: 1,
          "Ingeniería Industrial": 1,
        },
        "La oportunidad de crear y experimentar nuevas ideas": {
          "Marketing Digital": 1,
          Diseño: 1,
        },
        "El impacto positivo en la sociedad o en la empresa": {
          "Trabajo Social": 1,
          "Administración de Empresas": 1,
        },
        "El reto de resolver problemas complejos y únicos": {
          Contabilidad: 1,
          "Ingeniería en Energías Renovables": 1,
        },
      },
    },
    {
      texto: "¿Qué valoras más en una carrera?",
      opciones: {
        "Contribución a la justicia social": { Derecho: 1 },
        "Precisión y organización": { Contabilidad: 1 },
        "Innovación y eficiencia": { "Ingeniería Industrial": 1 },
        "Creatividad y autonomía": { "Desarrollo de Software": 1 },
      },
    },
    {
      texto: "¿Cuál es tu objetivo principal a largo plazo?",
      opciones: {
        "Ser reconocido como experto": {
          Derecho: 1,
          "Ingeniería Industrial": 1,
        },
        "Innovar en tu área": { Criminología: 1, "Energías Renovables": 1 },
        "Liderar equipos o proyectos": {
          "Administración de Empresas": 1,
          "Comercio Exterior": 1,
        },
        "Contribuir a cambios positivos en la sociedad": {
          "Trabajo Social": 1,
          "Desarrollo de Software": 1,
        },
      },
    },
    {
      texto:
        "¿Qué impacto esperas tener en tu comunidad o sociedad a través de tu carrera?",
      opciones: {
        "Mejorar el sistema legal y promover la justicia": { Derecho: 1 },
        "Optimizar los procesos financieros y económicos": { Contabilidad: 1 },
        "Desarrollar tecnologías innovadoras y sostenibles": {
          "Ingeniería Industrial": 1,
        },
        "Impulsar cambios sociales y educativos": { "Trabajo Social": 1 },
      },
    },
    {
      texto: "¿Cómo defines el éxito en tu vida profesional?",
      opciones: {
        "Alcanzar una posición de liderazgo y reconocimiento": {
          "Administración de Empresas": 1,
        },
        "Ser un innovador y referente en mi campo": {
          "Ingeniería en Energías Renovables": 1,
        },
        "Contribuir al bienestar de la sociedad": { "Trabajo Social": 1 },
        "Generar un impacto significativo y duradero": { Derecho: 1 },
      },
    },
    {
      texto: "¿Qué es más importante para ti en tu trabajo?",
      opciones: {
        "La estabilidad y la seguridad": { Contabilidad: 1, Derecho: 1 },
        "La oportunidad de aprender y crecer constantemente": {
          "Ingeniería Industrial": 1,
          "Desarrollo de Software": 1,
        },
        "Hacer un trabajo significativo que beneficie a otros": {
          "Trabajo Social": 1,
          Educación: 1,
        },
        "La libertad de expresar mi creatividad": {
          "Marketing Digital": 1,
          Diseño: 1,
        },
      },
    },
    {
      texto:
        "¿Cuál de estos valores es más importante en tu futuro profesional?",
      opciones: {
        "Integridad y ética": { Derecho: 1 },
        "Eficiencia y precisión": { Contabilidad: 1 },
        "Innovación y sostenibilidad": {
          "Ingeniería en Energías Renovables": 1,
        },
        "Colaboración y trabajo en equipo": { "Administración de Empresas": 1 },
      },
    },
    {
      texto:
        "¿Qué te gustaría que dijeran de ti como profesional en tu área de especialización?",
      opciones: {
        "Que soy un experto confiable y respetado": {
          Derecho: 1,
          Contabilidad: 1,
        },
        "Que soy un líder innovador y visionario": {
          "Administración de Empresas": 1,
          "Marketing Digital": 1,
        },
        "Que contribuyo de manera significativa a avances tecnológicos": {
          "Ingeniería Industrial": 1,
          "Desarrollo de Software": 1,
        },
        "Que impacto positivamente en la vida de las personas": {
          "Trabajo Social": 1,
          Educación: 1,
        },
      },
    },
    {
      texto: "¿Cuáles son tus metas profesionales a largo plazo?",
      opciones: {
        "Alcanzar una posición de alto rango en mi campo": {
          Derecho: 1,
          "Administración de Empresas": 1,
        },
        "Ser reconocido por mis contribuciones e innovaciones": {
          "Ingeniería Industrial": 1,
          "Desarrollo de Software": 1,
        },
        "Ayudar a construir una sociedad más justa y equitativa": {
          "Trabajo Social": 1,
          Educación: 1,
        },
        "Ser un líder en la transformación y mejoramiento de procesos": {
          Contabilidad: 1,
          "Ingeniería Industrial": 1,
        },
      },
    },
    {
      texto: "¿Cómo enfrentas situaciones imprevistas o desafíos?",
      opciones: {
        "Con un enfoque analítico, buscando datos y hechos": {
          Contabilidad: 1,
        },
        "Con creatividad, buscando soluciones innovadoras": {
          "Marketing Digital": 1,
        },
        "Con pragmatismo, enfocándome en la acción y resultados": {
          "Ingeniería Industrial": 1,
        },
        "Con una perspectiva global, considerando el impacto más amplio": {
          "Comercio Exterior": 1,
        },
      },
    },
    {
      texto: "¿Prefieres trabajar en proyectos con...",
      opciones: {
        "Instrucciones claras y una ruta definida": { Derecho: 1 },
        "Oportunidades para la exploración y el descubrimiento": {
          "Ingeniería en Energías Renovables": 1,
        },
        "Desafíos que requieran pensamiento crítico y solución de problemas": {
          Criminología: 1,
        },
        "Espacio para la creatividad y la innovación": {
          "Desarrollo de Software": 1,
        },
      },
    },
    {
      texto: "En tu carrera, ¿qué te gustaría lograr más?",
      opciones: {
        "Ser un líder en mi campo, reconocido por mi experiencia": {
          "Administración de Empresas": 1,
        },
        "Realizar un descubrimiento o innovación significativa": {
          "Ingeniería en Energías Renovables": 1,
        },
        "Ayudar a resolver problemas sociales importantes": {
          "Trabajo Social": 1,
        },
        "Crear algo que cambie la forma en que las personas viven o trabajan": {
          "Desarrollo de Software": 1,
        },
      },
    },
    {
      texto: "¿Qué entorno laboral te atrae más?",
      opciones: {
        "Uno que valora la precisión y el detalle": { Contabilidad: 1 },
        "Uno que es dinámico y siempre cambiante": { "Marketing Digital": 1 },
        "Uno que se enfoca en resolver problemas prácticos": {
          "Ingeniería Industrial": 1,
        },
        "Uno que trabaja hacia metas sociales o comunitarias": { Derecho: 1 },
      },
    },
    {
      texto: "¿Cuál de las siguientes descripciones se ajusta mejor a ti?",
      opciones: {
        "Naturalmente curioso y siempre buscando aprender": {
          "Ingeniería en Energías Renovables": 1,
        },
        "Organizado y metódico en mi enfoque del trabajo": { Contabilidad: 1 },
        "Empático y enfocado en ayudar a los demás": { "Trabajo Social": 1 },
        "Creativo y siempre pensando fuera de la caja": {
          "Marketing Digital": 1,
        },
      },
    },
    {
      texto:
        "¿Qué actividad te relaja o te da más satisfacción en tu tiempo libre?",
      opciones: {
        "Leer o investigar sobre temas de interés": { Derecho: 1 },
        "Experimentar con proyectos DIY o tecnología": {
          "Ingeniería Industrial": 1,
        },
        "Participar en actividades comunitarias o voluntariado": {
          "Trabajo Social": 1,
        },
        "Explorar nuevas tendencias y conceptos creativos": {
          Diseño: 1,
          "Marketing Digital": 1,
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
      imagenesCarrera[carreraResultado] || "/images/default.png";
    const carreraDescripcion =
      descripcionesCarrera[carreraResultado] ||
      "Te encuentras en la encrucijada de caminos, donde el potencial es vasto y las oportunidades son infinitas. Aún no se revela un sendero definido, pero tu versatilidad y tu disposición para explorar te capacitan para forjar tu propio destino. Abraza la incertid  umbre con curiosidad y coraje, pues en la búsqueda encontrarás tu verdadera pasión.";
    const dptCarrera = dptsCarrera[carreraResultado] || "No posees una funcion";
    console.log("Carrera descripcion" + carreraDescripcion);
    return (
      <div className="flex items-center justify-center h-screen">
        <ResultadoTestVocacional
          dptCarrera={dptCarrera}
          carreraResultado={carreraResultado}
          carreraDescripcion={carreraDescripcion}
          imagenCarrera={imagenCarrera}
          isLoading={isLoading}
        />
      </div>
    );
  }

      return (
        <div className="flex items-center justify-center min-h-screen">
          <Card className="max-w-[600px] mx-auto my-8 max-h-[90vh] flex flex-col gap-5">
            <CardHeader className="flex justify-start items-center gap-3 font-bold">
              <FaBook size={30} />
              <p>Bienvenido {userData.nombre} al Test de Orientación Vocacional</p>
            </CardHeader>
            <CardBody className="overflow-auto">
              <div className="flex flex-col gap-8 my-5">
                {preguntas.map((pregunta, index) => (
                  <div key={index} className="mb-4 px-4 sm:px-6">
                    <h3 className="text-lg sm:text-base md:text-lg font-semibold">
                      {pregunta.texto}
                    </h3>
                    <RadioGroup
                      value={respuestas[index]}
                      onChange={(e) => handleRadioChange(index, e.target.value)}
                      className="mt-2"
                    >
                      {Object.keys(pregunta.opciones).map((opcion, idx) => (
                        <div key={idx} className="flex items-center gap-2 mt-1">
                          <Radio value={opcion} />
                          <span className="text-sm sm:text-xs md:text-sm">
                            {opcion}
                          </span>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            </CardBody>
            <CardFooter className="flex justify-center mb-4 md:justify-end items-center p-8 sm:p-7">
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
        </div>
      );
};

export default TestVocacional;
