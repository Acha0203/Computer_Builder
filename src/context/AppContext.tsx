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
  memoryCardBrand: string | null;
  setMemoryCardBrand(brand: string): void;
  memoryCardModel: string | null;
  setMemoryCardModel(model: string): void;
  memoryCardCapacity: string | null;
  setMemoryCardCapacity(model: string): void;
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
  const [memoryCardCapacity, setMemoryCardCapacity] = useState('');
  const [memoryCardBrand, setMemoryCardBrand] = useState('');
  const [memoryCardModel, setMemoryCardModel] = useState('');

  const value = {
    cpuBrand,
    setCpuBrand,
    cpuModel,
    setCpuModel,
    gpuBrand,
    setGpuBrand,
    gpuModel,
    setGpuModel,
    memoryCardBrand,
    setMemoryCardBrand,
    memoryCardModel,
    setMemoryCardModel,
    memoryCardCapacity,
    setMemoryCardCapacity,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
