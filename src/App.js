import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './plants.css';
import Plant from './Plant'
import PlantsDB from './plantDB'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const axios = require('axios');
//API Authentcation 
const token='R1ZuUENNOXBnR0RrQkpjSHAxenM5Zz09';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      plants: [],//save the current 30 plant 
      my_plants: [],//save plants ids'
      current: {},
      page_num:1
    }
    // this.toggle = this.toggle.bind(this);

  }


  handleAddToggle = (plant) => {
    // film:{}
    console.log(plant);

    this.handleAddToggle = this.handleAddToggle.bind(this)
    const my_plants = this.state.my_plants.slice()
    const filmIndex = my_plants.indexOf(plant)

    if (filmIndex === -1) {
      my_plants.push(plant)
    } else {
      my_plants.splice(filmIndex, 1)
    }
    console.log(my_plants)

    this.setState({ my_plants })
  }
  changePage =(page_num)=>{
console.log(page_num)
this.setState({
page_num:page_num
})
this.start()

  }
  //get all plants and send it to plan card
  // componentDidMount(){
  start= () => {
    // var url = "https://trefle.io/api/plants?q=strawberry&token=R1ZuUENNOXBnR0RrQkpjSHAxenM5Zz09";
    //"http://trefle.io/api/plants/129137"
    //q=rosemary
    axios({//page=3&
      url: `https://trefle.io/api/plants/?page=${this.state.page_num}&token=R1ZuUENNOXBnR0RrQkpjSHAxenM5Zz09`,
    }).then(respo => {
        console.log(respo) // take a look at what you get back!
        this.setState({
          plants: respo.data
        })
      })
        .catch(e=>{
          console.log("slove it from database")
          this.setState({
            plants: PlantsDB.plants
          })
      })
  }

  render() {
    this.start()
    var plants_list = this.state.plants.map((plant) => {
      return <Plant name={plant.common_name} id={plant.id} sci_name={plant.scientific_name} key={plant.id} />
    })

    
    return (
      <div className="App">
           
        <header className="page-header">
          <a href="#default" className="logo">Cactus</a>
          <div className="header-right">
            <a className="active" href="#home">my plants</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
          </div>
         
        </header>

        <div className="contant">
        <div className='fillter_header'>
        <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={()=>{this.changePage(1)}} href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={()=>{this.changePage(2)}} href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={()=>{this.changePage(3)}} href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={()=>{this.changePage(4)}} href="#">
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink  onClick={()=>{this.changePage(5)}} href="#">
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
    
      </Pagination>
         </div>
          {plants_list}
        </div>
   
  
        <footer>

        </footer>
      </div>
    );
  }
}

export default App;
