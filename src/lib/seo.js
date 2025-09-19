// Simple SEO utilities without additional dependencies
import { useEffect } from 'react'

const ensureTag = (selector, createEl) => {
  let el = document.querySelector(selector)
  if (!el) {
    el = createEl()
    document.head.appendChild(el)
  }
  return el
}

const setMeta = (attr, name, content) => {
  const selector = `meta[${attr}="${name}"]`
  const el = ensureTag(selector, () => {
    const m = document.createElement('meta')
    m.setAttribute(attr, name)
    return m
  })
  if (content) el.setAttribute('content', content)
}

const setCanonical = (href) => {
  const selector = 'link[rel="canonical"]'
  const el = ensureTag(selector, () => {
    const l = document.createElement('link')
    l.setAttribute('rel', 'canonical')
    return l
  })
  if (href) el.setAttribute('href', href)
}

export const useSEO = ({ title, description, image, url } = {}) => {
  useEffect(() => {
    if (title) document.title = title

    const resolvedUrl = url || (typeof window !== 'undefined' ? window.location.href : undefined)

    if (description) setMeta('name', 'description', description)

    // Open Graph
    if (title) setMeta('property', 'og:title', title)
    if (description) setMeta('property', 'og:description', description)
    if (resolvedUrl) setMeta('property', 'og:url', resolvedUrl)
    if (image) setMeta('property', 'og:image', image)

    // Twitter
    if (title) setMeta('name', 'twitter:title', title)
    if (description) setMeta('name', 'twitter:description', description)
    if (resolvedUrl) setMeta('name', 'twitter:url', resolvedUrl)
    if (image) setMeta('name', 'twitter:image', image)

    // Canonical
    if (resolvedUrl) setCanonical(resolvedUrl)
  }, [title, description, image, url])
}
