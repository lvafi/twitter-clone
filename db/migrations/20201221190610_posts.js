
exports.up = function(knex) {
    return knex.schema.createTable('posts', table => {
        table.string('username');
        table.string('image_url');
        table.text('content');
        table.increments('id');
        table.integer('view_count');
        table.timestamp('created_at').defaultTo(knex.fn.now());   
    })
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('posts');
};


 
