import React from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { Input } from 'antd';
import List from './List'

function App() {
  return (
    <div className="App">
      <h1>Stand Virtual List</h1>
      <div className='select'>
        <div>
          滚动到指定节点：<Input placeholder='key' />
        </div>
        <div>
          滚动到指定像素：<Input placeholder='px' />
        </div>
        <div>
          生成的列表条数：<Input placeholder='条' />
        </div>
      </div>
      <div className='list-style'>
        <List />
      </div>
    </div>
  );
}

export default App;
