// ResultadoTestVocacional.js
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";

const ResultadoTestVocacional = ({
  carreraResultado,
  carreraDescripcion,
  imagenCarrera,
  isLoading,
  dptCarrera,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  if (isLoading) {
    return (
      <Card className="max-w-md text-center p-4">
        <CardBody className="overflow-visible py-2 flex flex-col gap-5">
          <Spinner color="danger" />
          <p>Cargando...</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <>
      <Card className=" max-w-md text-center p-4 ">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <p className="text-tiny text-2xl uppercase font-bold">
            Gracias por participar!
          </p>
          <small className="text-default-500 text-base">
            Resultados test...
          </small>
          <h4 className="font-bold text-2xl" style={{ color:"#FF6900" }} >{carreraResultado}</h4>
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
        <CardFooter className="flex justify-center items-center p-4  ">
          <Button
            onPress={onOpen}
            style={{ backgroundColor: "#FF6900", color: "ghostwhite" }}
          >
            Mas información
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-2xl">
                    Descripción
                  </ModalHeader>
                  <ModalBody>
                    <h1 className="text-lg">Personalidad</h1>
                    <p>{carreraDescripcion}</p>
                    <h1 className="text-lg">Tareas</h1>
                    <p>{dptCarrera}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cerrar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </CardFooter>
      </Card>
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          fontSize: "1rem",
          color:"#000",
        }}
      >
        Creado por Fundación ISEP
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "1rem",
        }}
      >
        <Image
        src="/logo.png"
        alt="Logo Fundacion"
        width={100}
        height={100}
        />
      </div>
    </>
  );
};
//Final
export default ResultadoTestVocacional;
