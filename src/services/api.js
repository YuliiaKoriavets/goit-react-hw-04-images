import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
    key: '32552892-db73f2ff6c64788c5f5e746be',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
  
export async function getImages(searchQuery, page) {
    const res = await axios.get(`?q=${searchQuery}&page=${page}&${searchParams}`);
    const data = res.data;
    return data;
  }