import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import glob from 'glob'
import memoizee from 'memoizee'
import { Post } from '../types'

const postsDirectory = path.join(process.cwd(), 'posts')

async function getSortedPostsData(): Promise<Array<Post>> {
  const files = glob.sync(`${postsDirectory}/**/*.md`)
  const posts = files
    .reduce((prev, cur) => {
      const file = fs.readFileSync(cur, { encoding: 'utf-8' })
      const { data, content } = matter(file)
      const { date, completed } = data

      const path = cur
        .slice(cur.indexOf(postsDirectory) + postsDirectory.length + 1)
        .replace('.md', '')

      if (completed) {
        const result = {
          ...data,
          content,
          date,
          path,
        }
        return [...prev, result]
      }
      return prev
    }, [])
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  return posts
}

export const getAllPosts: () => Promise<Array<Post>> =
  memoizee(getSortedPostsData)

export async function getAllCategory(): Promise<
  Array<{ category: string; count: number }>
> {
  const categories: string[] = (await getAllPosts()).reduce<string[]>(
    (prev, cur) => {
      cur.category.forEach((tag: string) => {
        prev.push(tag)
      })
      return prev
    },
    [],
  )

  const categoryWithCount = [...new Set(categories)].map((tag) => ({
    category: tag,
    count: categories.filter((t) => t === tag).length,
  }))

  return categoryWithCount.sort((a, b) => b.count - a.count)
}
