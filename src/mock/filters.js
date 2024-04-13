import { FilterType, filters } from '../const';


function generateFilters(points) {
  return Object.entries(filters).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(points).length
    })
  );
}

export { generateFilters };
