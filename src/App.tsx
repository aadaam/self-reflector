import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BirthYearSelection from './components/BirthYearSelection';
import AchievementInput from './components/AchievementInput';
import ValuesAnalysis from './components/ValuesAnalysis';
import VisionMissionVocation from './components/VisionMissionVocation';
import PurposeIdentification from './components/PurposeIdentification';
import GoldenCircle from './components/GoldenCircle';
import CareerSuggestions from './components/CareerSuggestions';
import ApiKeyInput from './components/ApiKeyInput';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9370DB', // Medium Purple
    },
    background: {
      default: '#E6E6FA', // Lavender
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  const [step, setStep] = useState(0);
  const [birthYear, setBirthYear] = useState(2000);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [values, setValues] = useState('');
  const [visionMissionVocation, setVisionMissionVocation] = useState('');
  const [purpose, setPurpose] = useState('');
  const [goldenCircle, setGoldenCircle] = useState('');
  const [careerSuggestions, setCareerSuggestions] = useState('');

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleApiKeySet = () => {
    setStep(1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
          {step === 0 && <ApiKeyInput onApiKeySet={handleApiKeySet} />}
          {step === 1 && (
            <BirthYearSelection
              birthYear={birthYear}
              setBirthYear={setBirthYear}
              onNext={nextStep}
            />
          )}
          {step === 2 && (
            <AchievementInput
              achievements={achievements}
              setAchievements={setAchievements}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {step === 3 && (
            <ValuesAnalysis
              achievements={achievements}
              values={values}
              setValues={setValues}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {step === 4 && (
            <VisionMissionVocation
              values={values}
              visionMissionVocation={visionMissionVocation}
              setVisionMissionVocation={setVisionMissionVocation}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {step === 5 && (
            <PurposeIdentification
              visionMissionVocation={visionMissionVocation}
              purpose={purpose}
              setPurpose={setPurpose}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {step === 6 && (
            <GoldenCircle
              purpose={purpose}
              goldenCircle={goldenCircle}
              setGoldenCircle={setGoldenCircle}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {step === 7 && (
            <CareerSuggestions
              goldenCircle={goldenCircle}
              careerSuggestions={careerSuggestions}
              setCareerSuggestions={setCareerSuggestions}
              onPrev={prevStep}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;