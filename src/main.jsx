import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./routes/route";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import UserProvider from "./components/UserProvider";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl={"/"}
    >
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ClerkProvider>
  </StrictMode>
);
