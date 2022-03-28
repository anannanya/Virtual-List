import React, { useCallback, useRef, useState } from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { Input, Switch, Button } from 'antd';
import createData from './createData'
import List from './List'
import { useMemo } from 'react';


function App() {
  const [scrollToKey, setScrollToKey] = useState('')
  const [scrollToPx, setScrollToPx] = useState('')
  const [createListNum, setListNum] = useState(null)
  const [isHeightSame, setSwitch] = useState(true)

  const data = useMemo(() => {
    createData({
      dataNum: createListNum,
      isHeightSame: isHeightSame
    })
  }, [createListNum, isHeightSame])

  const listHeightChange = useCallback(() => {
    setSwitch(!isHeightSame)
  }, [])

  const sureScrollToKey = useCallback(() => {

  }, [scrollToKey])

  const sureScrollToPx = useCallback(() => {

  }, [scrollToPx])

  const sureListNum = useCallback(() => {

  }, [createListNum])

  const listNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value)) || e.target.value.trim() === '') {
      alert('请输入数字')
    } else {
      setListNum(e.target.value)
    }
  }

  return (
    <div className="App">
      <h1>Stand Virtual List</h1>
      <div className='select'>
        <div className='select-child-div'>
          滚动到指定节点：<Input placeholder='key' value={scrollToKey} onPressEnter={sureScrollToKey} />
          <Button onClick={sureScrollToKey}>确认</Button>
        </div>
        <div className='select-child-div'>
          滚动到指定像素：<Input placeholder='px' value={scrollToPx} onPressEnter={sureScrollToPx} />
          <Button onClick={sureScrollToPx}>确认</Button>
        </div>
        <div className='select-child-div'>
          生成的列表条数：<Input placeholder='条' value={createListNum} onChange={listNumChange} onPressEnter={sureListNum} />
          <Button onClick={sureListNum}>确认</Button>
        </div>
        <div className='select-child-div'>
          高度是否为一致：<Switch defaultChecked onChange={listHeightChange} />
        </div>
      </div>
      <div className='list-style'>
        <List
          data={data}
        />
      </div>
    </div>
  );
}

export default App;
