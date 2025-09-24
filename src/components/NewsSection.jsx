import { useEffect, useState } from 'react';
import './NewsSection.css';
import defaultNewsImg from '../assets/news-default.jpg';

function NewsSection() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(setNews)
      .catch(err => console.error('Error fetching news:', err));
  }, []);

  return (
    <div className="news-section">
      <h4>Latest Market News</h4>
      <div className="news-grid">
        {news.map((article, index) => (
          <div key={index} className="news-card">
            <img
              src={article.urlToImage || defaultNewsImg}
              className="news-image"
              onError={e => { e.target.src = defaultNewsImg; }}
            />
            <div className="news-meta">
              <span className="news-source">{article.source?.name}</span>
              <span className="news-date">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''}</span>
            </div>
            <h3 className="news-title">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h3>
            <p className="news-description">
              {article.description || 'No description available.'}
            </p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-button">
              Read Full Article
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsSection;
