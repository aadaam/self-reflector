import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { initializeOpenAI } from '../services/openai';

interface ApiKeyInputProps {
  onApiKeySet: () => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      initializeOpenAI(apiKey);
      onApiKeySet();
    }
  };

  return (
    <div className="text-center">
      <Typography variant="h4" gutterBottom>
        Enter your OpenAI API Key
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <TextField
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          label="API Key"
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" disabled={!apiKey}>
          Set API Key
        </Button>
      </form>
    </div>
  );
};

export default ApiKeyInput;