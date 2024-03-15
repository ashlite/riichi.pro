import { json } from '@sveltejs/kit'
import type { iBasicDoc } from 'interface/doc'

// async function getPosts() {
// 	const docs: iBasicDoc[] = []

// 	const paths = import.meta.glob('/src/doc/*.md', { eager: true })

// 	for (const path in paths) {
// 		const file = paths[path]
// 		const slug = path.split('/').at(-1)!.replace('.md', '')

// 		if (file && typeof file === 'object' && 'metadata' in file && slug) {
// 			const metadata = file.metadata as Omit<iBasicDoc, 'slug'>
// 			const doc = { ...metadata, slug } satisfies iBasicDoc
// 			doc.published && docs.push(doc)
// 		}
// 	}

// 	// posts = posts.sort((first, second) =>
//   //   new Date(second.date).getTime() - new Date(first.date).getTime()
// 	// )

// 	return docs
// }

// export async function GET() {
// 	const docs = await getPosts()
// 	return json(docs)
// }
