"use client"
import React, {useState} from "react";
import Formulario from "./formulario";
import TestVocacional from "./testvocacional";

export default function Home() {
  const [userData, setUserData] = useState({}) 

  return (
    <main className="flex max-h-screen flex-col items-center justify-content p-16">
      <Formulario setUserData={setUserData} userData={userData}/>
    </main>
  );
}
