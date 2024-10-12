import React from 'react';
import { Typography, Button, IconButton } from '@mui/material';
import { ChevronUp, ChevronDown, ArrowRight } from 'lucide-react';

interface BirthYearSelectionProps {
  birthYear: number;
  setBirthYear: (year: number) => void;
  onNext: () => void;
}

const BirthYearSelection: React.FC<BirthYearSelectionProps> = ({ birthYear, setBirthYear, onNext }) => {
  const increaseYear = () => setBirthYear(birthYear + 1);
  const decreaseYear = () => setBirthYear(birthYear - 1);

  return (
    <div className="text-center">
      <Typography variant="h4" gutterBottom>
        When were you born?
      </Typography>
      <div className="flex flex-col items-center my-8">
        <IconButton onClick={increaseYear} color="primary">
          <ChevronUp size={32} />
        </IconButton>
        <Typography variant="h2" className="my-4">
          {birthYear}
        </Typography>
        <IconButton onClick={decreaseYear} color="primary">
          <ChevronDown size={32} />
        </IconButton>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={onNext}
        className="mt-4"
        endIcon={<ArrowRight />}
      >
        Next
      </Button>
    </div>
  );
};

export default BirthYearSelection;