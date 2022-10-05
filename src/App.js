import { useSelector, useDispatch } from 'react-redux';
import { postsFetch } from './features/posts/postsSlice';

function App() {
    const posts = useSelector(state => state.posts.posts);
    const status = useSelector(state => state.posts.status);

    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch(postsFetch())}>{"Click me"}</button>
            <h2>{status}</h2>
            <ul>
                {
                    posts.map((post, idx) => 
                        <li key={idx}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default App;
