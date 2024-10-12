export enum CHART_COLOR_SCHEME {
  purple,
  violet,
  fuchsia,
  indigo,
  blue,
  sky,
  teal,
  emerald,
  green,
  lime,
  yellow,
  amber,
  orange,
  zinc,
  default,
}

export interface ChartObject {
  name: string | number;
  value: number | string;
  category?: string;
}

export interface ChartData {
  name: string | number;
  value: number | string;
  category?: string;
  fill: string;
}

export const createChartColorScheme = (color: CHART_COLOR_SCHEME) => {
  switch (color) {
    case CHART_COLOR_SCHEME.purple:
      return [
        "#3b0764",
        "#581c87",
        "#6b21a8",
        "#7e22ce",
        "#9333ea",
        "#a855f7",
        "#c084fc",
        "#d8b4fe",
        "#e9d5ff",
        "#f3e8ff",
        "#faf5ff",
      ];
    case CHART_COLOR_SCHEME.violet:
      return [];
    case CHART_COLOR_SCHEME.fuchsia:
      return [];
    case CHART_COLOR_SCHEME.indigo:
      return [];
    case CHART_COLOR_SCHEME.blue:
      return [];
    case CHART_COLOR_SCHEME.sky:
      return [];
    case CHART_COLOR_SCHEME.teal:
      return [];

    case CHART_COLOR_SCHEME.emerald:
      return [];
    case CHART_COLOR_SCHEME.green:
      return [];
    case CHART_COLOR_SCHEME.lime:
      return [];
    case CHART_COLOR_SCHEME.yellow:
      return [];
    case CHART_COLOR_SCHEME.amber:
      return [];
    case CHART_COLOR_SCHEME.orange:
      return [];
    case CHART_COLOR_SCHEME.zinc:
      return [];

    default:
      return [
        "#2a9d90", //0
        "#fb923c", //1
        "#1e1b4b", //2
        "#e8c468", //3
        "#3f3f46", //4
        "#e76e50",
        "#374151",
        "#d8b4fe",
        "#e9d5ff",
        "#f3e8ff",
        "#faf5ff",
      ];
  }
};

export const CustomChartColors: string[] = [];

export const createChartData = (
  data: ChartObject[],
  colorScheme: CHART_COLOR_SCHEME
) => {
  const colors = createChartColorScheme(colorScheme);
  var _data: ChartData[] = [];
  for (let item = 0; item < data.length; item++) {
    const element: ChartData = {
      name: data[item].name,
      value: data[item].value,
      fill: colors[item],
      category: data[item].category,
    };
    _data.push(element);
  }

  return _data;
};

export const createCustomChartData = (
  data: any,
  colorScheme: CHART_COLOR_SCHEME
) => {
  const colors = createChartColorScheme(colorScheme);
};
