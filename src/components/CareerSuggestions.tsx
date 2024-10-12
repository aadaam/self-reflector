import React, { useState } from 'react';
import { Typography, Button, CircularProgress, Tabs, Tab } from '@mui/material';
import { Briefcase, Building, Lightbulb, ArrowLeft, RefreshCw } from 'lucide-react';
import { generateResponse } from '../services/openai';

interface CareerSuggestionsProps {
  goldenCircle: string;
  careerSuggestions: string;
  setCareerSuggestions: (careerSuggestions: string) => void;
  onPrev: () => void;
}

const CareerSuggestions: React.FC<CareerSuggestionsProps> = ({
  goldenCircle,
  careerSuggestions,
  setCareerSuggestions,
  onPrev,
}) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const analyzeCareers = async (type: string) => {
    setLoading(true);
    setError(null);
    try {
      let prompt = '';
      switch (type) {
        case 'jobs':
          prompt = 'What are their ideal jobs?';
          break;
        case 'companies':
          prompt = 'What are their ideal companies?';
          break;
        case 'startups':
          prompt = 'What startup ideas match them?';
          break;
      }

      prompt += `\n\nBased on their Golden Circle:\n${goldenCircle}`;

      const response = await generateResponse(prompt);
      setCareerSuggestions(response);
    } catch (err) {
      setError('Failed to generate career suggestions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    const types = ['jobs', 'companies', 'startups'];
    analyzeCareers(types[newValue]);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Career Suggestions
      </Typography>
      <Tabs value={activeTab} onChange={handleTabChange} centered className="mb-4">
        <Tab icon={<Briefcase />} label="Ideal Jobs" />
        <Tab icon={<Building />} label="Ideal Companies" />
        <Tab icon={<Lightbulb />} label="Startup Ideas" />
      </Tabs>
      {loading ? (
        <div className="flex flex-col items-center my-8">
          <CircularProgress />
          <Typography variant="body1" className="mt-4">
            Generating career suggestions...
          </Typography>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <Typography variant="body1">{error}</Typography>
        </div>
      ) : (
        <div className="bg-purple-100 p-4 rounded-lg my-4">
          <Typography variant="body1" component="pre" style={{ whiteSpace: 'pre-wrap' }}>
            {careerSuggestions}
          </Typography>
        </div>
      )}
      <div className="flex justify-between mt-4">
        <Button variant="outlined" onClick={onPrev} startIcon={<ArrowLeft />}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            const types = ['jobs', 'companies', 'startups'];
            analyzeCareers(types[activeTab]);
          }}
          startIcon={<RefreshCw />}
        >
          Regenerate
        </Button>
      </div>
    </div>
  );
};

export default CareerSuggestions;