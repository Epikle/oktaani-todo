import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import TodoContext from '../../store/todo-context';

const Share = () => {
  const { id } = useParams();
  const todoCtx = useContext(TodoContext);
  const navigate = useNavigate();

  useEffect(() => {
    todoCtx.readTodos();
    const fetchShared = async () => {
      try {
        //Fetch shared collection from db
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/share/${id}`
        );
        const responseData = await response.json();

        if (responseData.sharedCollection === null) {
          console.log('No data...');
          navigate('/', { replace: true });
          return;
        }

        //Delete shared collection from db after collected data
        await fetch(`${process.env.REACT_APP_API_URL}/api/share/${id}`, {
          method: 'DELETE',
        });

        todoCtx.createTodo(responseData.sharedCollection, true);

        navigate('/', { replace: true });
      } catch (err) {
        console.error(err);
      }
    };
    fetchShared();
  }, []);

  return <h1>Loading shared data...</h1>;
};

export default Share;
