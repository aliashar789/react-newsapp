import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imgUrl, newsUrl, author, date}= this.props;
    return (
      <div>
        
        <div className="card my-2">
  <img src={imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} On {date}</small></p>
    <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
  </div>
</div>

      </div>
    )
  }
}

export default NewsItem
