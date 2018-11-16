import React,{Component} from 'react'
import PropTypes from 'prop-types';
import './index.css'
// import './todo.less' // not config

class Todo extends Component{
    constructor(props){
        super(props)
        this.state={
            isEdit:false
        }
        this.inputRef = React.createRef();
        this.spanRef = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
        
        this.handleBlur=this.handleBlur.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleToggle=this.handleToggle.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
        this.handleKeyDown=this.handleKeyDown.bind(this)
    }
    focusTextInput() {
        this.inputRef.current.focus();
    }
    handleBlur(e){
        this.props.onHandleChange(this.props.index,e.target.value)
        this.setState({isEdit:false})
    }
    handleClick(e){
        this.spanRef.current.focus()
        // this.spanRef.current.blur()
        // console.log('handlclick refs',this.spanRef,this.inputRef)
        this.setState({isEdit:true})
        // this.focusTextInput()
        // console.log(this.spanRef,this.inputRef)
    }
    handleToggle(e){
        this.props.onHandleToggle(this.props.index,e.target.checked)
    }
    handleDelete(e){
        this.props.onHandleDelete(this.props.index)
    }
    handleChange(e){
        // console.log('change',e.target.value)
        this.props.onHandleChange(this.props.index,e.target.value)
    }
    handleKeyDown(e){
        // console.log(e.key,e.which) // Enter ,13
        if(e.which===13){
            this.setState({isEdit:false})
            this.props.onHandleChange(this.props.index,e.target.value)
        }
    }
    render(){
        // console.log('Todo:comp:render')
        const TodoItem=<span style={{display:'inline-block',minWidth:200,height:20}} 
                    className={this.props.data.complete?'lineThro':''} 
                    ref={this.spanRef}
                    onClick={this.handleClick}
                >
                {this.props.data.text} 
            </span>
        const TodoInput=<input style={{width:150}} 
                defaultValue={this.props.data.text} 
                // value={this.props.data.text}
                autoFocus={true}
                onBlur={this.handleBlur} 
                // onChange={this.handleChange} 
                onKeyDown={this.handleKeyDown}
                ref={this.inputRef}
            />
        return(
            <li >
                <input onClick={this.handleToggle} type="checkbox" defaultChecked={this.props.data.complete?true:false}/>    
                {this.state.isEdit?TodoInput:TodoItem}
                <button onClick={this.handleDelete}> X </button>
            </li>
        )
    }
    shouldComponentUpdate(nextProps, nextState){
        // console.log('Todo:comp:should update')
        // this.inputRef.current&&this.inputRef.current.focus()
        return true;
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        // console.log('Todo:comp:did update')
        // console.log(this.props)
    }
    componentDidMount(){
        // console.log('Todo:comp:did mount')
        // this.inputRef.current.focus()
    }
    componentWillUnmount(){
        // console.log('Todo:comp:will unmount')

    }
}
Todo.defaultProps={
    onHandleChange:()=>{}
}
Todo.propTypes={
    onHandleChange:PropTypes.func.isRequired
}
export default Todo 