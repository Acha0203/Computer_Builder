import { createContext, ReactNode, useContext, useState } from 'react';

type AppContextValue = {
  cpuBrand: string | null;
  cpuModel: string | null;
  setCpuBrand(brand: string): void;
  setCpuModel(model: string): void;
  gpuBrand: string | null;
  gpuModel: string | null;
  setGpuBrand(brand: string): void;
  setGpuModel(model: string): void;
};

const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [cpuBrand, setCpuBrand] = useState('');
  const [cpuModel, setCpuModel] = useState('');
  const [gpuBrand, setGpuBrand] = useState('');
  const [gpuModel, setGpuModel] = useState('');

  const value = {
    cpuBrand,
    setCpuBrand,
    cpuModel,
    setCpuModel,
    gpuBrand,
    setGpuBrand,
    gpuModel,
    setGpuModel,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
