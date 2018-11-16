import React, { Component } from 'react';
import TodoList from './components/TodoList';
import todos from './data/todos.js'

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            todos
        }
        this.change=this.change.bind(this)
        this.toggle=this.toggle.bind(this)
        this.delete=this.delete.bind(this)
    }
    /* 
      change,toggle,delete的区别
      1. change,toggle VS delete: this.state.xxx=XXX   :Do not mutate state directly
            // 不可变数据的力量
            this.setState(state => ({
                words: state.words.concat(['marklar'])  //concat ，$PS:splice/push/通
                words: [...state.words, 'marklar'],  // 展开语法
                // ## 
                return Object.assign({}, colormap, {right: 'blue'});
                return {...colormap, right: 'blue'};
            }));
      2. change VS toggle，delete: change 没有setState，会render；toggle 和delete不会
            可能是 合成事件onChange/onBlur 的时候触发了生命周期 shouldUpdate/disUpdate;
            如果没有触发的话，正确做法是需要 setState/forceUpdate 触发生命周期的
      3. delete: this.setState({todos:this.state.todos.splice(index,1)}) 只render一次
            this.state.todos.splice(index,1) ,触发渲染一次，此时todos的长度为3，触发后为2 
            然后通过赋值：todos: xx, splice 返回截取的数组，再次更新todos的值：截取的值
            但是同一周期值触发一次，即先前的一次，所以可以看到显示删除后的两个，

            第二次删除的时候，state是同一个，即长度为1的数组，componentShouldUpdate/didUpdate触发了啊
            为什么还是先前的两个。

            第二次删除完todos的长度就为为0了，一直都是，view中也还是删除一个后剩余的2个

            同
            this.setState((state)=>{
                const data=state.todos.splice(index,1)
            })

    */
    change(index,text){
        // console.log(index,text)
        // ## 0 没有setState ，会render; 和##1 区别:也没有提醒Do not mutate state directly 

        const todos=this.state.todos;
        todos[index].text=text
        // this.setState({})
        // ## 1 没有setState，会render； Do not mutate state directly. Use setState() 
        // this.state.todos[index].text=text 

        // ## 2 调用setState-updater：错误的使用方式，并没有返回一个对象--新的state
        /* this.setState(state=>{
            state.todos[index].text=text 
            // 取巧了：因为调用了生命周期,可能是 合成事件onChange/onBlur
        }) */

    }
    toggle(index,complete){
        console.log('toggle',index,complete)
        // ## 0 没有setState ，不会render // 和##1 区别:也没有提醒Do not mutate state directly
        /* const todos=this.state.todos;
        todos[index].complete=complete;
        // this.setState({todos})  // setState-stateChange ：浅合并到新的 state，同一周期中执行一次
        this.setState({}) */
        // ## 1 没有setState，不会render；Do not mutate state directly. Use setState() 
        // this.state.todos[index].complete=complete  // Do not mutate state directly. Use setState() 
        // this.setState({})  // // 必须再执行setState 才会 render

        // ## 2 调用setState-updater，不会render：错误的使用方式
        /* this.setState(state=>{  // 不会更新
            state.todos[index].complete=complete
        }) */
        // ## 3 调用setState-updater
        this.setState(state=>{  // 不会更新  // state 是对先前 state 的引用。
            state.todos[index].complete=complete
            return {todos:state.todos}
        })

        console.log(this.state.todos)
    }
    delete(index){
        console.log('delete',index)
        // delete this.state.todos[index]  // lenght 不变，出现了空值， 但不会遍历
        // ## 0  没有setState，不会render；也没有提醒Do not mutate state directly
        // const todos=this.state.todos
        // todos.splice(index,1)
        // this.setState({}) // this.setState({todos}) // setState-stateChange ：浅合并到新的 state，同一周期中执行一次
        
        // ## 1 没有setState，不会render；也没有提醒Do not mutate state directly
        // this.state.todos.splice(index,1)  // 
        // this.setState({todos}); // 必须再执行setState 才会 render
        // console.log(this.state.todos)
       
        // # 2 错误使用方式
        // ## 2.1 直接调用setState-updater，不会render：错误的使用方式：没有return
        /* this.setState(state=>{   // 不会 render
            state.todos.splice(index,1)
        }) */
        // ## 2.2 调用setState-statechange,只会render 一次：错误的使用：
        /* this.setState({
            todos:this.state.todos.splice(index,1)
        }) */
        // ## 2.3 调用setState,只会render 一次 : 和##3 其实是一样的：把todos 换成删除的对象了
        this.setState((state)=>{
            console.log('delete',state)  // state-当前的引用，删除一次后，todos长度变为1 了
            // return {todos:state.todos.splice(index,1)}
            const data=state.todos.splice(index,1)
            console.log(data)
            // return {todos:data}
            return {}
        })
        // ## 3 正确方式
        /* this.setState((state)=>{
            state.todos.splice(index,1)
            const data=state.todos
            return {todos:data}
        }) */
    }
    render() {
        console.log('APP:comp:render')
        console.log('APP:todos',this.state.todos)
        return (
            <div className="main">
                <h1 className="App-title">Todo List</h1>
                <TodoList data={todos}
                    onChange={this.change}  
                    onToggle={this.toggle}
                    onDelete={this.delete}
                />    
            </div>
        );
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('APP:comp:did update')
        console.log(this.state.todos)
    }
    componentDidMount(){
        console.log('APP:comp:did mount')
        console.log('APP:todos,length',this.state.todos,this.state.todos.length)
    }
}

export default App;
