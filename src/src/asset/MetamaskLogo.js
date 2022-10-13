import React from "react";
import ModeViewer from '@metamask/logo';

class MetamaskLogo extends React.Component{
    componentDidMount(){
        this.viewer = ModeViewer({
            pxNotRatio: true,
            width: 150,
            height: 150,
            followMouse: true,
        })
        this.el.appendChild(this.viewer.container)
    }

    componentWillUnnount(){
        this.viewer.stopAnimation();
    }
    render(){
        return (
            <div
            style={{top:'50%',left:'50%'}}
            ref={el => (this.el = el)}
            />
        )
    }
}
export default MetamaskLogo