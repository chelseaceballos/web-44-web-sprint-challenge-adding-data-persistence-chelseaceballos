// note before running any seeds, the lambda.db3 is only showing me two of the tables i created.
// its showing me tables named projects and actions, I have no table named actions...

exports.up = async function(knex) {
  await knex.schema
    .createTable('project', table => {
        table.increments('project_id')
        table.string('project_name', 285).notNullable()
        table.string('project_description', 2000)
        table.boolean('project_completed').defaultTo(0)
    })
    .createTable('resource', table => {
        table.increments('resource_id')
        table.string('resource_name',2000).notNullable().unique()
        table.string('resource_description', 7000)
    })
    .createTable('task', table => {
        table.increments('task_id')
        table.string('task_description').notNullable()
        table.string('task_notes')
        table.boolean('task_completed').defaultTo(0)
        table.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('project')
        .onDelete('CASCADE')
        .onUpdate('CASCADE') 
    })
    .createTable('project_resource', table => {
        table.increments('project_resources_id')
        table.integer('resource_id')
        .notNullable()
        .references('resource_id')
        .inTable('resource')
        .onDelete('CASCADE')
        .onUpdate('CASCADE') 
        table.integer('project_id')
        .notNullable()
        .references('project_id')
        .inTable('project')
        .onDelete('CASCADE')
        .onUpdate('CASCADE') 
    })
};

exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists('project_resource')
    .dropTableIfExists('task')
    .dropTableIfExists('resource')
    .dropTableIfExists('project')
};