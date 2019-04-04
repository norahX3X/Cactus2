import React, { Component } from 'react';
import './plants.css';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const axios = require('axios');
//API Authentcation 
const token='R1ZuUENNOXBnR0RrQkpjSHAxenM5Zz09';


const random_images=[
'https://hdwallsource.com/img/2014/11/bee-26601-27293-hd-wallpapers.jpg',
'https://cdn.shopify.com/s/files/1/1124/9666/files/plants-menu-image_500x.jpg?v=1545416545',
'https://i0.wp.com/www.healthline.com/hlcmsresource/images/topic_centers/1047-The_Best_Air-Purifying_Plants_For_Your_Home-1296x728-Spider_Plant.jpg?w=1155&h=1528',
'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
'https://images.unsplash.com/photo-1550175222-fefb8d3634c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
]
class Plant extends Component {
    constructor(props){
      super(props);

      this.state={
        id:this.props.id,
        name:this.props.name,
        sci_name:this.props.sci_name,
        image:random_images[Math.floor((Math.random() * 4))],
        seassons:'not spisify / All time',
        type:'plant',
        modal: false,
        moreInfo:'https://plants.sc.egov.usda.gov/java/',
        temp: '24 - 32',
        shade:'shadow',
        growth_rate:'rabide'
      }
      this.handleDetailsClick = this.handleDetailsClick.bind(this)

    }
    handleDetailsClick(plant) {
      console.log(plant.name)
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
    moreInfo(plant){
         window.open(plant, "_blank") //to open new page

    }

    componentDidMount() {
    // start= () => {
      axios({
        url: `https://trefle.io/api/plants/${this.props.id}?token=R1ZuUENNOXBnR0RrQkpjSHAxenM5Zz09`,
      }).then(respo => {
          // console.log(respo.data) // take a look at what you get back!
          if(respo.data.images.length > 0){
          this.setState({
            image: respo.data.images[0].url//+index number of araay !! .main_species 
          })
        }
        //main_species.specifications.growth_period
        console.log(respo.data.main_species.specifications.growth_period)
        if(respo.data.main_species.specifications.growth_period!= null){
          this.setState({
            seassons: respo.data.main_species.specifications.growth_period
          })
        }
        if(respo.data.family_common_name != null){
          this.setState({
            type: respo.data.family_common_name
          })
        }
        if(respo.data.main_species.growth.temperature_minimum.deg_c !== null){
          this.setState({
            temp: Math.floor(respo.data.main_species.growth.temperature_minimum.deg_c)
          })
        }  
        if(respo.data.main_species.shade_tolerance != null){
          this.setState({
            shade: respo.data.main_species.shade_tolerance
          })
        }  
        this.setState({
          moreInfo: respo.data.main_species.sources[0].source_url,
          growth_rate:respo.data.main_species.specifications.growth_rate
        })
    }).catch(e=>{

    })
  }
  render() {
    return (
      <div className="plant_card">
      <Card className='card' onClick={() => this.handleDetailsClick(this.state)} >
        <CardImg className="card-img" top width="100%" src= {this.state.image} alt="Card image cap" />
        <CardBody className='card-contant'>
          <CardTitle><span className="bold" >Plant Name: </span>{this.props.name}/{this.props.sci_name}</CardTitle>
          <CardSubtitle><span className="bold" >Plant Type: </span> {this.state.type} </CardSubtitle>
          <CardText> <span className="bold" >Growth Seassons: </span>  {this.state.seassons}  </CardText>
          <Button className='card-butt float-right'  >Add to my plants</Button>
        </CardBody>
      </Card>


      <Modal isOpen={this.state.modal} toggle={this.handleDetailsClick} className='f'>
          <ModalHeader toggle={this.handleDetailsClick}>
          <span className="title" >{this.state.name} </span> 

          </ModalHeader>
          <ModalBody>
          <CardImg className="card-img" top width="50%" src= {this.state.image} alt="Card image cap" /><br/>

            <span className="bold" >Scintfic Name: </span> {this.state.sci_name} <br/>
            <span className="bold" >Seassons: </span> {this.state.seassons} <br/>

            <span className="title" >Caring Instruction: </span> 
            <ul>
           <li> You have to keep it in enviroment where the temprecture betwen: {this.state.temp} &deg;C.  </li>
           <li> You can noticing the growth of this plant is  {this.state.growth_rate}. </li>
           <li> You have to keep it in  {this.state.shade} shade.</li>
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={ () => this.moreInfo(this.state.moreInfo)}>more info</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Plant;
