import axios from 'axios';

export default async (req, res) => {
    try {
        const response = await axios.get('https://poetrydb.org/title,random/Sonnet;10');
        const data = response.data;

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching poems:', error);
        res.status(500).json({ error: 'Error fetching poems' });
    }
};
