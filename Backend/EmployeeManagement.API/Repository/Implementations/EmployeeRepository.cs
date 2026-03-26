using Dapper;
using EmployeeManagement.API.Data;
using EmployeeManagement.API.Models;
using EmployeeManagement.API.Repository.Interfaces;
using System.Data;

namespace EmployeeManagement.API.Repository.Implementations
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DbContext _context;

        public EmployeeRepository(DbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            var query = "SELECT * FROM Employees";
            using var connection = _context.CreateConnection();
            return await connection.QueryAsync<Employee>(query);
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            var query = "SELECT * FROM Employees WHERE Id = @Id";
            using var connection = _context.CreateConnection();
            return await connection.QueryFirstOrDefaultAsync<Employee>(query, new { Id = id });
        }

        public async Task<int> CreateAsync(Employee employee)
        {
            var query = @"INSERT INTO Employees (Name, Email, Department)
                          VALUES (@Name, @Email, @Department)";
            using var connection = _context.CreateConnection();
            return await connection.ExecuteAsync(query, employee);
        }

        public async Task<int> UpdateAsync(Employee employee)
        {
            var query = @"UPDATE Employees 
                          SET Name = @Name, Email = @Email, Department = @Department
                          WHERE Id = @Id";
            using var connection = _context.CreateConnection();
            return await connection.ExecuteAsync(query, employee);
        }

        public async Task<int> DeleteAsync(int id)
        {
            var query = "DELETE FROM Employees WHERE Id = @Id";
            using var connection = _context.CreateConnection();
            return await connection.ExecuteAsync(query, new { Id = id });
        }
    }
}