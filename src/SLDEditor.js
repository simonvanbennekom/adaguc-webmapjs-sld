import React, { Component } from 'react'
import { Button } from 'reactstrap';
import brace from 'brace';
import 'brace/mode/xml';
import 'brace/theme/xcode';
import AceEditor from 'react-ace';
import SLD from './config/sld/sld_template.xml';

export default class SLDEditor extends Component {
    

    constructor(props) {
        super(props);

        this.postSLDBtnClicked = this.postSLDBtnClicked.bind(this);
        this.loadSLDTemplateBtnClicked = this.loadSLDTemplateBtnClicked.bind(this);
    }

    postSLDBtnClicked () {
        alert('ok');
        // Post nu met axios naar je Python scriptje
    }

    loadSLDTemplateBtnClicked () {
        console.log(this.refs.aceEditor.editor.setValue(SLD));
    }

    onChange(newValue) {
        
        console.log('change',newValue);
    }

    render(){
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
            </div>
        );
    }
}
