import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App'

function msgOuter(data){
    console.log(data)
}
function outerCall(num){
    g.increase(num);
}
var g=ReactDOM.render(
    <App />,
    document.getElementById('root'),
    (...args)=>{console.log('args',args)}
);
outerCall(22)

console.log('app',App)
console.log('new app',new App())
console.log('React dom render',g) // App
// console.log('React dom render:g.render',g.render) // App
/*
{
    
    addRefs:{current,input},
    context:{},

    props:{name:"anonymous",todos:Array(0),add:f}
    state:{name:"yalhu",todos:Array(r),}
    refs:{},
    
    change:f,
    add: f,
    delete:f,
    toggle:f,

    updater:{
        enqueueForceUpdate:ƒ (inst, callback),
        enqueueReplaceState:ƒ (inst, payload, callback),
        enqueueSetState:ƒ (inst, payload, callback),
        isMounted:ƒ isMounted(component)
    },

    _reactInternalFiber:(FiberNode),
    _reactInternalInstance:{},
    // 灰色
    isMounted:undefined,
    replaceState:uundefined,
    __proto__:(Component)

}
//__proto__:(Component)
{
    add,change,delete,toggle,
    constructor,render,componentDidMount,componentDidUpdate,
    replaceState,
    isMounted,__proto__
}
*/
registerServiceWorker();
