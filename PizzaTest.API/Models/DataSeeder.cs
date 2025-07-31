using PizzaTest.DataAccess.Context;
using PizzaTest.Entity.Concrete;

namespace PizzaTest.API.Models
{
    public class DataSeeder
    {
        public static void SeedAdminUser(AppDbContext context)
        {
            // Admin var mı kontrol et
            if (!context.Users.Any(u => u.Email == "admin@pizza.com"))
            {
                var admin = new User
                {
                    Name = "Admin",
                    Email = "admin@pizza.com",
                    Password = "admin123", 
                };

                context.Users.Add(admin);
                context.SaveChanges();
            }
        }
    }
}
