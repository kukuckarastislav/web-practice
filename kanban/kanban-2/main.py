import json
import random

get_random_priority = lambda: random.choice([1,2,3])

proj_str = ''
with open("task.json") as f:
	proj_str = f.read()

proj = json.loads(proj_str)
print(proj)

for task in proj['tasks']:
	task['priority'] = get_random_priority()
	task['messages'] = int(random.random() * 15)
	task['attachments'] = int(random.random() * 8)
	task['columnId'] = random.choice([0,1,2,3,4])

print(proj)

proj_json = json.dumps(proj, sort_keys=True, indent=4)
with open("project_data.json", 'w') as f:
	f.write(proj_json)
