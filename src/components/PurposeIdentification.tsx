import React, { useState, useEffect } from 'react';
import { Typography, Button, CircularProgress } from '@mui/material';
import { Target, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { generateResponse } from '../services/openai';

interface PurposeIdentificationProps {
  visionMissionVocation: string;
  purpose: string;
  setPurpose: (purpose: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PurposeIdentification: React.FC<PurposeIdentificationProps> = ({
  visionMissionVocation,
  purpose,
  setPurpose,
  onNext,
  onPrev,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!purpose) {
      analyzePurpose();
    }
  }, []);

  const analyzePurpose = async () => {
    setLoading(true);
    setError(null);
    try {
      const prompt = `PURPOSE is the shared ground of Vision, Mission, and Vocation.

Based on the following Vision, Mission, and Vocation:
${visionMissionVocation}

What might be their purpose?`;

      const response = await generateResponse(prompt);
      setPurpose(response);
    } catch (err) {
      setError('Failed to identify purpose. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Purpose Identification
      </Typography>
      {loading ? (
        <div className="flex flex-col items-center my-8">
          <Target size={64} className="text-purple-500 mb-4" />
          <CircularProgress />
          <Typography variant="body1" className="mt-4">
            Identifying your purpose...
          </Typography>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <Typography variant="body1">{error}</Typography>
        </div>
      ) : (
        <div className="bg-purple-100 p-4 rounded-lg my-4">
          <Typography variant="body1" component="pre" style={{ whiteSpace: 'pre-wrap' }}>
            {purpose}
          </Typography>
        </div>
      )}
      <div className="flex justify-between mt-4">
        <Button variant="outlined" onClick={onPrev} startIcon={<ArrowLeft />}>
          Back
        </Button>
        <Button variant="contained" onClick={analyzePurpose} startIcon={<RefreshCw />}>
          Regenerate
        </Button>
        <Button variant="contained" onClick={onNext} disabled={!purpose} endIcon={<ArrowRight />}>
          See My Golden Circle
        </Button>
      </div>
    </div>
  );
};

export default PurposeIdentification;