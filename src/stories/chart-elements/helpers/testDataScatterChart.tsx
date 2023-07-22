const simpleBaseChartData1 = [
    {
      x: 100,
      y: 200,
      z: 200,
    },
    {
      x: 120,
      y: 100,
      z: 260,
    },
    {
      x: 170,
      y: 300,
      z: 400,
    },
    {
      x: 140,
      y: 250,
      z: 280,
    },
    {
      x: 150,
      y: 400,
      z: 500,
    },
    {
      x: 110,
      y: 280,
      z: 200,
    },
  ];
  
const simpleBaseChartData2 = [
    {
      x: 200,
      y: 260,
      z: 240,
    },
    {
      x: 240,
      y: 290,
      z: 220,
    },
    {
      x: 190,
      y: 290,
      z: 250,
    },
    {
      x: 198,
      y: 250,
      z: 210,
    },
    {
      x: 180,
      y: 280,
      z: 260,
    },
    {
      x: 210,
      y: 220,
      z: 230,
    },
];

const simpleBaseChartData3 = [
    {
        x: 300,
        y: 260,
        z: 240,
    },
    {
        x: 340,
        y: 290,
        z: 220,
    },
    {
        x: 290,
        y: 290,
        z: 250,
    },
    {
        x: 298,
        y: 250,
        z: 210,
    }
];
  
export const simpleBaseChartData = [
    { location: "Location A", data: simpleBaseChartData1 },
    { location: "Location B", data: simpleBaseChartData2 },
    { location: "Location C", data: simpleBaseChartData3 },
];

export const simpleBaseChartDataRefactored = [
    {
        location: "Location A", 
        x: 100,
        y: 200,
        z: 200,
    },
    {
        location: "Location A", 
        x: 120,
        y: 100,
        z: 260,
    },
    {
        location: "Location A",
        x: 170,
        y: 300,
        z: 400,
    },
    {
        location: "Location B",
        x: 140,
        y: 250,
        z: 280,
    },
    {
        location: "Location B",
        x: 150,
        y: 400,
        z: 500,
    },
    {
        location: "Location B",
        x: 110,
        y: 280,
        z: 200,
    },
    {
        location: "Location C",
        x: 200,
        y: 260,
        z: 240,
    },
    {
        location: "Location C",
        x: 220,
        y: 290,
        z: 120,
    },
    {
        location: "Location C",
        x: 190,
        y: 290,
        z: 250,
    },
];

export const simpleBaseChartDataGithub = [
    {
      country: "Afghanistan",
      lifeExp: 27.7,
      gdpPercap: 1156,
      population: 7480464,
      continent: "Asia",
      happinessLev: 4.5,
    },
    {
      country: "Albania",
      lifeExp: 46.5,
      gdpPercap: 1736,
      population: 1366747,
      continent: "Europe",
      happinessLev: 5.5,
    },
    {
        country: "France",
        lifeExp: 86.5,
        gdpPercap: 5636,
        population: 7000000,
        continent: "Europe",
        happinessLev: 8.5,
    },
    {
        country: "South Africa",
        lifeExp: 75.5,
        gdpPercap: 3694,
        population: 4100000,
        continent: "Africa",
        happinessLev: 6.5,
    },
]