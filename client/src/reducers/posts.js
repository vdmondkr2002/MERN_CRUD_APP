import {FETCH_ALL,DELETE,UPDATE,LIKE,CREATE} from '../constants/actions'

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
    switch (action.type) {
      case FETCH_ALL:
        return action.payload;
      case CREATE:
        return [...posts,action.payload];
      case UPDATE:
        return posts.map((post)=>action.payload._id===post._id?action.payload:post)
      case LIKE:
        return posts.map((post)=>action.payload._id===post._id?action.payload:post)
      case DELETE:
        return posts.filter((post)=>post._id!==action.payload)
      default:
        return posts;
    }
};