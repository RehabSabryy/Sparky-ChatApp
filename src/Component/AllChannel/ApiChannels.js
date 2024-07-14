const API_KEY = 'aa48e7c5006b463497fad4435a145f75';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

const ApiChannels =[
    { name: "Egypt News", path: "egyptNews", url: `${BASE_URL}?country=eg&apiKey=${API_KEY}`, image:'/images/egy-news.png' },
    { name: "Technology", path: "technology", url: `${BASE_URL}?country=eg&category=technology&apiKey=${API_KEY}`, image:'/images/tech.jpeg' },
    { name: "Egypt Technology", path: "egyptTechnology", url: `${BASE_URL}?country=eg&category=technology&apiKey=${API_KEY}` , image:'/images/tech2.jpeg'},
    { name: "Sports", path: "sports", url: `${BASE_URL}?category=sports&apiKey=${API_KEY}`, image:'/images/sports.png' },
    { name: "Egypt Sports", path: "egyptSports", url: `${BASE_URL}?country=eg&category=sports&apiKey=${API_KEY}` , image:'/images/sports2.png'},
    { name: "US Business News", path: "businessNews", url: `${BASE_URL}?category=business&apiKey=${API_KEY}`, image:'/images/business.jpeg' },
    { name: "EG Business News", path: "egyptBusinessNews", url: `${BASE_URL}?country=eg&category=business&apiKey=${API_KEY}` , image:'/images/business2.jpeg'},
    { name: "World News", path: "worldNews", url: `${BASE_URL}?category=general&apiKey=${API_KEY}`, image:'/images/world.jpeg' },
    { name: "Health News", path: "healthNews", url: `${BASE_URL}?category=health&apiKey=${API_KEY}`, image:'/images/health.jpeg' },
    { name: "Science News", path: "scienceNews", url: `${BASE_URL}?category=science&apiKey=${API_KEY}`, image:'/images/science.jpeg' },
    { name: "Entertainment News", path: "entertainmentNews", url: `${BASE_URL}?category=entertainment&apiKey=${API_KEY}`, image:'/images/ent.png' },
];

export default ApiChannels;