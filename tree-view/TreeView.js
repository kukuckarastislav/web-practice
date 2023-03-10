export default class TreeView {

    constructor(rootEl, tree, callbackFunc) {
        this.rootEl = rootEl;
        this.tree = tree;
        this.callbackFunc = callbackFunc;

        this.createRoot();

        for (let i = 0; i < this.tree.length; i++) {
            this.createChild(this.tree[i]);
        }
    }

    createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);
        this.root = range.createContextualFragment(`
        <div class="tree-view">
        </div>
        `).children[0];

        this.rootEl.appendChild(this.root);
    }

    createChild(child) {
        if(child.type === 1) {
            new Folder(this, null, child, 0)
        } else if(child.type === 2) {
            new Item(this, this.root, child.name, 0)
        }
    }

    getIconByType(typeStr) { 
        switch (typeStr) {
            case 'folder':
                return 'folder_icon.svg';
            case 'folder-open':
                return 'folder_open_icon.svg';
            case 'exe':
                return 'application_apps_app_ui_icon.svg';
            case 'mp3':
                return 'note_music_icon.svg';
            case 'mp4':
                return 'collection_video_icon.svg';
            case 'png':
                return 'image_icon.svg';
            case 'jpg':
                return 'image_icon.svg';
            case 'pptx':
                return 'kashifarif_file_paper_extension_folder_icon.svg';
            case 'pdf':
                return 'kashifarif_file_paper_extension_folder_icon.svg';
            default:
                return '';
        }
    }

    unselectAll() {
        const allItems = this.root.querySelectorAll('.item');
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].classList.remove('selected');
        }
    }
}

class Folder{

    constructor(treeViewRef, parentNode, folder, depth) {
        this.treeViewRef = treeViewRef;
        this.parentNode = parentNode;
        if (parentNode === null) {
            this.parentNodeChildrenDiv = this.treeViewRef.root;
        } else {
            this.parentNodeChildrenDiv = parentNode.childrenDiv   
        }
        this.depth = depth;
        this.name = folder.name;
        this.children = folder.children;
        this.folderOpened = false;

        this.createRoot();
        for (let i = 0; i < this.children.length; i++) {
            this.createChild(this.children[i]);
        }

        this.registerEvents()

    }

    getFolderIcon() {
        if (this.folderOpened) {
            return this.treeViewRef.getIconByType('folder-open');
        } else {
            return this.treeViewRef.getIconByType('folder');
        }
    }

    createRoot() {
        let style = "";
        if (this.depth !== 0) {
            style = `margin-left: ${24}px;`;
        }
            
        const range = document.createRange();
        range.selectNode(document.body);
        
        this.root = range.createContextualFragment(`
        <div class="folder" style="${style}">
            <div class="item">
                <img src="assets/${this.getFolderIcon()}" alt="icon" class="item-icon">
                <div class="item-name folder-name">${this.name}</div>
            </div>
            <div class="folder-vertical-line hidden"></div>
            <div class="folder-children hidden"></div>
        </div>
        `).children[0];
        
        this.item = this.root.querySelector('.item');
        this.iconHtml = this.root.querySelector('.item-icon');
        this.verticalLine = this.root.querySelector('.folder-vertical-line');
        this.childrenDiv = this.root.querySelector('.folder-children');
        
        this.parentNodeChildrenDiv.appendChild(this.root);
    }

    createChild(child) {
        if(child.type === 1) {
            new Folder(this.treeViewRef, this, child, this.depth+1)
        } else if(child.type === 2) {
            new Item(this.treeViewRef, this.childrenDiv, child.name, this.depth+1)
        }
    }

    registerEvents() {
        this.item.addEventListener('click', () => { 
            this.treeViewRef.unselectAll()
            this.item.classList.add('selected')
            
            if (!this.folderOpened) {
                this.openFolder()
            } else {
                this.hideFolder()
            }

            this.treeViewRef.callbackFunc(1, this.name)
        })
    }

    openFolder() {
        this.folderOpened = true;
        this.iconHtml.src = `assets/${this.treeViewRef.getIconByType('folder-open')}`;
        this.childrenDiv.classList.remove('hidden')
        this.verticalLine.classList.remove('hidden')
        this.calculateVerticalLineHeight()
    }

    hideFolder() { 
        this.folderOpened = false;
        this.iconHtml.src = `assets/${this.treeViewRef.getIconByType('folder')}`;
        this.childrenDiv.classList.add('hidden')
        this.verticalLine.classList.add('hidden')
        this.calculateVerticalLineHeight()
    }
    
    calculateVerticalLineHeight() {
        if (!this.children || this.children.length === 0) {
            this.verticalLine.style.height = '0px';
            return;
        }

        if (this.children && this.children.length > 0 && this.children[this.children.length-1].type === 1) {
            this.verticalLine.style.height = `${this.childrenDiv.offsetHeight-this.childrenDiv.lastChild.offsetHeight+24}px`;
        } else {
            this.verticalLine.style.height = `${this.childrenDiv.offsetHeight-6}px`;   
        }
        if (this.parentNode !== null) {
            this.parentNode.calculateVerticalLineHeight()   
        }
    }
        
    
}

class Item{
    constructor(treeViewRef, parentNode, name, depth) {
        this.treeViewRef = treeViewRef;
        this.name = name;
        this.depth = depth;
        this.parentNode = parentNode
        this.type = this.getTypeOfFile()
        this.icon = this.treeViewRef.getIconByType(this.type)

        this.createRoot()

        this.registerEvents()
    }

    getTypeOfFile() {
        return this.name.split('.').pop()
    }

    createRoot() {
        let style = "";
        if (this.depth !== 0) {
            style = `margin-left: ${24}px;`;
        }

        const range = document.createRange();
        range.selectNode(document.body);
        if (this.icon) {
            this.root = range.createContextualFragment(`
            <div class="item" style="${style}">
                <img src="assets/${this.icon}" alt="icon" class="item-icon">
                <div class="item-name">${this.name}</div>
            </div>
            `).children[0];
        } else {
            this.root = range.createContextualFragment(`
            <div class="item" style="${style}">
                <div class="item-icon"></div>
                <div class="item-name">${this.name}</div>
            </div>
            `).children[0];
        }
        

        this.parentNode.appendChild(this.root);
    }

    registerEvents() {
        this.root.addEventListener('click', () => { 
            this.treeViewRef.unselectAll()
            this.root.classList.add('selected')
            this.treeViewRef.callbackFunc(2, this.name)
        })
    }
}