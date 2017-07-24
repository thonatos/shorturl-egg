import React, { Component } from 'react'
import axios from 'axios'
import Layout from './components/Layout'
import './Home.css'

const Result = ({url}) => {
  if(!url){
    return null
  }

  return (
    <div className="result">
      <input className="short-url" type="text" value={url} />
    </div>
  )
}

class Index extends Component {

  state = {
    shortUrl: '',
    longUrl: ''
  }

  onBlur = (ev) => {
    this.setState({
      longUrl: ev.target.value
    })
  }

  onClick = (ev) => {
    ev.preventDefault()
    axios.post('/api/v1/shorten', {
      'url': this.state.longUrl
    }).then((response) => {
      if (response.status === 200) {
        let data = response.data
        this.setState({
          shortUrl: data.shorturl
        })
      }
    }).catch((error) => {
      let res = error.response
      alert(res.statusText)
    })
  }

  render() {
    return (
      <Layout>
        <div className="container info">
          <div className="shorten">
            <input name="long_url" type="text" placeholder="https://www.thonatos.com" className="long-url" onBlur={this.onBlur} />
            <a className="btn-shorten" onClick={this.onClick}>Shorten</a>
          </div>
          <div className="result">
            <Result url={this.state.shortUrl}/>            
          </div>
          <div>
            <p style={{
              color: '#bdb5b5',
              fontSize: '12px'
            }}>URL Scheme is required.</p>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Index