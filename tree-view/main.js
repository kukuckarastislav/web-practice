import TreeView from './TreeView.js';


const treeViewHtml = document.getElementById('tree-view-id')
const myFunc = (typeOfItem, name) => {
    if (typeOfItem === 1) {
        console.log('Folder', name)
    } else if (typeOfItem === 2) {
        console.log('File', name)
    }
 }

fetch('http://localhost:3000/tree')
    .then(response => response.json())
    .then(tree => { 
        const treeView = new TreeView(treeViewHtml, tree, myFunc)
    })