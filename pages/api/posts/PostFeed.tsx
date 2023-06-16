import usePosts from "@/hooks/usePosts";

interface PostFeedProps{
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps>  = ({ userId }) => {
    const {data: posts = []} = usePosts(userId);
}
    
    return (
        <>
            posts.map((post: Record<String, any>) => (
                <PostItem/>))
        
        </>
    )
}

export default PostFeed;