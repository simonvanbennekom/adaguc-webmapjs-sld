import React, { Component } from 'react'
import { Button, InputGroup, InputGroupAddon, Input, Alert } from 'reactstrap';
import brace from 'brace';
import 'brace/mode/xml';
import 'brace/theme/xcode';
import AceEditor from 'react-ace';
import SLD from './config/sld/sld_template.xml';
import axios from 'axios'

export default class SLDEditor extends Component {         

    constructor(props) {
        super(props);

        this.state = {
            showAlert: false,
            alertColor: "",
            alertMsg: "",
            SLD:"",
            sldURL:"",
            fileName: "",
        };

        this.setAlert = this.setAlert.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleFileNameChange = this.handleFileNameChange.bind(this);
        this.onChange = this.onChange.bind(this);
        
        this.postSLDBtnClicked = this.postSLDBtnClicked.bind(this);
        this.loadSLDTemplateBtnClicked = this.loadSLDTemplateBtnClicked.bind(this);
    }

    postSLDBtnClicked(){
        this.setState({sldURL: null });
        
        var api = 'http://0.0.0.0:5000/processSLD'
        api = this.state.fileName ? api += '/' + this.state.fileName : api;
        
        axios.post(api, this.state.SLD, {
            headers: { 'Content-Type': 'text/plain' }
        })
        .then((response) => {
            var responseData = response.data;

            if(responseData.status === 'success'){
                try{
                    this.setAlert('success', responseData.message);
                    this.setState({sldURL:responseData.data.url});
                    radarlayer.setSLDURL(responseData.data.url);
                    radarlayer.draw();
                  }catch(e){
                      console.error(e);
                  }
            } else if(responseData.status === 'error'){
                this.setAlert('danger', response.data.message);                 
            }   
        })
        .catch((error) => {
            console.error(error);
            this.setAlert('danger', 'Unknown Error with status code: '. error.response.status);
        });
    }

    setAlert(color, msg){
        this.setState((state) => ({
            alertColor : color,
            alertMsg: msg,
            showAlert: true
        }));
    }

    handleDismiss() {
        this.setState({showAlert: false });
    }

    handleFileNameChange(event){
        this.setState({fileName: event.target.value});
    }

    loadSLDTemplateBtnClicked () {
        this.setState({SLD:SLD});
    }

    onChange(newValue) {        
        this.setState({SLD:newValue});
    }

    render(){
        const { alertColor, alertMsg, SLD, fileName } = this.state;
        return (
        <div>
            <InputGroup className="w-100 mb-2">
                <Input placeholder="Enter file name" value={fileName} onChange={this.handleFileNameChange} />
                <InputGroupAddon addonType="prepend">
                    <Button color="success" className="w-100 font-weight-bold rounded-0" onClick={this.postSLDBtnClicked}>Post SLD</Button>
                </InputGroupAddon>
                <InputGroupAddon addonType="append">
                    <Button color="warning" className="w-100 font-weight-bold rounded-0" onClick={this.loadSLDTemplateBtnClicked}>Get SLD template</Button>
                </InputGroupAddon>
            </InputGroup>
            { this.state.showAlert && <Alert color={alertColor} toggle={this.handleDismiss}>{alertMsg} { this.state.sldURL && <a href={this.state.sldURL} target="_blank" className="alert-link">{this.state.sldURL}</a> }</Alert> }
            <AceEditor 
            mode="xml"
            theme="xcode"
            width="auto"
            value={SLD}
            onChange={this.onChange}
            name="sldEditor"
            autoScrollEditorIntoView="true"
            editorProps={{$blockScrolling: Infinity}}
            />
        </div>
        );
    }
}
