import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

/*export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }*/
const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  //document.title = `${capitalizeFirstLetter(props.category)} - NewsDaily`;

  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  /*constructor(props){
    super(props);
    this.state = {
        articles: [],
        loading: true,
        page:1,
        totalResults: 0
    }
    
}*/

  const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eea804a205754f9b97d568a96f84a1ce&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  /*async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eea804a205754f9b97d568a96f84a1ce&page=${this.state.page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }*/
  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewsDaily`;
    updateNews();
  },[])

  /*async componentDidMount(){
    this.updateNews();
  }  
  /*handlePrevClick = async ()=>{
    this.setState({page:this.state.page - 1});
    this.updateNews();
    }*/
  

  /*handleNextClick = async ()=>{
    this.setState({page:this.state.page + 1});
    this.updateNews();
  }*/

  const fetchMoreData = async () => {
      
      
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eea804a205754f9b97d568a96f84a1ce&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1);
      setLoading(true);
      const data = await fetch(url);
      const parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      /*this.setState({
        articles: articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        page: nextPage,
        loading: false,
      });*/
  }

  
  
    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px', marginTop:'90px'}}>NewsHeadlines - {capitalizeFirstLetter(props.category)}</h1>
        {loading && <Spinner/>}
        <InfiniteScroll 
          dataLength={articles.length} 
          next={fetchMoreData} 
          hasMore={articles.length < totalResults} 
          loader={<Spinner/>}>
        <div className="container">    
        <div className="row">
        {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title?element.title:""} 
                          description={element.description?element.description:""} 
                          imageUrl={element.urlToImage} 
                          newsUrl={element.url} 
                          author={element.author} 
                          date={element.publishedAt} 
                          source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/*<div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>*/}
      </>
    )
  
}

News.defaultProps = {
  country: 'us',
  pageSize: 6,
  category: 'general',
} 
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News
