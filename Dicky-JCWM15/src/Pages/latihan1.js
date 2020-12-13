import React, { Component} from 'react';
import { Button, Input } from "reactstrap";
import { api_url } from '../helpers/api_url';
import {deleteTableAction} from '../action'
import Axios from "axios";
import { connect } from "react-redux";



class latihan1 extends Component{
    state ={
        data:[],
        dataInput :{
            nama : "",
            usia :"",
            pekerjaan :""
        },
        bool: false,        
    };
    componentDidMount() {
        this.fetchData();
     
      }
    
      componentDidUpdate() {
        if (this.state.bool) {
          this.fetchData();
          this.setState({
            bool: false,
          });
        }
      }
    
      fetchData = () => {
        Axios.get(`${api_url}/user`)
          .then((res) => {
            this.setState({
              data: res.data,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      };

      renderTableBody = () => {
      return this.state.data.map((val) => {
      return (
        <tr>
          <td>{val.nama}</td>
          <td>{val.usia}</td>
          <td>{val.pekerjaan}</td>
          <td>
          <Button color="danger" onClick={this.deletetabel}>
              Delete
            </Button>
            </td>
        </tr>
      );
    });
  };


  deletetabel =(id) =>{
    const {deleteTableAction} =this.state.data;
    deleteTableAction(id);
  }

    onChangeInput = (e) => {
        this.setState({
          dataInput: {
            ...this.state.dataInput,
            [e.target.id]: e.target.value,
          },
        });
      };

      submitData = () => {
        const { nama, usia, pekerjaan } = this.state.dataInput;
        Axios.post(`${api_url}/user`, {
          nama,
          usia,
          pekerjaan,
        })
          .then((res) => {
            this.setState({
              bool: true,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      };


    render(){
        return(
            <div>
                <h1>SOAL 1</h1>
                <div className='row'>
                    <div className='col-md-4 mb-4'>
                        <select className='form-control'>
                            <option>Filter By Pekerjaan</option>
                        </select>
                    </div>
                </div>
                <table className='table mb-4'>
                    <thead>
                        <tr>
                            <td>Nama</td>
                            <td>Usia</td>
                            <td>Pekerjaan</td>
                            <td colspan="2">Act</td>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderTableBody()}
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-md-3'> 
                    <Input placeholder='Nama' id="nama" onChange={this.onChangeInput} value={this.state.dataInput.nama}/> 
                    </div>
                    <div className='col-md-3'> 
                    <Input  placeholder='Usia' id="usia" onChange={this.onChangeInput} value={this.state.dataInput.usia}/> 
                    </div>
                    <div className='col-md-3'> 
                    <Input placeholder='Pekerjaan' id="pekerjaan" onChange={this.onChangeInput} value={this.state.dataInput.pekerjaan}/> 
                    </div>
                    <div className='col-md-3'> <Button color="success" onClick={this.submitData}>add data</Button></div>
                </div>
            </div>
        )
    }
}


const mapStatetoProps = ({ id}) => {
  return {
    id
  };
};
export default connect(mapStatetoProps, {deleteTableAction})(latihan1)