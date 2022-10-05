export type PCData = {
  type: string;
  partNumber: string;
  brand: string;
  model: string;
  rank: number;
  benchmark: number;
  capacity: string;
};

export type SelectType = {
  items: string[];
  type: string;
  width: number | string;
};

export type CapacitySelectType = {
  items: string[];
  width: number | string;
};

export type StorageTypeSelectType = {
  width: number | string;
};

export type ButtonType = {
  text: string;
}
