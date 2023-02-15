module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: Sequelize.STRING, unique: true, allowNull: false },
      password: { type: Sequelize.TEXT, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
    queryInterface.sequelize.query(`
    CREATE OR REPLACE FUNCTION set_updatedAt() RETURNS trigger AS
    $set_updatedAt$
    BEGIN
      IF NEW."updatedAt" = OLD."updatedAt" THEN
        NEW."updatedAt" = NOW();
      END IF;
      RETURN NEW;
    END;
    $set_updatedAt$ LANGUAGE plpgsql;
    CREATE TRIGGER user_update
    BEFORE UPDATE ON "users"
    FOR EACH ROW EXECUTE PROCEDURE set_updatedAt();`);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
    queryInterface.sequelize.query(`
    DROP TRIGGER IF EXISTS user_update ON users CASCADE;
    DROP FUNCTION IF EXISTS set_updatedAt;
    `);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
