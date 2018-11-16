import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoList from './components/TodoList';
import todos from './data/todos.js' // does not from server
// const TodoList = require('./components/TodoList/index.js')

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'yalhu',
            todos,
            count:0,  // test setState
            str:'test' // test contorlled component
        }
        this.addRefs = React.createRef();

        this.handleChange=this.handleChange.bind(this)// add input for test contorlled component

        this.change=this.change.bind(this)
        this.toggle=this.toggle.bind(this)
        this.delete=this.delete.bind(this)
        this.add=this.add.bind(this)
    }
    handleChange(e){
        console.log('handle change, ',e.target.value)
        this.setState({str:e.target.value})
    }

    change(index,text){
        // console.log(index,text)
        // ### 1
        const todos=this.state.todos;
        todos[index].text=text
        this.setState({todos})// 其他事件触发render了 
        // this.setState({})  // 其他事件触发render了 
       
    }
    toggle(index,complete){
        // console.log('toggle',index,complete)
        // ## 0 Warn: Do not mutate state directly. Use setState()  react/no-direct-mutation-state
        // this.state.todos[index].complete=complete 
        // this.setState({})
        // ## 1 not Warn 
        const todos=this.state.todos
        todos[index].complete=complete
        this.setState({})
        // ## 2 和上面没有差别
        /* this.setState(state=>{ 
            state.todos[index].complete=complete
            return {todos:state.todos}
        }) */
    }
    delete(index){
        // console.log('delete',index)
        this.state.todos.splice(index,1) 
        this.setState({todos:this.state.todos}); 
    }
    add(e){
        if(e.which===13){
            if(e.target.value==='') return
            const todos=this.state.todos
            const id=todos.length>0?(todos[todos.length-1].id + 1):100
            
            /* this.state.todos.push({
                id,text:e.target.value,description:'',date:''
            })
            this.setState({}) */

            // ## 1 Immutable data
            // const todosIm=this.state.todos.concat({id,text:e.target.value,description:'',date:''})
            // ## 2 Immutable data
            this.setState({todos:[...this.state.todos,{id,text:e.target.value,description:'',date:''}]})


            e.target.value=''
        }
    }
    increase(index){
        // ## 1.1 常规 stateChange
        /* let count=this.state.count
        count+=index
        count+=index
        this.setState({count})  */
        // ## 1.2 非常规 stateChange,添加两次:因为之前用了+=,mutate了 // Do not mutate state directly. Use setState()
        // this.setState({count:this.state.count+=index})  // Do not mutate state directly. Use setState()
        // this.setState({count:this.state.count+=10})  // Do not mutate state directly. Use setState()
        
        // ## 2.1 注意: 将多个 setState() 调用合并为一次更新。以后一个为准
        // this.setState({count:this.state.count+index})
        // this.setState({count:this.state.count+10})

        // ## 2,2 updater 也一样,合并为一次更新 针对##1.3纠正: updater  
        // this.setState((state,props)=>({count:this.state.count+index}))
        // this.setState((state,props)=>({count:this.state.count+10}))

        // ## 3 正确的updater
        this.setState((preState,props)=>{
            return {count:preState.count+index}
        })
        this.setState((preState,props)=>{
            return {count:preState.count+index}
        })
        outerCall(index)
    }
    render() {
        console.log('APP:comp:render')
        // console.log('APP:todos',this.state.todos)
        const unfinishedNum=this.state.todos.filter((v)=>v.complete===true).length
        return (
            <div className="main">
                <h2 className="App-title">Todo List</h2>
                <p>您好{this.state.name}, 完成情况 {unfinishedNum} / {this.state.todos.length}</p>
                <input autoFocus={true} ref={this.addRefs} type="text"
                    // value={this.state.str}
                    defaultValue={this.state.str}
                    onKeyDown={this.add} 
                    // onChange={this.handleChange}
                />
                <TodoList data={this.state.todos}
                    onChange={this.change}  
                    onToggle={this.toggle}
                    onDelete={this.delete}
                />    
                <hr/>
                <h2>count:测试setState</h2>
                <p>计数: {this.state.count}</p>
                <button onClick={
                    (e)=>{this.increase(1)}
                }>+1 and +1</button>
                {/* <hr/> */}
                {/* <h2>受控组件和非受控组件</h2> */}
                {/* <input type="text" value={this.state.count}  /> */}
                {/* Warning: Failed prop type: 
                    You provided a `value` prop to a form field without an `onChange` handler. 
                    This will render a read-only field. If the field should be mutable use `defaultValue`. 
                    Otherwise, set either `onChange` or `readOnly`. 
                */}
            </div>
        );
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('APP:comp:did update')
        // console.log(this.state.todos)
    }
    componentDidMount(){
        // this.addRefs.current.focus() // autoFocus={true}也可以
        console.log('APP:comp:did mount')
        // console.log('APP:todos,length',this.state.todos,this.state.todos.length)
        fetch('todos.json').then((res)=>{
            return res.json()
        })
        .then((todos)=>{
            console.log('fetch data ',todos)
            this.setState({todos})
        }).catch((e)=>console.log('error:',e))
    }
}
App.defaultProps={
    name:'anonymous',
    todos:[],
    add:()=>{}
}
App.propTypes={
    name:PropTypes.string.isRequired,
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    add:PropTypes.func.isRequired
}

export default App;
function outerCall(num){
    console.log(num)
}