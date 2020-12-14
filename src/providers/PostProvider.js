import React, {useState} from 'react';

const PostContext = React.createContext();

const PostProvider = (props) =>{
    const [author, setAuthor] = useState('');
    const [posts, setPosts] = useState([]);

    return(
        <PostContext.Provider
        value={{
            author : author,
            setAuthor : setAuthor,
            posts : posts,
            setPosts : setPosts
        }}
        >
            {props.children}
        </PostContext.Provider>
    )
}

export {PostProvider , PostContext};