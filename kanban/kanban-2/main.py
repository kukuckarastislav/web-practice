import json
import random

get_random_priority = lambda: random.choice([1,2,3])

proj_str = ''
with open("project_data.json") as f:
	proj_str = f.read()

proj = json.loads(proj_str)
print(proj)

kanbanObj = []
id_item = 10000
for i in range(5):
	column = dict()
	column['id'] = i+1
	column['items'] = []
	for task in proj['tasks']:
		if task['columnId'] == i:
			item = dict()
			id_item += 1
			item['id'] = id_item
			item['content'] = task['task']
			item['attachments'] = task['attachments']
			item['priority'] = task['priority']
			item['messages'] = task['messages']

			column['items'].append(item)
	kanbanObj.append(column)



proj_json = json.dumps(kanbanObj, sort_keys=True, indent=4)
with open("kanban.json", 'w') as f:
	f.write(proj_json)
