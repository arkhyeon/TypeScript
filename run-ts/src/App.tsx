import React, {FormEvent, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from './rootReducer';
import { User, addUser } from './modules/createSlice';

function App() {
  /** let count = 0; // 숫자
  count += 1;
  count = '갑자기 분위기 문자열'; // 이러면 에러가 납니다!

  const message: string = 'hello world'; // 문자열

  const done: boolean = true; // 불리언 값

  const numbers: number[] = [1, 2, 3]; // 숫자 배열
  const messages: string[] = ['hello', 'world']; // 문자열 배열

  messages.push(1); // 숫자 넣으려고 하면.. 안된다!

  let mightBeUndefined: string | undefined = undefined; // string 일수도 있고 undefined 일수도 있음
  let nullableNumber: number | null = null; // number 일수도 있고 null 일수도 있음

  let color: 'red' | 'orange' | 'yellow' = 'red'; // red, orange, yellow 중 하나임
  color = 'yellow';
  color = 'green'; // 에러 발생! */

  function sum(x: number, y: number) {
    return x + y;
  }

  function returnNothing(): void {
    console.log('I am just saying hello world');
  }

  function sumArray(numbers: number[]): number {
    returnNothing();
    return numbers.reduce((acc, current) => acc + current, 0);
  }

  const total = sumArray([1, 2, 3, 4, 5]);

  const users = useSelector<ReducerType, User[]>(state=> state.users);
  const dispatch = useDispatch();

  const [ name, setName ] = useState('');

  const handleChangeName = (e: any) => {
    setName(e.target.value);
  }

  const handleAddUser = (e:FormEvent) => {
    e.preventDefault();
    dispatch(addUser({ name } as User));
    setName('');
  }

  return (
    <div className="App">
      <header className="App-header">
        {sum(1, 2)}
        {total}
      </header>
      <div>

        <form onSubmit={handleAddUser}>
          <input type='text' value={name} onChange={handleChangeName} />
          <button type='submit'>Add User</button>
        </form>

        {users.map(user=> (
            <div key={user.id}>{user.name}</div>
        ))}

      </div>
    </div>
  );
}

export default App;
