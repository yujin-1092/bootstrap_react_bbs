import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from "axios";
import { Link } from "react-router-dom";


export default class View extends Component {
  state= {
    title:'',
    content:''
  }

  datail = () =>{
    let url = window.location.href;
    let urlParams = url.split('?')[1];
    
    const searchParams = new URLSearchParams(urlParams); 
    let id = searchParams.get('id')

    Axios.get(`http://localhost:8000/detail?id=${id}`)
    .then((res) => {
      const {data} = res;  
      this.setState({
        title:data[0].BOARD_TITLE,
        content: data[0].BOARD_CONTENT     
      })
    })
    .catch((e)=> {
      // 에러 핸들링
      console.log(e);
    });     
  }
  //this.prop.isModifyMode에 변동사항이 생기면 detail 함수 실행, componentDidUpdate 함수로 

  componentDidMount() {    
      this.datail();
  }
  render() {
    return (     
      <div>
        <h2>{this.state.title}</h2>
        <h2>본문</h2>
        {this.state.content}
        <hr/>
        <Link to="/" className="btn btn-secondary">목록</Link>  
      </div>      
    )
  }
}