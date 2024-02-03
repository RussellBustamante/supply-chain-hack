// riskCalculator.js

/**
 * Converts the DOT Safety Score to a numerical value.
 * Satisfactory = 0, Conditional = 1, Unsatisfactory = 2
 */
const convertDOTSafetyScore = (dotSafetyScore) => {
    switch (dotSafetyScore) {
      case 'Satisfactory':
        return 0;
      case 'Conditional':
        return 1;
      case 'Unsatisfactory':
        return 2;
      default:
        return 0; // Default to the lowest risk if unknown
    }
  };
  
  /**
   * Normalizes the distance deviation into a score.
   * This is a simple example; adjust the ranges and scores as needed.
   */
  const normalizeDistanceDeviation = (distance) => {
    if (distance <= 10) return 0;
    if (distance <= 50) return 1;
    return 2; // Consider anything above 50 meters as highest risk in this model
  };
  
  /**
   * Categorizes the value of goods into a score.
   * Adjust the ranges based on the specifics of your operations.
   */
  const categorizeValueOfGoods = (value) => {
    if (value <= 10000) return 0;
    if (value <= 50000) return 1;
    return 2; // High-value goods
  };
  
  /**
   * Converts weather conditions to a score.
   * Implement this based on your weather categorization.
   */
  const convertWeatherConditions = (weather) => {
    // Example: Clear = 0, Rain = 1, Severe = 2
    switch (weather) {
      case 'Clear':
        return 0;
      case 'Rain':
        return 1;
      case 'Severe':
        return 2;
      default:
        return 1; // Default to moderate risk
    }
  };

  const adjustReliabilityScore = (historicalReliability) => {
    // Inverse the score to reflect lower risk with higher reliability
    return 1 - (historicalReliability / 100);
  };
  
  /**
   * Calculates the overall risk score based on inputs and predefined weights.
   */
  export const calculateRiskScore = (dotSafetyScore, historicalReliability, distanceDeviation, valueOfGoods, weatherConditions) => {
    // Define weights for each factor
    const weights = {
      dotSafety: 0.25,
      reliability: 0.25,
      distance: 0.25,
      value: 0.15,
      weather: 0.1,
    };
  
    // Convert and normalize inputs
    const dotSafety = convertDOTSafetyScore(dotSafetyScore);
    const reliabilityScore = adjustReliabilityScore(historicalReliability); // Adjusted calculation
    const distanceScore = normalizeDistanceDeviation(distanceDeviation);
    const valueScore = categorizeValueOfGoods(valueOfGoods);
    const weatherScore = convertWeatherConditions(weatherConditions);
  
    // Calculate the weighted sum
    const riskScore = (
      (dotSafety * weights.dotSafety) +
      (reliabilityScore * weights.reliability) + // Adjusted score
      (distanceScore * weights.distance) +
      (valueScore * weights.value) +
      (weatherScore * weights.weather)
    );
  
    // Adjust the final score to ensure it ranges between 0 and 1
    return Math.min(Math.max(riskScore, 0), 1);
  };
