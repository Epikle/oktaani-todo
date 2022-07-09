import { Fragment, useContext, useState } from 'react';
import { nanoid } from 'nanoid';

import TodoContext from '../../store/todo-context';
import Todo from './Todo';
import Modal from '../UI/Modal';

import './Collection.css';

const Collection = ({ collectionData, onChange, selected }) => {
  const todoCtx = useContext(TodoContext);
  const [isSharing, setIsSharing] = useState(false);
  const [shared, setShared] = useState(false);
  const [shareCode, setShareCode] = useState('');

  const deleteBtnHandler = (id) => {
    todoCtx.deleteCollection(id);
    todoCtx.setSelected(); //reset default selection
  };

  const clearBtnHandler = (id) => {
    todoCtx.clearDoneTodos(id);
  };

  const updateBtnHandler = () => {
    todoCtx.setSelected(
      todoCtx.selectedTodoList.id,
      todoCtx.selectedTodoList.title,
      todoCtx.selectedTodoList.color,
      true
    );
  };

  const shareBtnHandler = () => {
    setIsSharing(false);
    setShared(true);
    const shareId = nanoid(6);
    setShareCode(shareId);
    console.log('Share collection...', shareCode);
    const shareData = {...collectionData, shareId: shareId}
    console.log(shareData);
  };

  const copyBtnHandler = () => {
    const url = process.env.REACT_APP_PAGE_URL + '/share/' + shareCode;
    console.log(url);
    navigator.clipboard.writeText(url);
  };

  const openIsSharing = () => {
    setIsSharing(true);
  };

  const isDone = collectionData.todos.filter((todo) => todo.done);
  const isSelected = todoCtx.selectedTodoList.id === collectionData.id;

  const sharingData = (
    <Fragment>
      <h3>Share this collection?</h3>
      <p>Do you want to share your collection to someone?</p>
      <p className="danger">
        Be carefull not to share something you shouldn&apos;t!
      </p>
      <div className="modal-btns">
        <button onClick={shareBtnHandler}>Share</button>{' '}
        <button onClick={() => setIsSharing(false)}>No</button>
      </div>
    </Fragment>
  );

  const sharedData = (
    <Fragment>
      <h3>You collection is now shared!</h3>
      {/* <div className="share-img">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" alt="QR Code" />
      </div> */}
      <div className="share-code">
        http://oktaani.com/todo/share/{shareCode}{' '}
        <button onClick={copyBtnHandler}>Copy link</button>
      </div>
      <div className="modal-btns">
        <button onClick={() => setShared(false)}>Close</button>
      </div>
    </Fragment>
  );

  return (
    <article>
      {isSharing && (
        <Modal onClick={() => setIsSharing(false)}>{sharingData}</Modal>
      )}
      {shared && <Modal onClick={() => setShared(false)}>{sharedData}</Modal>}
      <div className="controls">
        <button
          className={isSelected && isDone.length > 0 ? 'clear active' : 'clear'}
          onClick={clearBtnHandler.bind(null, collectionData.id)}
          disabled={!isSelected || isDone.length === 0}
        >
          <span className="material-symbols-outlined">clear_all</span>
        </button>

        <button
          className={isSelected ? 'share active' : 'share'}
          onClick={openIsSharing}
          disabled={!isSelected}
        >
          <span className="material-symbols-outlined">share</span>
        </button>

        <button
          className={isSelected ? 'edit active' : 'edit'}
          onClick={updateBtnHandler}
          disabled={!isSelected}
        >
          <span className="material-symbols-outlined">edit</span>
        </button>

        <button
          className={isSelected ? 'delete active' : 'delete'}
          onClick={deleteBtnHandler.bind(null, collectionData.id)}
          disabled={!isSelected}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
      <div
        className="todo-container"
        style={{ borderTop: `6px solid ${collectionData.color}` }}
      >
        <div className="todo-collection-title">
          <input
            type="radio"
            id={collectionData.id}
            className="sr-only"
            name="collection"
            onChange={onChange.bind(
              null,
              collectionData.id,
              collectionData.title,
              collectionData.color
            )}
            checked={selected === collectionData.id}
          />
          <label htmlFor={collectionData.id}>
            {collectionData.title || 'UNTITLED'}
          </label>
        </div>
        {collectionData.todos.length > 0 && (
          <div className="todo-collection-done">
            {isDone.length} / {collectionData.todos.length}
          </div>
        )}

        <ul>
          {collectionData.todos.map((todo) => (
            <Todo
              key={todo.id}
              todoData={todo}
              collectionId={collectionData.id}
            />
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Collection;
