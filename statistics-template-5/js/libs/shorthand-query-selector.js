// ironboy
// shorten document.querySelector to $
// (or whatever you import it as)
export default function $(selector, parent = document) {
    const elements = parent.querySelectorAll(selector);
    return elements.length === 1 ? elements[0] : elements;
}