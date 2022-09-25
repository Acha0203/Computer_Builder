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
    }

    result.push(tempData);
  }
  return result;
};
