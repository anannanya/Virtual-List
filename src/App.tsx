import React, { useCallback, useRef, useState } from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { Input, Switch, Button } from 'antd';
import createData from './createData'
import List from './List'
import { useMemo } from 'react';
import { ListController } from './List/List'

interface IDataItem {
  id: string,
  title: string
}


function App() {
  const [scrollToKey, setScrollToKey] = useState('')
  const [updateKey, setUpdateKey] = useState('')

  const [scrollToPx, setScrollToPx] = useState('')
  const [updatePx, setUpdatePx] = useState('')

  const [createListNum, setListNum] = useState('10000')
  const [updateListNum, setUpdateListNum] = useState('10000')

  const [isHeightSame, setSwitch] = useState(false)

  const listItemHeight = 50

  const listController = useRef<ListController<IDataItem | string>>(null)
  const getController = (props: ListController<IDataItem>) => {
    listController.current = props
  }

  const sureScrollToKey = useCallback(() => {
    setUpdateKey(scrollToKey)
    if (listController.current) {
      listController.current.scrollTo(data[scrollToKey])
    }
  }, [scrollToKey])
  const keyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      alert('请输入大于0的数字')
    } else {
      setScrollToKey(e.target.value)
    }
  }, [])

  const sureScrollToPx = useCallback(() => {
    setUpdatePx(scrollToPx)
    if (listController.current) {
      listController.current.scrollTo(scrollToPx)
    }
  }, [scrollToPx])
  const pxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      alert('请输入大于0的数字')
    } else {
      setScrollToPx(e.target.value)
    }
  }, [])



  const sureListNum = useCallback(() => {
    setUpdateListNum(createListNum)
  }, [createListNum])
  const listNumChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      alert('请输入大于0的数字')
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
    setSwitch(!isHeightSame)
  }, [isHeightSame])

  const listItemStyle = useMemo(() => {
    if (isHeightSame) {
      return {
        height: listItemHeight,
        borderBottom: '1px solid grey'

      }
    } else {
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
          高度是否为一致：<Switch checked={isHeightSame} onChange={listHeightChange} />
        </div>
      </form>
      <div className='list-style'>
        <List
          data={data}
          renderItem={randerItem}
          containerHeight={500}
          itemHeight={listItemHeight}
          shouldCollectHeight={!isHeightSame}
          getController={getController}
        />
      </div>
    </div>
  );
}

export default App;
