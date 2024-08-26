const sql = require('../config/dbConfig');

async function addSchool(name, address, latitude, longitude) {
  try {
    const result = await sql`
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (${name}, ${address}, ${latitude}, ${longitude})
      RETURNING *;
    `;
    return { status: 201, data: result };
  } catch (error) {
    console.error('Error adding school:', error);
    return { status: 500, message: 'Error adding school' };
  }
}

async function getAllSchools() {
  try {
    const schools = await sql`
      SELECT id, name, address, latitude, longitude
      FROM schools;
    `;
    return { status: 200, data: schools };
  } catch (error) {
    console.error('Error fetching schools:', error);
    return { status: 500, message: 'Error fetching schools' };
  }
}

async function deleteSchoolById(id) {
  try {
    const result = await sql`DELETE FROM schools WHERE id = ${id}`;
    if (result.count === 0) {
      return { status: 404, message: 'School not found' };
    }
    return { status: 200, message: 'School deleted successfully' };
  } catch (error) {
    console.error('Error deleting school:', error);
    return { status: 500, message: 'Error deleting school' };
  }
}

async function deleteAllSchoolsFromDB() {
  try {
    await sql`DELETE FROM schools`;
    return { status: 200, message: 'All schools deleted successfully' };
  } catch (error) {
    console.error('Error deleting all schools:', error);
    return { status: 500, message: 'Error deleting all schools' };
  }
}

module.exports = {
  getAllSchools,
  addSchool,
  deleteSchoolById,
  deleteAllSchoolsFromDB,
};
