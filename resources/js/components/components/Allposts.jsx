import React, { Component } from 'react'
import { connect } from 'react-redux';
import Post from './Post';
import PropTypes from 'prop-types';
import { getPosts, deletePost } from "../actions/postActions";




export class Allposts extends Component {

    state={
        notOwner:''
    }

    componentDidMount() {
        this.props.getPosts();
    }

    componentWillReceiveProps(nextProps) {
        if( nextProps.errors){
            this.setState({
                notOwner:nextProps.errors.notOwner
            })
        }
    }
    
        
    render() {
        let {notOwner} = this.state;
        const {posts, loading} = this.props.post;

        let postShow;
        if (loading) {
            postShow = <div className="m-auto spinner-border text-primary" role="status">
            </div>;
        }else if(posts.length ===0){
            postShow = <div className="text-primary">No posts yet</div>
        } else {
            postShow = posts.map(
                post=><Post 
                        key={post.id} 
                        post={post} 
                        deletePostHandler={this.props.deletePost.bind(this,post.id)}
                    />
                )
        }
        
        return (
            <div>
                {notOwner?
                    (<div className='text-danger'>
                        {notOwner}
                    </div>):null}
                <h2 className='text-center'>Posts Show</h2>
                <div className="row justify-content-center">
                    {postShow}
                </div>
            </div>
        )
    }
}

Allposts.propTypes={
    errors:PropTypes.object,
    post:PropTypes.object.isRequired,
    getPosts:PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    post: state.post,
    errors: state.errors
})
 
export default connect(mapStateToProps,
    {getPosts, deletePost}
    )(Allposts);
