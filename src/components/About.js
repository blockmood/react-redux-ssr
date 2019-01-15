import React from 'react'
import {connect} from 'react-redux'
class About extends React.Component{
    constructor(){
        super(...arguments)
        this.getList = this.getList.bind(this)
    }

    componentWillMount(){
        this.props.getList()
    }

    getList(){
        this.props.getList()
    }

    render(){
        return (
            <div className="a">
                about<br/>
                <button onClick={this.getList}>fetch</button>
                <ul>
                    {this.props.list && this.props.list.latest && this.props.list.latest.map( gist => (
                        <li key={ gist.id }>{gist.title}</li>
                    ) )}
                </ul>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log(state)
    return {
        list:state.store.gists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList:()=>{dispatch({type:'REQUEST'})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
