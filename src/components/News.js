import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'science',
}

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
    // articles=

    //     // {"source":{"id":"bbc-sport","name":"BBC Sport"},"author":"BBC Sport","title":"Shane Warne memorial - watch & follow updates","description":"Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.","url":"http://www.bbc.co.uk/sport/live/cricket/60916236","urlToImage":"https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png","publishedAt":"2022-03-30T08:22:26.498888Z","content":"Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"},{"source":{"id":"espn-cric-info","name":"ESPN Cric Info"},"author":null,"title":"PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com","description":"Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com","url":"http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket","urlToImage":"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg","publishedAt":"2020-04-27T11:41:47Z","content":"Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"},{"source":{"id":"espn-cric-info","name":"ESPN Cric Info"},"author":null,"title":"What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com","description":"Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com","url":"http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again","urlToImage":"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg","publishedAt":"2020-03-30T15:26:05Z","content":"Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"}
    //   
    capitalizeFirstLetter =(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }


    constructor(props){
        super(props);
        this.state= {
            articles:[],
            loading:true,
             page: 1,
             totalResults: 0
        }
document.title=`${this.capitalizeFirstLetter(this.props.category)} - HotNews `;

    }

    async componentDidMount(){
    // console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8712f62dbc041bfa719c2697391e748&page=${this.props.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
let parsedData = await data.json()
// console.log(parsedData);
this.setState({articles: parsedData.articles,
  totalResults:parsedData.totalResults,
  loading: false})
}

handlePrevClick = async ()=>{
  // console.log("previous");
  let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8712f62dbc041bfa719c2697391e748&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({
    page:this.state.page - 1,
    articles: parsedData.articles,
    loading: false
  })

}
handleNextClick = async ()=>{
  // console.log("Next");
  if(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)){
  }
  else{

    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8712f62dbc041bfa719c2697391e748&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      page:this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })
  }}

//   fetchMoreData = async () => {
//     console.log("ali");
//     this.setState({page: this.state.page + 1})
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8712f62dbc041bfa719c2697391e748&page=${this.props.page}&pageSize=${this.props.pageSize}`;
//     this.setState({loading:true});
//     let data = await fetch(url);
// let parsedData = await data.json()

// this.setState({
//   articles: this.state.articles.concat(parsedData.articles),
//   totalResults:parsedData.totalResults,
//   loading: false,
// })
// }


  render() {
    return (
      <div className="container">
        <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>HotNews - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>} > */}
            <div className="container">
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
            //  {this.state.articles.map((element)=>{
return <div className="col-md-4" key={element.url}>
<NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
    </div>
            })}
             </div>
             </div>
            {/* </InfiniteScroll> */}
             <div className="container d-flex justify-content-between my-4">
             <button disabled={this.state.page<=1} type="button" className="btn btn-primary mx-2" onClick={this.handlePrevClick}>&larr; Previous</button>
             <button disabled={(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
             </div>

      </div>
    )
  }
}






// for set words
// .slice(0, 40)
