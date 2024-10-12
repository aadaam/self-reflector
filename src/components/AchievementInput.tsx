import React, { useState } from 'react';
import { Typography, Button, TextField, IconButton, List, ListItem, ListItemText, Snackbar } from '@mui/material';
import { Plus, Trash2, MoveUp, MoveDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface AchievementInputProps {
  achievements: string[];
  setAchievements: (achievements: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const AchievementInput: React.FC<AchievementInputProps> = ({ achievements, setAchievements, onNext, onPrev }) => {
  const [newAchievement, setNewAchievement] = useState('');
  const [showError, setShowError] = useState(false);

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements([...achievements, newAchievement.trim()]);
      setNewAchievement('');
    }
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const moveAchievement = (index: number, direction: 'up' | 'down') => {
    const newAchievements = [...achievements];
    if (direction === 'up' && index > 0) {
      [newAchievements[index - 1], newAchievements[index]] = [newAchievements[index], newAchievements[index - 1]];
    } else if (direction === 'down' && index < achievements.length - 1) {
      [newAchievements[index], newAchievements[index + 1]] = [newAchievements[index + 1], newAchievements[index]];
    }
    setAchievements(newAchievements);
  };

  const handleNext = () => {
    if (achievements.length >= 20) {
      onNext();
    } else {
      setShowError(true);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        What are your greatest achievements?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Add at least 20 achievements you're proud of. They can be from any year of your life.
      </Typography>
      <div className="flex gap-2 mb-4">
        <TextField
          fullWidth
          variant="outlined"
          value={newAchievement}
          onChange={(e) => setNewAchievement(e.target.value)}
          placeholder="Enter an achievement..."
        />
        <IconButton onClick={addAchievement} color="primary">
          <Plus />
        </IconButton>
      </div>
      <List>
        {achievements.map((achievement, index) => (
          <ListItem key={index} className="flex items-center gap-2">
            <ListItemText primary={achievement} />
            <IconButton onClick={() => moveAchievement(index, 'up')} disabled={index === 0}>
              <MoveUp />
            </IconButton>
            <IconButton onClick={() => moveAchievement(index, 'down')} disabled={index === achievements.length - 1}>
              <MoveDown />
            </IconButton>
            <IconButton onClick={() => removeAchievement(index)} color="error">
              <Trash2 />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <div className="flex justify-between mt-4">
        <Button variant="outlined" onClick={onPrev} startIcon={<ArrowLeft />}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} endIcon={<ArrowRight />}>
          Let's see what my values are...
        </Button>
      </div>
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        message="Please add at least 20 achievements to continue."
      />
    </div>
  );
};

export default AchievementInput;