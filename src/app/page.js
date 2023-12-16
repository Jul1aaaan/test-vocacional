"use client";
import React, { useState } from "react";
import Formulario from "./formulario";

export default function Home() {
  const [userData, setUserData] = useState({});

  return (
    <main className="flex min-h-screen flex-col items-center justify-content font-DmSans background-image">
      <Formulario setUserData={setUserData} userData={userData} />
    </main>
  );
}
