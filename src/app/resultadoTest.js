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
    <Card className=" max-w-md text-center p-4 ">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <p className="text-tiny uppercase font-bold">Gracias por participar!</p>
        <small className="text-default-500">{carreraDescripcion}</small>
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
      <CardFooter className="flex justify-center items-center p-4  ">
        <Button onPress={onOpen} style={{ backgroundColor: '#F7B750', color: '#000000' }}>Mas información</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                    Función
                </ModalHeader>
                <ModalBody>
                  <p>
                    {dptCarrera}
                  </p>
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
  );
};

export default ResultadoTestVocacional;
