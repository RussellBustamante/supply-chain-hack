import React, { useState, useEffect } from 'react';

const HoustonTrafficNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = '5e0238206450414cb6fd4e5c6088eadf'; // Replace this with your NewsAPI key
      const query = encodeURIComponent(`Houston AND (traffic OR "road closure" OR "traffic report" OR "highway updates")`);
      const apiUrl = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2>Houston Traffic News</h2>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
              - {new Date(article.publishedAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No news found.</p>
      )}
    </div>
  );
};

export default HoustonTrafficNews;
