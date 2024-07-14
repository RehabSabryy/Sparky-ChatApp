import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ApiChannels from './ApiChannels';
export default function ChannelDetails() {
    const { channel } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getChannelData = async () => {
        try {
          const selectedChannel = ApiChannels.find(ch => ch.path === channel);
          if (!selectedChannel) throw new Error('Channel not found');
          
          const { data } = await axios.get(selectedChannel.url);
          setArticles(data.articles);
          console.log(data.articles);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      getChannelData();
    }, [channel]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    const selectedChannel = ApiChannels.find(ch => ch.path === channel);
    return (
      <>
        <div className='d-flex align-items-center ms-5'>
        {selectedChannel?.image && <img src={selectedChannel.image} alt={selectedChannel.name} className="icon-size me-3 rounded-circle" />}
        <h2>{selectedChannel?.name}</h2>
        </div>
        <div>
          {articles.map((article, index) => (
            <>
            <div className="bg-light p-3 m-3 w-75 rounded-5">
              <a href={article.url} key={index} target="_blank" rel="noopener noreferrer">
                  <h5 key={index}>{article.title}</h5>
              </a>
              <h6>{article.author}</h6>
            </div>
            </>
          ))}
        </div>
      </>
    );
  }
