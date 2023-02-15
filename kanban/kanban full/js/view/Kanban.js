import Column from "./Column.js";

export default class Kanban{
    constructor(root) {
        this.root = root;

        Kanban.columns().forEach(column => {
            // TODO: create an instance column class
            const columnView = new Column(column.id, column.title, column.color);
            
            this.root.appendChild(columnView.elements.root)
            
        });
    }


    static columns() {
        return [
            {
                id: 1,
                title: "Backlog",
                color: "linear-gradient(to right, #b778e0, #ff77bb);"
            },
            {
                id: 2,
                title: "In Progress",
                color: "linear-gradient(to right, #959aff, #a082dc);"
            },
            {
                id: 3,
                title: "Paused",
                color: "linear-gradient(to right, #ffbb33, #9eb53c);"
            },
            {
                id: 4,
                title: "Review",
                color: "linear-gradient(to right, #fb5906, #cc136f);"
            },
            {
                id: 5,
                title: "Done",
                color: "linear-gradient(to right, #6dd0a5, #41aea1);"
            },
        ];
    }
}