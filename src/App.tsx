import React, { useCallback, useRef, useState } from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { Input, Switch, Button } from 'antd';
import createData from './createData'
import List from './List'
import { useMemo } from 'react';


function App() {
  const [scrollToKey, setScrollToKey] = useState('')
  const [updateKey, setUpdateKey] = useState('')

  const [scrollToPx, setScrollToPx] = useState('')
  const [updatePx, setUpdatePx] = useState('')

  const [createListNum, setListNum] = useState('10000')
  const [updateListNum, setUpdateListNum] = useState('10000')

  const [isHeightSame, setSwitch] = useState(true)
  const listItemHeight = 50

  const sureScrollToKey = useCallback(() => {
    console.log(scrollToKey)

    setUpdateKey(scrollToKey)
  }, [scrollToKey])
  const keyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value)) || e.target.value.trim() === '') {
      alert('请输入数字')
    } else {
      setScrollToKey(e.target.value)
    }
  }, [])

  const sureScrollToPx = useCallback(() => {
    console.log(scrollToPx)
    setUpdatePx(scrollToPx)
  }, [scrollToPx])
  const pxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value)) || e.target.value.trim() === '') {
      alert('请输入数字')
    } else {
      setScrollToPx(e.target.value)
    }
  }, [])

  const sureListNum = useCallback(() => {
    setUpdateListNum(createListNum)
  }, [createListNum])
  const listNumChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value)) || e.target.value.trim() === '') {
      alert('请输入数字')
    } else {
      setListNum(e.target.value)
    }
  }, [])

  const data = useMemo(() => {
    return createData({
      dataNum: createListNum,
      isHeightSame: isHeightSame
    })
  }, [updateListNum, isHeightSame])

  const listHeightChange = useCallback(() => {
    console.log(isHeightSame)
    setSwitch(!isHeightSame)
  }, [isHeightSame])

  const listItemStyle = useMemo(() => {
    if (isHeightSame) {
      console.log(1)
      return {
        height: listItemHeight,
        borderBottom: '1px solid grey'

      }
    } else {
      console.log(2)
      return {
        borderBottom: '1px solid grey'
      }
    }

  }, [listItemHeight, isHeightSame])
  const randerItem = useCallback((listItem) => {
    return (
      <div style={listItemStyle}>
        {`${listItem.title}`}
      </div>
    )
  }, [listItemStyle])

  return (
    <div className="App">
      <h1>Stand Virtual List</h1>
      <form className='select'>
        <div className='select-child-div'>
          滚动到指定节点：<Input placeholder='key' value={scrollToKey} onChange={keyChange} onPressEnter={sureScrollToKey} />
          <Button onClick={sureScrollToKey}>确认</Button>
        </div>
        <div className='select-child-div'>
          滚动到指定像素：<Input placeholder='px' value={scrollToPx} onChange={pxChange} onPressEnter={sureScrollToPx} />
          <Button onClick={sureScrollToPx}>确认</Button>
        </div>
        <div className='select-child-div'>
          生成的列表条数：<Input placeholder='条' value={createListNum} onChange={listNumChange} onPressEnter={sureListNum} />
          <Button onClick={sureListNum}>确认</Button>
        </div>
        <div className='select-child-div'>
          高度是否为一致：<Switch defaultChecked onChange={listHeightChange} />
        </div>
      </form>
      <div className='list-style'>
        <List
          data={data}
          renderItem={randerItem}
          containerHeight={500}
          itemHeight={listItemHeight}
          shouldCollectHeight={!isHeightSame}
        />
      </div>
    </div>
  );
}

export default App;
