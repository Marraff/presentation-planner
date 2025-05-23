function roundNumber(numberToRound: number, roundToDigits: number): number {

  if (roundToDigits >= 0) {
    let multiplier = 1;

    for (let i = 0; i < roundToDigits; i++) {
      multiplier *= 10;
    }

    const shifted = numberToRound / multiplier;
    const temp = shifted + 0.5;
    const floor = temp - (temp % 1);

    return floor * multiplier;
  } 

  else {
    let multiplier = 1;
    for (let i = 0; i < -roundToDigits; i++) {
      multiplier /= 10;
    }

    const shifted = numberToRound / multiplier;
    const temp = shifted + 0.5;
    const floor = temp - (temp % 1);
    return floor * multiplier;
  }
}

export default roundNumber;