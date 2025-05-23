import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  Divider
} from '@mui/material';
import roundNumber from '../../utils/roundUtils';
import { useTranslation } from 'react-i18next';

const RoundNumberPage = () => {
  const testCases = [
    { value: 1234.567, digits: 0 },
    { value: 1234.567, digits: 1 },
    { value: 1234.567, digits: -1 },
    { value: 1234.567, digits: -2 },
  ];

  const [inputValue, setInputValue] = useState<string>('');
  const [roundDigits, setRoundDigits] = useState<string>('');

  const parsedValue = parseFloat(inputValue);
  const parsedDigits = parseInt(roundDigits);
  const isValid = !isNaN(parsedValue) && !isNaN(parsedDigits);
  const { t } = useTranslation();

  return (
    <Card sx={{ maxWidth: 600, margin: '2rem auto', padding: 2, elevation: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
            {t("round.show")}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {t("round.text")}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
          <TextField
            label={t("round.num")}
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
          />
          <TextField
            label={t("round.round")}
            type="number"
            value={roundDigits}
            onChange={(e) => setRoundDigits(e.target.value)}
            fullWidth
          />
        </Box>

        {isValid ? (
          <Typography variant="body1" color="primary" gutterBottom>
            {t("round.result")}: <strong>{roundNumber(parsedValue, parsedDigits)}</strong>
          </Typography>
        ) : (
          <Typography variant="body2" color="error">
            {t("round.error")}
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          {t("round.pre")}:
        </Typography>
        <List>
          {testCases.map((test, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`roundNumber(${test.value}, ${test.digits})`}
                secondary={`= ${roundNumber(test.value, test.digits)}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RoundNumberPage;
