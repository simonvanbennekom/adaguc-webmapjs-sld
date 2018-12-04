import React, { Component } from 'react'
import { Button, Alert } from 'reactstrap';
import brace from 'brace';
import 'brace/mode/xml';
import 'brace/theme/xcode';
import AceEditor from 'react-ace';
import SLD from './config/sld/sld_template.xml';
import axios from 'axios'

export default class SLDEditor extends Component {
    

    constructor(props) {
        super(props);

        // this.state = {
        //     AlertError: ""
        // };

        this.postSLDBtnClicked = this.postSLDBtnClicked.bind(this);
        this.loadSLDTemplateBtnClicked = this.loadSLDTemplateBtnClicked.bind(this);
    }

    postSLDBtnClicked () {
        // Post nu met axios naar je Python scriptje

        axios.post('http://0.0.0.0:5000/processSLD', this.refs.aceEditor.editor.getValue(), {
            headers: { 'Content-Type': 'text/plain' }        
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
            // this.setState({ AlertError: " ERRROOOR "});

            // if(error.response.status === 400) {
            // } else {
            //     console.log('Unknown Error with status code', error.response.status)
            // }
          
        });
    }

    loadSLDTemplateBtnClicked () {
        console.log(this.refs.aceEditor.editor.setValue(SLD));
    }    

    onChange(newValue) {
        
        console.log('change',newValue);
    }

    render(){
        // const { AlertError } = this.state;

        return (<div>
            <AceEditor 
            ref="aceEditor"
            mode="xml"
            theme="xcode"
            width="auto"
            onChange={this.onChange}
            name="sldEditor"
            setOptions={{
                setAutoScrollEditorIntoView: true
            }}
            />
            <Button onClick={this.postSLDBtnClicked}>Post SLD</Button>
            <Button onClick={this.loadSLDTemplateBtnClicked}>Get SLD template</Button>
            <Alert color="danger">

            </Alert>
            </div>
        );
    }
}
