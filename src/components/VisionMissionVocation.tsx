import React, { useState, useEffect } from 'react';
import { Typography, Button, CircularProgress } from '@mui/material';
import { Eye, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { generateResponse } from '../services/openai';

interface VisionMissionVocationProps {
  values: string;
  visionMissionVocation: string;
  setVisionMissionVocation: (visionMissionVocation: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const VisionMissionVocation: React.FC<VisionMissionVocationProps> = ({
  values,
  visionMissionVocation,
  setVisionMissionVocation,
  onNext,
  onPrev,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!visionMissionVocation) {
      analyzeVisionMissionVocation();
    }
  }, []);

  const analyzeVisionMissionVocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const prompt = `Given that:
- VISION is the common ground between "competence and talent" and "contribution to society".
- MISSION is the common ground between "contribution to society" and "passion/internal drives".
- VOCATION is the common ground between "competence and talent" and "passion/internal drives".

And based on the following values analysis:
${values}

What are their VISION, MISSION, and VOCATION?`;

      const response = await generateResponse(prompt);
      setVisionMissionVocation(response);
    } catch (err) {
      setError('Failed to analyze vision, mission, and vocation. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Vision, Mission, and Vocation
      </Typography>
      {loading ? (
        <div className="flex flex-col items-center my-8">
          <Eye size={64} className="text-purple-500 mb-4" />
          <CircularProgress />
          <Typography variant="body1" className="mt-4">
            Analyzing your vision, mission, and vocation...
          </Typography>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <Typography variant="body1">{error}</Typography>
        </div>
      ) : (
        <div className="bg-purple-100 p-4 rounded-lg my-4">
          <Typography variant="body1" component="pre" style={{ whiteSpace: 'pre-wrap' }}>
            {visionMissionVocation}
          </Typography>
        </div>
      )}
      <div className="flex justify-between mt-4">
        <Button variant="outlined" onClick={onPrev} startIcon={<ArrowLeft />}>
          Back
        </Button>
        <Button variant="contained" onClick={analyzeVisionMissionVocation} startIcon={<RefreshCw />}>
          Regenerate
        </Button>
        <Button variant="contained" onClick={onNext} disabled={!visionMissionVocation} endIcon={<ArrowRight />}>
          See My Purpose
        </Button>
      </div>
    </div>
  );
};

export default VisionMissionVocation;