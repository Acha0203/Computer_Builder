import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { calculateGamingPCScore, calculateWorkPCScore } from '../util';

const Result = () => {
  const [showSpecs, setShowSpecs] = useState(false);
  const {
    cpuBrand,
    cpuModel,
    cpuData,
    gpuModel,
    gpuBrand,
    gpuData,
    memoryCardModel,
    memoryCardBrand,
    memoryCardData,
    storageType,
    storageModel,
    storageBrand,
    storageData,
    gamingPCScore,
    setGamingPCScore,
    workPCScore,
    setWorkPCScore,
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
    <Box
      sx={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        textAlign: 'center',
      }}
    >
      <Button
        sx={{ marginY: 2 }}
        variant="outlined"
        onClick={handleClickButton}
      >
        Show Specs of Your PC
      </Button>
      <Box
        sx={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2,
          paddingBottom: 1,
          border: '1px solid gray',
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        {showSpecs ? (
          <h2 className="your-pc">
            CPU: {cpuModel} ({cpuBrand})
          </h2>
        ) : (
          <h2 className="your-pc">CPU</h2>
        )}
        <hr className="line4" />
        {showSpecs ? (
          <h2 className="your-pc">
            GPU: {gpuModel} ({gpuBrand})
          </h2>
        ) : (
          <h2 className="your-pc">GPU</h2>
        )}
        <hr className="line3" />
        {showSpecs ? (
          <h2 className="your-pc">
            RAM: {memoryCardModel} ({memoryCardBrand})
          </h2>
        ) : (
          <h2 className="your-pc">RAM</h2>
        )}
        <hr className="line2" />
        {showSpecs ? (
          <h2 className="your-pc">
            {storageType}: {storageModel} ({storageBrand})
          </h2>
        ) : (
          <h2 className="your-pc">Storage</h2>
        )}
        <hr className="line1" />
        <h2 className="your-pc">
          Gaming: {gamingPCScore}%&nbsp;&nbsp;Work: {workPCScore}%
        </h2>
      </Box>
    </Box>
  );
};

export default Result;
