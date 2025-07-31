using Microsoft.EntityFrameworkCore;
using PizzaTest.DataAccess.Abstract;
using PizzaTest.DataAccess.Context;
using PizzaTest.DataAccess.Repositories;
using PizzaTest.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.DataAccess.EntityFramework
{
    public class EFOrderDal : GenericRepository<Order>, IOrderDal
    {
        private readonly AppDbContext _context;
        public EFOrderDal(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public List<Order> GetAllOrderAdmin()
        {
            return _context.Orders
            .Include(x => x.OrderDetails)
                .ThenInclude(oi => oi.Product)
            .Include(x => x.Address)
            .ToList();
        }

        public List<Order> TGetByUserId(int userID)
        {
            return _context.Orders
            .Include(o => o.Address)
            .Include(o => o.OrderDetails)
                .ThenInclude(oi => oi.Product)
            .Where(o => o.UserID == userID)
            .ToList();
        }
    }
}
