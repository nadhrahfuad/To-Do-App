import { useState, useEffect } from 'react';
import LoadingIcon from '../assets/inprogress.gif'
import ErrorIcon from '../assets/boat.gif'
import '../components/css/custom.css'

const TravelNewsComponent = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravelNews = async () => {
      try {
        const apiKey = 'bb52d246d9c24afb8366a8f1366692c7';
        const apiUrl = 'https://newsapi.org/v2/everything?'
        const query = 'travel'
        const doubleQuote = '%22'
        const url = `${apiUrl}q=${doubleQuote}${query}${doubleQuote}&apiKey=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        console.error('THE ERROR:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchTravelNews();
  }, []);

  if (loading) {
    return(
    <div className="loading-container"> 
    {/* render text if gif prob */}
        {LoadingIcon?(<img src={LoadingIcon} alt=""/>):(<h4>Hang in there...</h4>)}
      </div>

      
    )
  }

  if (error) {
    console.log(error.message)
    return <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div className="d-flex justify-content-center flex-column align-items-center">
              <h4 className="align-items-center">
              Oops! Our servers are adrift in the digital ocean.
              </h4>
              <h5>
              Please try again later!
              </h5>  
              {ErrorIcon?(<img src={ErrorIcon} alt=""/>):(<p></p>)}
              
          </div>
      </div>
  }

  //take only the articles that have not been removed
  const filteredArticles =
   articles.filter(article => 
    article.source.id !== null && article.author !== null && article.urlToImage !== null
  );


  return (
    <div className="container">
      <h1 className="my-4">Travel News</h1>
      <div className="row">
        {filteredArticles.map((article, index) => (
          <div key={index} className="col-lg-4 mb-4">
            <div className="card h-100">
              {article.urlToImage && (
                <img src={article.urlToImage} className="card-img-top" alt={article.title} />
              )}
              <div className="card-body">
                {/* open in blank pg, don't allow page to interact with original page - noopener don't allow opened page to know original url -noreferrer */}
                <h5 className="card-title"><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></h5>
                <p className="card-text">{article.description}</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">Published At: {new Date(article.publishedAt).toLocaleString()}</small>
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelNewsComponent;
