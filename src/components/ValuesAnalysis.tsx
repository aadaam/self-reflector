import React, { useState, useEffect } from 'react';
import { Typography, Button, CircularProgress } from '@mui/material';
import { Brain, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { generateResponse } from '../services/openai';

interface ValuesAnalysisProps {
  achievements: string[];
  values: string;
  setValues: (values: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ValuesAnalysis: React.FC<ValuesAnalysisProps> = ({ achievements, values, setValues, onNext, onPrev }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!values) {
      analyzeValues();
    }
  }, []);

  const analyzeValues = async () => {
    setLoading(true);
    setError(null);
    try {
      const prompt = `Our user says that the things they are most proud of include:
${achievements.map(a => `- ${a}`).join('\n')}

Based on these:
- What is their PASSION or internal drives?
- What do they mainly CONTRIBUTE to society?
- Where lies their COMPETENCE and TALENT? How might people recognize them?`;

      const response = await generateResponse(prompt);
      setValues(response);
    } catch (err) {
      setError('Failed to analyze values. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Values Analysis
      </Typography>
      {loading ? (
        <div className="flex flex-col items-center my-8">
          <Brain size={64} className="text-purple-500 mb-4" />
          <CircularProgress />
          <Typography variant="body1" className="mt-4">
            Analyzing your values...
          </Typography>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <Typography variant="body1">{error}</Typography>
        </div>
      ) : (
        <div className="bg-purple-100 p-4 rounded-lg my-4">
          <Typography variant="body1" component="pre" style={{ whiteSpace: 'pre-wrap' }}>
            {values}
          </Typography>
        </div>
      )}
      <div className="flex justify-between mt-4">
        <Button variant="outlined" onClick={onPrev} startIcon={<ArrowLeft />}>
          Back
        </Button>
        <Button variant="contained" onClick={analyzeValues} startIcon={<RefreshCw />}>
          Regenerate
        </Button>
        <Button variant="contained" onClick={onNext} disabled={!values} endIcon={<ArrowRight />}>
          See My Vision
        </Button>
      </div>
    </div>
  );
};

export default ValuesAnalysis;