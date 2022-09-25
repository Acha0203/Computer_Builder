import { createContext, ReactNode, useContext, useState } from 'react';
import { PCData } from '../types';

type AppContextValue = {
  cpuBrand: string | null;
  setCpuBrand(brand: string): void;
  cpuModel: string | null;
  setCpuModel(model: string): void;
  cpuData: PCData;
  setCpuData(pcData: PCData): void;
  gpuBrand: string | null;
  setGpuBrand(brand: string): void;
  gpuModel: string | null;
  setGpuModel(model: string): void;
  gpuData: PCData;
  setGpuData(pcData: PCData): void;
  memoryCardBrand: string | null;
  setMemoryCardBrand(brand: string): void;
  memoryCardModel: string | null;
  setMemoryCardModel(model: string): void;
  memoryCardCapacity: string | null;
  setMemoryCardCapacity(model: string): void;
  memoryCardData: PCData;
  setMemoryCardData(pcData: PCData): void;
  storageType: string | null;
  setStorageType(model: string): void;
  storageCapacity: string | null;
  setStorageCapacity(model: string): void;
  storageBrand: string | null;
  setStorageBrand(model: string): void;
  storageModel: string | null;
  setStorageModel(model: string): void;
  storageData: PCData;
  setStorageData(pcData: PCData): void;
  gamingPCScore: number;
  setGamingPCScore(score: number): void;
  workPCScore: number;
  setWorkPCScore(score: number): void;
};

const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [cpuBrand, setCpuBrand] = useState('');
  const [cpuModel, setCpuModel] = useState('');
  const [cpuData, setCpuData] = useState({
    type: '',
    partNumber: '',
    brand: '',
    model: '',
    rank: 0,
    benchmark: 0,
    capacity: '',
  });
  const [gpuBrand, setGpuBrand] = useState('');
  const [gpuModel, setGpuModel] = useState('');
  const [gpuData, setGpuData] = useState({
    type: '',
    partNumber: '',
    brand: '',
    model: '',
    rank: 0,
    benchmark: 0,
    capacity: '',
  });
  const [memoryCardCapacity, setMemoryCardCapacity] = useState('');
  const [memoryCardBrand, setMemoryCardBrand] = useState('');
  const [memoryCardModel, setMemoryCardModel] = useState('');
  const [memoryCardData, setMemoryCardData] = useState({
    type: '',
    partNumber: '',
    brand: '',
    model: '',
    rank: 0,
    benchmark: 0,
    capacity: '',
  });
  const [storageType, setStorageType] = useState('HDD');
  const [storageCapacity, setStorageCapacity] = useState('');
  const [storageBrand, setStorageBrand] = useState('');
  const [storageModel, setStorageModel] = useState('');
  const [storageData, setStorageData] = useState({
    type: '',
    partNumber: '',
    brand: '',
    model: '',
    rank: 0,
    benchmark: 0,
    capacity: '',
  });
  const [gamingPCScore, setGamingPCScore] = useState(0);
  const [workPCScore, setWorkPCScore] = useState(0);

  const value = {
    cpuBrand,
    setCpuBrand,
    cpuModel,
    setCpuModel,
    cpuData,
    setCpuData,
    gpuBrand,
    setGpuBrand,
    gpuModel,
    setGpuModel,
    gpuData,
    setGpuData,
    memoryCardBrand,
    setMemoryCardBrand,
    memoryCardModel,
    setMemoryCardModel,
    memoryCardCapacity,
    setMemoryCardCapacity,
    memoryCardData,
    setMemoryCardData,
    storageType,
    setStorageType,
    storageCapacity,
    setStorageCapacity,
    storageBrand,
    setStorageBrand,
    storageModel,
    setStorageModel,
    storageData,
    setStorageData,
    gamingPCScore,
    setGamingPCScore,
    workPCScore,
    setWorkPCScore,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
