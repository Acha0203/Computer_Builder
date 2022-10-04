import { createContext, ReactNode, useContext, useState } from 'react';
import { PCData } from '../types';

type AppContextValue = {
  cpuBrand: string | null;
  setCpuBrand(brand: string): void;
  cpuModel: string | null;
  setCpuModel(model: string): void;
  cpuModelList: string[];
  setCpuModelList(modelList: string[]): void;
  cpuData: PCData;
  setCpuData(pcData: PCData): void;
  cpuList: PCData[];
  setCpuList(pcList: PCData[]): void;
  gpuBrand: string | null;
  setGpuBrand(brand: string): void;
  gpuModel: string | null;
  setGpuModel(model: string): void;
  gpuModelList: string[];
  setGpuModelList(modelList: string[]): void;
  gpuData: PCData;
  setGpuData(pcData: PCData): void;
  gpuList: PCData[];
  setGpuList(pcList: PCData[]): void;
  memoryCardBrand: string | null;
  setMemoryCardBrand(brand: string): void;
  memoryCardModel: string | null;
  setMemoryCardModel(model: string): void;
  memoryCardModelList: string[];
  setMemoryCardModelList(modelList: string[]): void;
  memoryCardCapacity: string | null;
  setMemoryCardCapacity(model: string): void;
  memoryCardData: PCData;
  setMemoryCardData(pcData: PCData): void;
  memoryCardList: PCData[];
  setMemoryCardList(pcList: PCData[]): void;
  storageType: string | null;
  setStorageType(model: string): void;
  storageCapacity: string | null;
  setStorageCapacity(model: string): void;
  storageBrand: string | null;
  setStorageBrand(model: string): void;
  storageModel: string | null;
  setStorageModel(model: string): void;
  storageModelList: string[];
  setStorageModelList(modelList: string[]): void;
  storageData: PCData;
  setStorageData(pcData: PCData): void;
  storageList: PCData[];
  setStorageList(pcList: PCData[]): void;
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
  const [cpuModelList, setCpuModelList] = useState<string[]>([]);
  const [cpuData, setCpuData] = useState({
    type: '',
    partNumber: '',
    brand: '',
    model: '',
    rank: 0,
    benchmark: 0,
    capacity: '',
  });
  const [cpuList, setCpuList] = useState<PCData[]>([]);
  const [gpuBrand, setGpuBrand] = useState('');
  const [gpuModel, setGpuModel] = useState('');
  const [gpuModelList, setGpuModelList] = useState<string[]>([]);
  const [gpuData, setGpuData] = useState({
    type: '',
    partNumber: '',
    brand: '',
    model: '',
    rank: 0,
    benchmark: 0,
    capacity: '',
  });
  const [gpuList, setGpuList] = useState<PCData[]>([]);
  const [memoryCardCapacity, setMemoryCardCapacity] = useState('');
  const [memoryCardBrand, setMemoryCardBrand] = useState('');
  const [memoryCardModel, setMemoryCardModel] = useState('');
  const [memoryCardModelList, setMemoryCardModelList] = useState<string[]>([]);
  const [memoryCardData, setMemoryCardData] = useState({
    type: '',
    partNumber: '',
    brand: '',
    model: '',
    rank: 0,
    benchmark: 0,
    capacity: '',
  });
  const [memoryCardList, setMemoryCardList] = useState<PCData[]>([]);
  const [storageType, setStorageType] = useState('HDD');
  const [storageCapacity, setStorageCapacity] = useState('');
  const [storageBrand, setStorageBrand] = useState('');
  const [storageModel, setStorageModel] = useState('');
  const [storageModelList, setStorageModelList] = useState<string[]>([]);
  const [storageData, setStorageData] = useState({
    type: '',
    partNumber: '',
    brand: '',
    model: '',
    rank: 0,
    benchmark: 0,
    capacity: '',
  });
  const [storageList, setStorageList] = useState<PCData[]>([]);
  const [gamingPCScore, setGamingPCScore] = useState(0);
  const [workPCScore, setWorkPCScore] = useState(0);

  const value = {
    cpuBrand,
    setCpuBrand,
    cpuModel,
    setCpuModel,
    cpuModelList,
    setCpuModelList,
    cpuData,
    setCpuData,
    cpuList,
    setCpuList,
    gpuBrand,
    setGpuBrand,
    gpuModel,
    setGpuModel,
    gpuModelList,
    setGpuModelList,
    gpuData,
    setGpuData,
    gpuList,
    setGpuList,
    memoryCardBrand,
    setMemoryCardBrand,
    memoryCardModel,
    setMemoryCardModel,
    memoryCardModelList,
    setMemoryCardModelList,
    memoryCardCapacity,
    setMemoryCardCapacity,
    memoryCardData,
    setMemoryCardData,
    memoryCardList,
    setMemoryCardList,
    storageType,
    setStorageType,
    storageCapacity,
    setStorageCapacity,
    storageBrand,
    setStorageBrand,
    storageModel,
    setStorageModel,
    storageModelList,
    setStorageModelList,
    storageData,
    setStorageData,
    storageList,
    setStorageList,
    gamingPCScore,
    setGamingPCScore,
    workPCScore,
    setWorkPCScore,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
