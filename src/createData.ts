import { useMemo } from 'react';
import faker from 'faker'

interface ICreateData {
    dataNum?: number;
    isHeightSame?: boolean;

}
export default function createData(opt: ICreateData) {
    const { dataNum, isHeightSame } = opt;
    const actualDataNum = dataNum ? dataNum : 10000;
    const data = new Array(actualDataNum).fill("").map((item, index) => {
        return isHeightSame ? ({
            id: `${Math.random()}`,
            title: `key: ${index}`
        }) : ({
            id: `${Math.random()}`,
            title: `key: ${index} ${faker.lorem.sentences()}`
        })
    })
    return data
}