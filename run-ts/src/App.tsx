import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, User } from './modules/createSlice';
import { RootState } from './modules/index';
import Greetings from './Greetings';
import Counter from './Counter';
import MyForm from './MyForm';
import ReducerSample from './ReducerSample';
import CounterContainer from './CounterContainer';
import TodoApp from './TodoApp';
import GithubProfileLoader from './components/GithubProfileLoader';

function App() {
  const users = useSelector<RootState, User[]>((state) => state.users);
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const handleChangeName = (e: any) => {
    setName(e.target.value);
  };

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addUser({ name } as User));
    setName('');
  };

  const onClick = (clickName: string) => {
    console.log(clickName);
  };

  const onSubmit = (form: { name: string; description: string }) => {
    console.log(form);
  };

  return (
    <div className="App">
      <GithubProfileLoader />
      <TodoApp />
      <CounterContainer />
      <ReducerSample />
      <MyForm onSubmit={onSubmit} />
      <Counter />
      <Greetings name="Jang DC" onClick={onClick} />
      <form onSubmit={handleAddUser}>
        <input type="text" value={name} onChange={handleChangeName} />
        <button type="submit">Add User</button>
      </form>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

export default App;
