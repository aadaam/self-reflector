import React, { useState, useEffect } from 'react';
import { Typography, Button, CircularProgress, Grid } from '@mui/material';
import { Target, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { generateResponse } from '../services/openai';

interface GoldenCircleProps {
  purpose: string;
  goldenCircle: string;
  setGoldenCircle: (goldenCircle: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const GoldenCircle: React.FC<GoldenCircleProps> = ({
  purpose,
  goldenCircle,
  setGoldenCircle,
  onNext,
  onPrev,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!goldenCircle) {
      analyzeGoldenCircle();
    }
  }, []);

  const analyzeGoldenCircle = async () => {
    setLoading(true);
    setError(null);
    try {
      const prompt = `What might be their Golden Circle, that is:
- WHY they do things based on all of the above? What is their main driving purpose or belief?
- HOW are they different from others who do similar things? What sets them apart? How are their services different?
- WHAT exactly do they do? What services might they deliver while pursuing their purpose?

Based on the following purpose:
${purpose}`;

      const response = await generateResponse(prompt);
      setGoldenCircle(response);
    } catch (err) {
      setError('Failed to analyze Golden Circle. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Golden Circle Exploration
      </Typography>
      {loading ? (
        <div className="flex flex-col items-center my-8">
          <Target size={64} className="text-purple-500 mb-4" />
          <CircularProgress />
          <Typography variant="body1" className="mt-4">
            Exploring your Golden Circle...
          </Typography>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <Typography variant="body1">{error}</Typography>
        </div>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <div className="bg-purple-100 p-4 rounded-lg my-4 h-full">
              <Typography variant="body1" component="pre" style={{ whiteSpace: 'pre-wrap' }}>
                {goldenCircle}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Golden_circle.png/640px-Golden_circle.png"
              alt="Golden Circle Diagram"
              className="w-full h-auto rounded-lg"
            />
          </Grid>
        </Grid>
      )}
      <div className="flex justify-between mt-4">
        <Button variant="outlined" onClick={onPrev} startIcon={<ArrowLeft />}>
          Back
        </Button>
        <Button variant="contained" onClick={analyzeGoldenCircle} startIcon={<RefreshCw />}>
          Regenerate
        </Button>
        <Button variant="contained" onClick={onNext} disabled={!goldenCircle} endIcon={<ArrowRight />}>
          Career Suggestions
        </Button>
      </div>
    </div>
  );
};

export default GoldenCircle;