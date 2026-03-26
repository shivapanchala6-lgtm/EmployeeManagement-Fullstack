using System.Data;
using Microsoft.Data.SqlClient;

namespace EmployeeManagement.API.Data
{
    public class DbContext
    {
        private readonly IConfiguration _configuration;

        public DbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IDbConnection CreateConnection()
        {
            var conn = _configuration.GetConnectionString("DefaultConnection")
                       ?? throw new InvalidOperationException("Missing DefaultConnection string.");
            return new SqlConnection(conn);
        }
    }
}