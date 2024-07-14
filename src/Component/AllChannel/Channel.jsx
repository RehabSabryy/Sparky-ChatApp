import React from 'react';
import { Link } from 'react-router-dom';
import ApiChannels from './ApiChannels';
import { motion } from 'framer-motion';

export default function Channel() {
  return (
    <div className="bg-light p-5">
      <h1>Channels</h1>
      <div className='row'>
        {ApiChannels.map((channel, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="col-md-3"
          >
            <Link to={`/layout/channels/${channel.path}`} className="channel-link text-decoration-none">
              <div className="channel-card">
                <img src={channel.image} alt={channel.name} className="channel-image rounded-circle" />
                <h5>{channel.name}</h5>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
