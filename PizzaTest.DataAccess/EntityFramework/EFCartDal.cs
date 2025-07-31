using Microsoft.EntityFrameworkCore;
using PizzaTest.DataAccess.Abstract;
using PizzaTest.DataAccess.Context;
using PizzaTest.DataAccess.Repositories;
using PizzaTest.Entity.Concrete;

namespace PizzaTest.DataAccess.EntityFramework
{
    public class EFCartDal : GenericRepository<Cart>, ICartDal
    {
        private readonly AppDbContext _context;
        public EFCartDal(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public Cart? GetCartWithItems(int userID)
        {
            return _context.Carts
                           .Include(c => c.CartItems)
                           .ThenInclude(ci => ci.Product)
                           .FirstOrDefault(c => c.UserID == userID);
        }
    }
}
