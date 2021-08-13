const projects = [
  {project_name: 'project name 1' ,project_description: 'project desc 1'},
  { project_name: 'project name 2', project_completed:true }
]

const resources =[
  { resource_name: 'resource 1' ,resource_description: 'resource description 1' },
  { resource_name: 'resource 2' ,resource_description: 'resource description 2' },
  { resource_name: 'resource 3' ,resource_description: 'resource description 3' },
  { resource_name: 'resource 4' ,resource_description: 'resource description 4' },
]

// const project_resources = [ 

// ]

const tasks = [
  // Project 1 tasks
  {task_description: "task desc 1", task_notes: "task notes", task_completed: true, project_id: 1 },
  {task_description: "task desc 2", task_notes: "task notes", task_completed: false, project_id: 1 },
  // Project 2 tasks
  {task_description: "task desc 3", task_notes: "task notes", task_completed: true, project_id: 2 },
  {task_description: "task desc 4", task_notes: "task notes", task_completed: false, project_id: 2 },

]




exports.seed = async function (knex) { // tables with FKeys go last
  await knex('projects').insert(projects)
  await knex('resources').insert(resources)
  await knex('tasks').insert(tasks)
}