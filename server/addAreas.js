// Script to add areas to the database
const mongoose = require('mongoose');
const schemas = require('./schemas.js');
let Area = schemas.Area;

mongoose.connect('mongodb://localhost/applehomes');

const areaArray = [
  {
    city: 'Arcadia',
    description: 'Arcadia is a city in Los Angeles County, California, United States located about 13 miles (21 km) northeast of downtown Los Angeles in the San Gabriel Valley and at the base of the San Gabriel Mountains. It is the site of the Santa Anita Park racetrack and home to the Los Angeles County Arboretum and Botanic Garden. The city had a population of 56,364 at the 2010 census, up from 53,248 at the 2000 census. The city is named after Arcadia, Greece. In 2016, Arcadia was ranked the 5th most expensive housing market in the United States by Business Insider, with an average list of $1,748,680 for a four-bedroom home. In 2012, Arcadia was ranked 7th in the nation on CNN Money magazine\'s list of towns with highest median home costs. Arcadia\'s Upper Rancho neighborhood was ranked the 23rd richest neighborhood in Southern California by Business Insider in 2014 out ranking Orange County\'s Newport Beach with a median household income of $310,779. In 2010, Bloomberg Businessweek named Arcadia as one of the "Best Places to Raise Your Kids: 2010" for the second year in a row.',
    picture: 'arcadia.jpg'
  },
  {
    city: 'San Gabriel',
    description: 'San Gabriel is a city in Los Angeles County, California. It is named after the Mission San Gabriel Arcángel (which in turn was named for Archangel Gabriel), founded by Junípero Serra. The city grew outward from the mission and in 1852 became the original township of Los Angeles County. San Gabriel was incorporated in 1913. The city\'s motto is "A city with a Mission" and it is often called the "Birthplace" of the Los Angeles metropolitan area. At the 2010 census, the population was 39,718.',
    picture: 'sangabriel.jpg'
  },
  {
    city: 'Monrovia',
    description: 'Monrovia is a city located in the foothills of the San Gabriel Mountains in the San Gabriel Valley of Los Angeles County, California, United States. The population was 36,590 at the 2010 census, down from 36,929 in 2000. Monrovia has been used for filming TV shows, movies and commercials.',
    picture: 'monrovia.jpg'
  },
  {
    city: 'Monterey Park',
    description: 'Monterey Park is a hillside suburban city in Los Angeles County, California, United States, 7 miles (11 km) east of Downtown Los Angeles. The city\'s motto is "Pride in the past, Faith in the future". Monterey Park is part of a cluster of cities (Alhambra, Arcadia, Temple City, Rosemead, San Marino, and San Gabriel in the west San Gabriel Valley) with a growing Asian American population, making up 66.9% of its resident population at 2010; 47.7% of its residents are of Chinese descent, the largest concentration of Chinese Americans of any municipality in the United States. According to the 2010 Census, the city had a total population of 60,269.',
    picture: 'montereypark.jpg'
  },
  {
    city: 'La Puente',
    description: 'La Puente is a city in Los Angeles County, California, United States. The population was 39,816 at the 2010 census. The city lies approximately 20 miles east of downtown Los Angeles.',
    picture: 'lapuente.jpg'
  },
  {
    city: 'Pasadena',
    description: 'The city is known for hosting the annual Rose Bowl football game and Tournament of Roses parade. In addition, Pasadena is also home to many scientific and cultural institutions, including the Caltech, JPL,[20] Pasadena City College, Fuller Theological Seminary, Art Center College of Design, the Pasadena Playhouse, the Norton Simon Museum and the USC Pacific Asia Museum.',
    picture: 'pasadena.jpg'
  },
  {
    city: 'Temple City',
    description: 'Temple City is a city in Los Angeles County, California. Temple City is part of a cluster of cities, along with Arcadia, Rosemead, Monterey Park, San Marino, and San Gabriel, in the west San Gabriel Valley with a rapidly growing Asian population. Temple City also has a Cuban and Puerto Rican community, among other Latino nationalities. Approximately one third of the city\'s population is white. The population was 35,558 at the 2010 census.',
    picture: 'templecity.jpg'
  },
];

areaArray.forEach(area => {
  Area.create(area, (err, area) => {
    if (err) { console.log('Error in creating areas in DB', err); }
  });
});