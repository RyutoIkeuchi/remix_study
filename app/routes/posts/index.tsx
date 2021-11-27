import { Link, useLoaderData } from 'remix';
import { getPosts } from '~/post';
import type { Post } from '~/post';


export let loader = () => {
  return getPosts();
};

const Posts = () => {
	let posts = useLoaderData<Post[]>();

	return (
		<div>
			<h1>Aboutですよと</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.slug}>
						<Link to={post.slug}>{post.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Posts;
