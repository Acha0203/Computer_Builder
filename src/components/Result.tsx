import { Box, Button } from '@mui/material';
import { useAppContext } from '../context/AppContext';

const Result = () => {
  const {
    cpuBrand,
    cpuModel,
    gpuModel,
    gpuBrand,
    memoryCardModel,
    memoryCardBrand,
    storageType,
    storageModel,
    storageBrand,
  } = useAppContext();

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
      <Button sx={{ marginY: 2 }} variant="outlined">
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
        <h2 className="your-pc">
          CPU: {cpuModel} ({cpuBrand})
        </h2>
        <hr className="line4" />
        <h2 className="your-pc">
          GPU: {gpuModel} ({gpuBrand})
        </h2>
        <hr className="line3" />
        <h2 className="your-pc">
          RAM: {memoryCardModel} ({memoryCardBrand})
        </h2>
        <hr className="line2" />
        <h2 className="your-pc">
          {storageType}: {storageModel} ({storageBrand})
        </h2>
        <hr className="line1" />
        <h2 className="your-pc">Gaming: %&nbsp;&nbsp;Work: %</h2>
      </Box>
    </Box>
  );
};

export default Result;
