import React from 'react'
import {connect} from 'react-redux'
class List extends React.Component{
    componentWillMount(){
        this.props.getCategory()
    }

    render(){
        const {list} = this.props
        return (
            <div className="bbb">
                <h1>list</h1>
                <ul>
                    {
                        list && list ? list.data.map(item =>
                            <li key={item.id}>{item.name}</li>
                            ) : ''
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list:state.store.catList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategory:()=>{
            dispatch({type:'REQUEST_CAT'})
        }
    }
}

List.loadData = store => {
    return store.dispatch({type:'REQUEST_CAT'})
}

export default connect(mapStateToProps, mapDispatchToProps)(List)