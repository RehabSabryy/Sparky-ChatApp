import axios from 'axios';

const API_KEY = 'aa48e7c5006b463497fad4435a145f75';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchNews = async (country, category='') => {
    try {
        const { data } = await axios.get(`${BASE_URL}?country=${country}&category=${category}&apiKey=${API_KEY}`);
        return data.articles;
      } catch (error) {
        throw error;
      }
}