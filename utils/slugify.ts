export default function slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

// console.log(slugify('Hello world'));
// // expected output: "hello-world"
// console.log(slugify('Hello world, how are you?'));
// // expected output: "hello-world-how-are-you"