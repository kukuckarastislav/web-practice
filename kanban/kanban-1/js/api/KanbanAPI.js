export default class KanbanAPI {
    static getItems(columnId) {
        const column = read().find(column => column.id === columnId);

        if(!column) {
            return [];
        }

        return column.items;
    }

    static insertItem(columnId, content) {
        const data = read();
        const column = data.find(column => column.id === columnId);
        const item = {
            id: Math.floor(Math.random() * 1000000),
            content
        };

        if (!column) {
            throw new Error('Column does not exist');
        }

        column.items.push(item);
        save(data);

        return item;
    }

    static updateItem(itemId, newProps) { 
        const data = read();
        const [item, currentColumn] = (() => {
            for (const column of data) {
                const item = column.items.find(item => item.id === itemId);

                if (item) {
                    return [item, column];
                }
            }
        })();

        if (!item) {
            throw new Error('Item does not exist');
        }

        item.content = newProps.content || item.content;

        console.log(item, currentColumn);

        // update column and position
        if (
            newProps.columnId !== undefined
            && newProps.position !== undefined
        ) {
            const targetColumn = data.find(column => column.id === newProps.columnId);
            console.log(targetColumn)

            if (!targetColumn) {
                throw new Error("Target column not found")
            }

            // delete item from current column
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);
            // Move item into its new column and position

            targetColumn.items.splice(newProps.position, 0, item);
            
        }

        save(data);

    }

    static deleteItem(itemId) {
        const data = read();

        for (const column of data) {
            const item = column.items.find(item => item.id === itemId)
            if (!item)
                continue
            
            column.items.splice(column.items.indexOf(item), 1)
        }

        save(data)
    }

    static init() {
        save([
            {
                id: 1,
                items: [
                    {
                        id: 100,
                        content: "I am new!"
                    },
                    {
                        id: 200,
                        content: "Very cool :)"
                    },
                    {
                        id: 300,
                        content: "Rastislav"
                    }
                ]
            },
            {
                id: 2,
                items: [
                    {
                        id: 400,
                        content: "Web projects"
                    },
                    {
                        id: 500,
                        content: "Branislav"
                    },
                    {
                        id: 600,
                        content: "Borislav"
                    }
                ]
            },
            {
                id: 3,
                items: [
                    {
                        id: 700,
                        content: "Ljuboslav"
                    },
                    {
                        id: 800,
                        content: "Kukucka"
                    },
                ]
            },
        ]);
    }
}

function read() {
    const json = localStorage.getItem('kanban-data');
    
    if (!json) {
        init()
        read()
    } else {
        return JSON.parse(json);
    }
}

function save(data) {
    localStorage.setItem('kanban-data', JSON.stringify(data));
}

