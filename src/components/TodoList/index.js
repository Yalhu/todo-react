import React,{Component} from 'react'
import Todo from '../Todo'

class TodoList extends Component{
    constructor(props){
        super(props)
        this.handleChange=this.handleChange.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
        this.handleToggle=this.handleToggle.bind(this)
    }
    handleChange(index,text){
        // console.log('todolist change ...')
        this.props.onChange(index,text);
    }
    handleToggle(index,complete){
        this.props.onToggle(index,complete);
    }
    handleDelete(index){
        this.props.onDelete(index);
    }
    render(){
        var coms=this.props.data.map((v,k)=>{
            return (
                <Todo data={v} index={k} key={v.id}
                    onHandleChange={this.handleChange} 
                    onHandleToggle={this.handleToggle} 
                    onHandleDelete={this.handleDelete} 
                />
            )
        });
        return(
            <ul>{coms}</ul>
        )
    }
}

export default TodoList 
// module.exports=TodoList