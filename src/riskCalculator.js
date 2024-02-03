export function calculateRisk(distance) {
    const maxDistance = 10000; // replace with the maximum possible distance
    let risk = (distance / maxDistance) * 100;
    if (risk > 100) {
      risk = 100;
    }
    return risk;
  }
  