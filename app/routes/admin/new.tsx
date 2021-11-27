import { useActionData, Form, redirect, useTransition } from 'remix';
import { createPost } from '~/post';
import type { ActionFunction } from 'remix';
import invariant from 'tiny-invariant';

export let action: ActionFunction = async ({ request }) => {
	await new Promise(res => setTimeout(res, 1000));
	let formData = await request.formData();
	let title = formData.get('title');
	let slug = formData.get('slug');
	let markdown = formData.get('markdown');

	let errors: Record<string, boolean> = {};
	if (!title) errors.title = true;
	if (!slug) errors.slug = true;
	if (!markdown) errors.markdown = true;

	if (Object.keys(errors).length) {
		return errors;
	}

	invariant(typeof title === 'string');
	invariant(typeof slug === 'string');
	invariant(typeof markdown === 'string');
	await createPost({ title, slug, markdown });

	return redirect('/admin');
};

const NewPost = () => {
	let errors = useActionData();
	let transition = useTransition();
	return (
		<Form method="post">
			<p>
				<label>
					Post Title:{''}
					{errors?.title && <em>Title is required</em>}
					Post Title: <input type="text" name="title" />
				</label>
			</p>
			<p>
				<label>
					Post Slug:{''}
					{errors?.slug && <em>Slug is required</em>}
					Post Slug: <input type="text" name="slug" />
				</label>
			</p>
			<p>
				<label htmlFor="markdown">Markdown</label>{''}
				{errors?.markdown && <em>MarkDown is required</em>}
				<br />
				<textarea name="markdown" rows={20} />
			</p>
			<p>
				<button type="submit">{ transition.submission ? 'Creating...' : 'Create Post'}</button>
			</p>
		</Form>
	);
};

export default NewPost;
