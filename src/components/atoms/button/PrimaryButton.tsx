import { Button } from '@mui/material';
import { memo } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { ButtonType } from '../../../types';
import { calculateGamingPCScore, calculateWorkPCScore } from '../../../util';

const PrimaryButton = memo((props: ButtonType) => {
  const { text } = props;
  const {
    cpuData,
    gpuData,
    memoryCardData,
    storageData,
    setGamingPCScore,
    setWorkPCScore,
    setShowSpecs,
  } = useAppContext();

  const handleClickButton = () => {
    setGamingPCScore(
      calculateGamingPCScore(
        cpuData.benchmark,
        gpuData.benchmark,
        memoryCardData.benchmark,
        storageData.benchmark,
        storageData.type
      )
    );
    setWorkPCScore(
      calculateWorkPCScore(
        cpuData.benchmark,
        gpuData.benchmark,
        memoryCardData.benchmark,
        storageData.benchmark
      )
    );
    setShowSpecs(true);
  };

  return (
    <Button sx={{ marginY: 2 }} variant="outlined" onClick={handleClickButton}>
      {text}
    </Button>
  );
});

export default PrimaryButton;
