import { PCData } from '../types';

export const createList = (items: never[]): PCData[] => {
  let result: PCData[] = [];

  for (const item of items) {
    let tempData: PCData = {
      type: '',
      partNumber: '',
      brand: '',
      model: '',
      rank: 0,
      benchmark: 0,
      capacity: '',
    };

    tempData.type = item['Type'];
    tempData.partNumber = item['Part Number'];
    tempData.brand = item['Brand'];
    tempData.model = item['Model'];
    tempData.rank = item['Rank'];
    tempData.benchmark = item['Benchmark'];

    if (tempData.type === 'RAM') {
      const words = tempData.model.split(' ');
      tempData.capacity = words[words.length - 1];
    } else if (tempData.type === 'HDD' || tempData.type === 'SSD') {
      const prossessedModelData = tempData.model.replace(/\s\(.+\)/g, '');
      const words = prossessedModelData.split(' ');
      tempData.capacity = words[words.length - 1];
    }

    result.push(tempData);
  }
  return result;
};

export const createCapacityList = (pcDataList: PCData[]): string[] => {
  let items: string[] = [];

  for (const pcData of pcDataList) {
    items.push(pcData.capacity);
  }
  // 重複を取り除く
  items = [...new Set(items)];
  let gbList: string[] = [];
  let tbList: string[] = [];

  for (const item of items) {
    // 容量が1TB未満の項目だけを取り出す
    if (item[item.length - 2] === 'G') {
      gbList.push(item);
    } else {
      tbList.push(item);
    }
  }

  return gbList.sort().concat(tbList.sort(sortNumBlock));
};

export const createBrandList = (pcDataList: PCData[]): string[] => {
  let tempList: string[] = [];

  for (const pcData of pcDataList) {
    tempList.push(pcData.brand);
  }

  let array = [...new Set(tempList)];

  return array.sort();
};

export const createModelList = (
  capacity: string | null,
  brand: string | null,
  pcList: PCData[]
): string[] => {
  let tempList: string[] = [];

  for (const pcData of pcList) {
    if (capacity !== null && capacity !== '') {
      if (pcData.brand === brand && pcData.capacity === capacity) {
        tempList.push(pcData.model);
      }
    } else if (capacity === null || capacity === '') {
      if (pcData.brand === brand) {
        tempList.push(pcData.model);
      }
    }
  }

  // 重複を取り除く
  tempList = [...new Set(tempList)];

  return tempList.sort(sortModel);
};

const sortNumBlock = (a: string, b: string) => {
  // 「1.5」にも対応するため単位を取り除いて10倍する
  const na = Number(a.substring(0, a.length - 2)) * 10;
  const nb = Number(b.substring(0, b.length - 2)) * 10;
  const sa = String(na).replace(/(\d+)/g, (m) => m.padStart(30, '0'));
  const sb = String(nb).replace(/(\d+)/g, (m) => m.padStart(30, '0'));
  return sa < sb ? -1 : sa > sb ? 1 : 0;
};

const sortModel = (a: string, b: string) => {
  a = a.replace(/-\s/g, '');
  b = b.replace(/-\s/g, '');
  const sa = a.replace(/(\d+)/g, (m) => m.padStart(30, '0'));
  const sb = b.replace(/(\d+)/g, (m) => m.padStart(30, '0'));
  return sa < sb ? -1 : sa > sb ? 1 : 0;
};
