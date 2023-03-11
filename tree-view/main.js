import TreeView from './TreeView.js';

const title = document.getElementById('title-id')
const treeViewHtml = document.getElementById('tree-view-id')
const myFunc = (typeOfItem, path, name) => {
    if (typeOfItem === 1) {
        console.log('Folder', path)
        title.innerHTML = path+"/"
    } else if (typeOfItem === 2) {
        console.log('File', path)
        title.innerHTML = path
    }
 }

fetch('http://localhost:3000/tree')
    .then(response => response.json())
    .then(tree => { 
        const treeView = new TreeView(treeViewHtml, tree, myFunc)
    })