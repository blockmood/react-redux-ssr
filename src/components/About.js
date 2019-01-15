import React from 'react'
import {connect} from 'react-redux'
class About extends React.Component{

    componentDidMount(){

    }

    render(){
        return (
            <div className="a">
                about
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        list:state
    }
}

export default connect(mapStateToProps, null)(About)