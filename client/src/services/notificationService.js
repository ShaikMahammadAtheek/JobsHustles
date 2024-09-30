import axios from 'axios';

const API_URL = 'https://jobshustle-tobl.onrender.com/notifications';

export const getNotifications = () => axios.get(API_URL);
