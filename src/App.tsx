import React, { useState } from 'react';
import './App.css';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const style1 = {
  width: '400px',
  height: '20px',
  padding: '8px 8px 0 0',
  margin: '10px 0 0 16px',
}

const style3 = {
  height: '20px',
  marginRight: '16px',
}

const style4 = {
  paddingTop: '8px',
  paddingLeft: '14px',
  fontWeight: 'bold',
}

const style5 = {
  borderRadius: '4px',
  backgroundColor: '#c0bebc',
  color: '#fff',
}

const style6 = {
  borderRadius: '4px',
  backgroundColor: '#3c9951',
  color: '#fff',
}

function App() {
  // input form 内のtodoテキストのstateとそれを管理する関数を定義したuseStateフック。初期値は空白。
  const [todoText, setTodoText] = useState('');
  // 未完了todoリスト配列のstateとそれを管理する関数を定義したuseStateフック。初期値は空白の配列。
  const [inCompleteTodos, setInCompleteTodos] = useState([]);
  // 完了済todoリスト配列のstateとそれを管理する関数を定義したuseStateフック。初期値は空白の配列。
  const [completeTodos, setCompleteTodos] = useState([]);
  // input form 内の変更時に実行するイベントハンドラ。eventを引数にとり、todoTextを入力値に更新する。
  const onChangeTodoText = (event: any) => setTodoText(event.target.value);
  // ADD ボタン押下時に実行するonClickメソッド。入力欄が空白ならば実行しない。既存の未完了todoリスト配列に新たなtodoテキストを追加した配列をnewTodosと定義。
  // 未完了todoリストをnewTodosに更新し、todoテキストを空白の初期値に更新する。
  const onClickAdd = () => {
    if (todoText === '') return;
    const newTodos: any = [...inCompleteTodos, todoText];
    setInCompleteTodos(newTodos);
    setTodoText('');
  }
  // DELETEボタン押下時に実行するonClickメソッド。引数は配列の順番を示すindex。
  const onClickDelete = (index: any) => {
    // 新しいTodo配列に既存の未完了のTodo配列を代入する
    const newTodos = [...inCompleteTodos];
    // splice構文でindex番目の配列を1つ削除する
    newTodos.splice(index, 1);
    // 1配列を削除したnewTodosに未完了todoリストを更新する
    setInCompleteTodos(newTodos);
  }
  // COMPLETEDボタン押下時に実行するonClickメソッド。引数は配列の順番を示すindex。
  const onClickComplete = (index: any) => {
    // 新しい未完了todo配列に既存の未完了todo配列を代入する
    const newIncompleteTodos = [...inCompleteTodos];
    // 新しい未完了todo配列として、index番目の配列を1つ削除する
    newIncompleteTodos.splice(index, 1);
    // 新しい完了todo配列として、既存の完了todo配列に、index番目の未完了todoを追加する
    const newCompleteTodos = [...completeTodos, inCompleteTodos[index]];
    // 未完了todo配列を更新する
    setInCompleteTodos(newIncompleteTodos);
    // 完了todo配列を更新する
    setCompleteTodos(newCompleteTodos);
  };
  // REVERSEボタン押下時に実行するonClickメソッド。引数は配列の順番を示すindex。
  const onClickReverse = (index: any) => {
    // 新しい完了todo配列に既存の完了todo配列を代入する
    const newCompleteTodos = [...completeTodos];
    // 新しい完了todo配列として、index番目の配列を配列を1つ削除する
    newCompleteTodos.splice(index, 1);
    // 新しい未完了todo配列として、既存の未完了todo配列に、index番目の完了todoを追加する
    const newIncompleteTodos = [...inCompleteTodos, completeTodos[index]];
    // 完了todo配列を更新する
    setCompleteTodos(newCompleteTodos);
    // 未完了todo配列を更新する
    setInCompleteTodos(newIncompleteTodos);
  }

  return (
    <>
      <div className="App">
        <div>
          <TextField
            type="text"
            value={todoText}
            onChange={onChangeTodoText}
            style={style1}
            id="standard-textarea"
            label="Please describe 'todo' here."
            placeholder="And press 'ADD' button."
            multiline
            variant="standard"
          />
          <Button onClick={onClickAdd} style={{ marginTop: '24px' }} variant="contained">ADD</Button>
        </div>
      </div>
      <div style={style5}>
        <p style={style4}>TASKS TO DO</p>
        <List>
          {inCompleteTodos.map((todo, index) => {
            return (
              <ListItem key={todo}>
                <ListItemText primary={todo} />
                <Button onClick={() => onClickComplete(index)} style={{ marginRight: '8px' }} variant="contained">Completed</Button>
                <Button onClick={() => onClickDelete(index)} variant="contained">Delete</Button>
              </ListItem>
            )
          })}
        </List>
      </div>
      <div style={style6}>
        <p style={style4}>COMPLETED TASKS</p>
        <List>
          {completeTodos.map((todo, index) => {
            return (
              <ListItem key={todo}>
                <ListItemText primary={todo} />
                <Button onClick={() => onClickReverse(index)} variant="contained">Reverse</Button>
              </ListItem>
            )
          })}
        </List>
      </div>
    </>
  );
}

export default App;
