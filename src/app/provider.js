import * as React from "react";

// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";

export const metadata = {
  title: 'Test Vocacional',
  description: 'Test Vocacional de Universidad Isep',
}

function NextProvider({children}) {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}

export default NextProvider;