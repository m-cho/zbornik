import React, { createContext, useContext, useState } from "react";

interface NavigationHistoryContextType {
  lastRoute: string | null;
  setLastRoute: (route: string) => void;
}

const NavigationHistoryContext = createContext<
  NavigationHistoryContextType | undefined
>(undefined);

export const NavigationHistoryProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [lastRoute, setLastRoute] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);

  const updateRoute = (route: string) => {
    if (currentRoute !== route) {
      setLastRoute(currentRoute);
      setCurrentRoute(route);
    }
  };

  return (
    <NavigationHistoryContext.Provider
      value={{
        lastRoute: lastRoute,
        setLastRoute: updateRoute,
      }}
    >
      {children}
    </NavigationHistoryContext.Provider>
  );
};

export const useNavigationHistory = () => {
  const ctx = useContext(NavigationHistoryContext);
  if (!ctx)
    throw new Error(
      "useNavigationHistory must be used within NavigationHistoryProvider",
    );
  return ctx;
};
