import { Link } from "react-router-dom";
import styles from "./PostDetail.module.css";

function PostDetail({ post }) {
  return (
      <div className={styles.post_detail}>
        <img src={post.image} alt={post.title} />
        <p>{post.title}</p>
        <p className={styles.createdby}>{post.createdBy}</p>
        <div className={styles.tags}>
          {post.tagsArray.map((tag) => (
            <p key={tag}>
              <span>#</span>
              {tag}
            </p>
          ))}
        </div>
        <Link to={`/properties/${post.id}`} className="btn btn-outline">
          Mais detalhes...
        </Link>
      </div>
  );
}

export default PostDetail;
